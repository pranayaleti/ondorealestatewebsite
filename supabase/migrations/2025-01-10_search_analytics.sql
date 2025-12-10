-- Search analytics schema for AI search KPIs (Supabase/Postgres)
-- Safe to run multiple times; tables are idempotent.

create schema if not exists analytics;
create extension if not exists "pgcrypto";

-- Sessions capture device/locale for segmentation.
create table if not exists analytics.search_sessions (
  session_id uuid primary key default gen_random_uuid(),
  user_id uuid,
  anonymous_id uuid,
  device text,
  locale text,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Queries capture parameters, latency, cost, and zero-result status.
create table if not exists analytics.search_queries (
  query_id uuid primary key default gen_random_uuid(),
  session_id uuid references analytics.search_sessions(session_id) on delete set null,
  query_text text not null,
  normalized_query text,
  language text,
  filters jsonb,
  model_version text,
  embedding_version text,
  reranker_version text,
  latency_ms integer,
  result_count integer,
  zero_results boolean default false,
  cost_micros bigint,
  request_id text,
  created_at timestamptz not null default now()
);

-- Impressions store ranked results shown to the user.
create table if not exists analytics.search_impressions (
  impression_id bigint generated always as identity primary key,
  query_id uuid references analytics.search_queries(query_id) on delete cascade,
  document_id text not null,
  rank smallint not null,
  score numeric,
  source text,
  published_at timestamptz,
  inserted_at timestamptz not null default now()
);

-- Clicks with dwell time for CTR/time-to-first-click/abandonment.
create table if not exists analytics.search_clicks (
  click_id bigint generated always as identity primary key,
  query_id uuid references analytics.search_queries(query_id) on delete cascade,
  document_id text not null,
  rank smallint,
  dwell_ms integer,
  clicked_at timestamptz not null default now()
);

-- Optional user feedback on result quality or answers.
create table if not exists analytics.search_feedback (
  feedback_id bigint generated always as identity primary key,
  query_id uuid references analytics.search_queries(query_id) on delete cascade,
  document_id text,
  rating smallint check (rating between -1 and 2), -- -1 bad, 0 neutral, 1 good, 2 very good
  comment text,
  created_at timestamptz not null default now()
);

-- Guardrail hits (toxicity/PII/safety) for monitoring.
create table if not exists analytics.search_guardrails (
  guardrail_id bigint generated always as identity primary key,
  query_id uuid references analytics.search_queries(query_id) on delete cascade,
  guardrail text not null, -- e.g., toxicity, pii, safety, grounding
  triggered boolean not null default false,
  details jsonb,
  created_at timestamptz not null default now()
);

-- Experiment assignments for A/B or interleaving variants.
create table if not exists analytics.search_experiments (
  assignment_id bigint generated always as identity primary key,
  session_id uuid references analytics.search_sessions(session_id) on delete cascade,
  experiment text not null,
  variant text not null,
  assigned_at timestamptz not null default now()
);

-- Offline labels to compute NDCG/MRR on curated sets.
create table if not exists analytics.search_labels (
  label_id bigint generated always as identity primary key,
  query_text text not null,
  document_id text not null,
  relevance smallint not null check (relevance between 0 and 3),
  intent text,
  locale text,
  notes text,
  created_at timestamptz not null default now()
);

-- Indexes for common filters and joins.
create index if not exists idx_search_queries_created_at on analytics.search_queries(created_at);
create index if not exists idx_search_queries_zero_results on analytics.search_queries(zero_results);
create index if not exists idx_search_queries_session on analytics.search_queries(session_id);
create index if not exists idx_search_clicks_query on analytics.search_clicks(query_id);
create index if not exists idx_search_impressions_query on analytics.search_impressions(query_id);
create index if not exists idx_search_experiments_session on analytics.search_experiments(session_id);
create index if not exists idx_search_guardrails_query on analytics.search_guardrails(query_id);

-- Daily KPI rollup (queries, CTR, zero-result rate, success@3, latency p95, cost).
create materialized view if not exists analytics.search_kpis_daily as
with first_click as (
  select query_id, min(rank) as first_rank
  from analytics.search_clicks
  group by query_id
),
variant_map as (
  select s.session_id,
         coalesce((select variant from analytics.search_experiments e where e.session_id = s.session_id order by e.assigned_at desc limit 1), 'control') as variant
  from analytics.search_sessions s
)
select
  date_trunc('day', q.created_at) as day,
  vm.variant,
  count(*)::bigint as queries,
  avg((not q.zero_results)::int)::float as queries_with_results_rate,
  avg((fc.first_rank is not null)::int)::float as any_click_rate,
  avg((fc.first_rank is not null and fc.first_rank <= 3)::int)::float as success_at_3_rate,
  avg(q.zero_results::int)::float as zero_result_rate,
  percentile_cont(0.95) within group (order by q.latency_ms) as p95_latency_ms,
  avg(q.latency_ms) as avg_latency_ms,
  avg(q.cost_micros) as avg_cost_micros
from analytics.search_queries q
left join first_click fc on fc.query_id = q.query_id
left join variant_map vm on vm.session_id = q.session_id
group by 1, 2
order by 1 desc, 2;

-- Helpful view to inspect zero-result queries with counts.
create or replace view analytics.zero_result_queries as
select
  q.query_text,
  count(*) as occurrences,
  max(q.created_at) as last_seen
from analytics.search_queries q
where q.zero_results is true
group by q.query_text
order by occurrences desc;

-- Offline NDCG@10 using curated labels and captured impressions.
create or replace view analytics.offline_relevance_eval as
with graded as (
  select
    i.query_id,
    i.document_id,
    i.rank,
    coalesce(l.relevance, 0) as relevance
  from analytics.search_impressions i
  join analytics.search_queries q on q.query_id = i.query_id
  left join analytics.search_labels l
    on l.query_text = q.query_text
   and l.document_id = i.document_id
  where i.rank <= 10
),
dcg as (
  select
    query_id,
    sum((power(2, relevance)::float - 1) / (ln(rank + 1) / ln(2))) as dcg_at_10
  from graded
  group by query_id
),
idcg as (
  select
    q.query_id,
    (
      select sum((power(2, relevance)::float - 1) / (ln(rn + 1) / ln(2)))
      from (
        select relevance, row_number() over (order by relevance desc) as rn
        from analytics.search_labels l
        where l.query_text = q.query_text
        limit 10
      ) ideal
    ) as idcg_at_10
  from analytics.search_queries q
  group by q.query_id, q.query_text
)
select
  q.query_id,
  q.query_text,
  dcg.dcg_at_10,
  idcg.idcg_at_10,
  case when idcg.idcg_at_10 > 0 then dcg.dcg_at_10 / idcg.idcg_at_10 else null end as ndcg_at_10
from analytics.search_queries q
left join dcg on dcg.query_id = q.query_id
left join idcg on idcg.query_id = q.query_id;

-- Refresh helper for scheduled tasks.
create or replace function analytics.refresh_search_kpis_daily()
returns void language sql security definer as $$
  refresh materialized view concurrently analytics.search_kpis_daily;
$$;

comment on materialized view analytics.search_kpis_daily is 'Daily KPIs: queries, CTR, success@3, latency, zero-result, cost by variant.';
comment on table analytics.search_labels is 'Offline relevance labels for NDCG/MRR evaluation.';

-- Enable RLS and allow inserts from anon/authenticated; full access for service_role.
do $$
begin
  perform 1 from pg_roles where rolname = 'service_role';

  alter table if exists analytics.search_sessions enable row level security;
  if not exists (select 1 from pg_policies where policyname = 'search_sessions_insert') then
    create policy search_sessions_insert on analytics.search_sessions for insert with check (auth.role() in ('anon','authenticated','service_role'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'search_sessions_service') then
    create policy search_sessions_service on analytics.search_sessions for all using (auth.role() = 'service_role') with check (true);
  end if;

  alter table if exists analytics.search_queries enable row level security;
  if not exists (select 1 from pg_policies where policyname = 'search_queries_insert') then
    create policy search_queries_insert on analytics.search_queries for insert with check (auth.role() in ('anon','authenticated','service_role'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'search_queries_service') then
    create policy search_queries_service on analytics.search_queries for all using (auth.role() = 'service_role') with check (true);
  end if;

  alter table if exists analytics.search_impressions enable row level security;
  if not exists (select 1 from pg_policies where policyname = 'search_impressions_insert') then
    create policy search_impressions_insert on analytics.search_impressions for insert with check (auth.role() in ('anon','authenticated','service_role'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'search_impressions_service') then
    create policy search_impressions_service on analytics.search_impressions for all using (auth.role() = 'service_role') with check (true);
  end if;

  alter table if exists analytics.search_clicks enable row level security;
  if not exists (select 1 from pg_policies where policyname = 'search_clicks_insert') then
    create policy search_clicks_insert on analytics.search_clicks for insert with check (auth.role() in ('anon','authenticated','service_role'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'search_clicks_service') then
    create policy search_clicks_service on analytics.search_clicks for all using (auth.role() = 'service_role') with check (true);
  end if;

  alter table if exists analytics.search_feedback enable row level security;
  if not exists (select 1 from pg_policies where policyname = 'search_feedback_insert') then
    create policy search_feedback_insert on analytics.search_feedback for insert with check (auth.role() in ('anon','authenticated','service_role'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'search_feedback_service') then
    create policy search_feedback_service on analytics.search_feedback for all using (auth.role() = 'service_role') with check (true);
  end if;

  alter table if exists analytics.search_guardrails enable row level security;
  if not exists (select 1 from pg_policies where policyname = 'search_guardrails_insert') then
    create policy search_guardrails_insert on analytics.search_guardrails for insert with check (auth.role() in ('anon','authenticated','service_role'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'search_guardrails_service') then
    create policy search_guardrails_service on analytics.search_guardrails for all using (auth.role() = 'service_role') with check (true);
  end if;

  alter table if exists analytics.search_experiments enable row level security;
  if not exists (select 1 from pg_policies where policyname = 'search_experiments_insert') then
    create policy search_experiments_insert on analytics.search_experiments for insert with check (auth.role() in ('anon','authenticated','service_role'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'search_experiments_service') then
    create policy search_experiments_service on analytics.search_experiments for all using (auth.role() = 'service_role') with check (true);
  end if;

  alter table if exists analytics.search_labels enable row level security;
  if not exists (select 1 from pg_policies where policyname = 'search_labels_service') then
    create policy search_labels_service on analytics.search_labels for all using (auth.role() = 'service_role') with check (true);
  end if;
end $$;

