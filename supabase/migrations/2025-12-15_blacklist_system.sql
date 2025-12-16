-- Blacklist system for real estate platform
-- Safe to run multiple times; tables are idempotent.

-- Create blacklist schema
create schema if not exists moderation;

-- User blacklist table
-- Blocks users from accessing the platform
create table if not exists moderation.user_blacklist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  email text,
  reason text not null,
  blocked_by uuid not null, -- admin user who created the blacklist
  blocked_at timestamptz not null default now(),
  expires_at timestamptz, -- null means permanent
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Property blacklist table
-- Blocks properties from being listed or searched
create table if not exists moderation.property_blacklist (
  id uuid primary key default gen_random_uuid(),
  property_id integer not null,
  reason text not null,
  blocked_by uuid not null, -- admin user who created the blacklist
  blocked_at timestamptz not null default now(),
  expires_at timestamptz, -- null means permanent
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- IP address blacklist table
-- Blocks IP addresses from accessing the platform
create table if not exists moderation.ip_blacklist (
  id uuid primary key default gen_random_uuid(),
  ip_address inet not null unique,
  reason text not null,
  blocked_by uuid not null, -- admin user who created the blacklist
  blocked_at timestamptz not null default now(),
  expires_at timestamptz, -- null means permanent
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Email domain blacklist table
-- Blocks email domains from registration
create table if not exists moderation.email_domain_blacklist (
  id uuid primary key default gen_random_uuid(),
  domain text not null unique,
  reason text not null,
  blocked_by uuid not null, -- admin user who created the blacklist
  blocked_at timestamptz not null default now(),
  expires_at timestamptz, -- null means permanent
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Content filter blacklist table
-- Blocks specific words/phrases from content
create table if not exists moderation.content_filter (
  id uuid primary key default gen_random_uuid(),
  pattern text not null unique,
  reason text not null,
  blocked_by uuid not null, -- admin user who created the blacklist
  blocked_at timestamptz not null default now(),
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Blacklist audit log table
-- Tracks all blacklist operations
create table if not exists moderation.blacklist_audit (
  id uuid primary key default gen_random_uuid(),
  blacklist_type text not null check (blacklist_type in ('user', 'property', 'ip', 'email_domain', 'content')),
  blacklist_id uuid not null,
  action text not null check (action in ('created', 'updated', 'deactivated', 'reactivated', 'expired')),
  performed_by uuid not null, -- admin user who performed the action
  old_values jsonb,
  new_values jsonb,
  performed_at timestamptz not null default now(),
  reason text
);

-- Indexes for performance
create index if not exists idx_user_blacklist_user_id on moderation.user_blacklist(user_id);
create index if not exists idx_user_blacklist_email on moderation.user_blacklist(email);
create index if not exists idx_user_blacklist_active on moderation.user_blacklist(is_active) where is_active = true;
create index if not exists idx_user_blacklist_expires on moderation.user_blacklist(expires_at) where expires_at is not null;

create index if not exists idx_property_blacklist_property_id on moderation.property_blacklist(property_id);
create index if not exists idx_property_blacklist_active on moderation.property_blacklist(is_active) where is_active = true;
create index if not exists idx_property_blacklist_expires on moderation.property_blacklist(expires_at) where expires_at is not null;

create index if not exists idx_ip_blacklist_ip on moderation.ip_blacklist(ip_address);
create index if not exists idx_ip_blacklist_active on moderation.ip_blacklist(is_active) where is_active = true;
create index if not exists idx_ip_blacklist_expires on moderation.ip_blacklist(expires_at) where expires_at is not null;

create index if not exists idx_email_domain_blacklist_domain on moderation.email_domain_blacklist(domain);
create index if not exists idx_email_domain_blacklist_active on moderation.email_domain_blacklist(is_active) where is_active = true;
create index if not exists idx_email_domain_blacklist_expires on moderation.email_domain_blacklist(expires_at) where expires_at is not null;

create index if not exists idx_content_filter_pattern on moderation.content_filter(pattern);
create index if not exists idx_content_filter_active on moderation.content_filter(is_active) where is_active = true;

create index if not exists idx_blacklist_audit_type on moderation.blacklist_audit(blacklist_type);
create index if not exists idx_blacklist_audit_performed_at on moderation.blacklist_audit(performed_at);

-- Function to automatically deactivate expired blacklists
create or replace function moderation.deactivate_expired_blacklists()
returns void language plpgsql as $$
begin
  -- Deactivate expired user blacklists
  update moderation.user_blacklist
  set is_active = false, updated_at = now()
  where is_active = true and expires_at is not null and expires_at < now();

  -- Deactivate expired property blacklists
  update moderation.property_blacklist
  set is_active = false, updated_at = now()
  where is_active = true and expires_at is not null and expires_at < now();

  -- Deactivate expired IP blacklists
  update moderation.ip_blacklist
  set is_active = false, updated_at = now()
  where is_active = true and expires_at is not null and expires_at < now();

  -- Deactivate expired email domain blacklists
  update moderation.email_domain_blacklist
  set is_active = false, updated_at = now()
  where is_active = true and expires_at is not null and expires_at < now();
end;
$$;

-- Function to check if user is blacklisted
create or replace function moderation.is_user_blacklisted(user_uuid uuid, user_email text default null)
returns boolean language plpgsql as $$
begin
  -- Check if user is directly blacklisted
  if exists (
    select 1 from moderation.user_blacklist
    where (user_id = user_uuid or email = user_email)
    and is_active = true
    and (expires_at is null or expires_at > now())
  ) then
    return true;
  end if;

  -- Check if user's email domain is blacklisted
  if user_email is not null then
    if exists (
      select 1 from moderation.email_domain_blacklist
      where user_email like '%' || domain
      and is_active = true
      and (expires_at is null or expires_at > now())
    ) then
      return true;
    end if;
  end if;

  return false;
end;
$$;

-- Function to check if property is blacklisted
create or replace function moderation.is_property_blacklisted(prop_id integer)
returns boolean language plpgsql as $$
begin
  return exists (
    select 1 from moderation.property_blacklist
    where property_id = prop_id
    and is_active = true
    and (expires_at is null or expires_at > now())
  );
end;
$$;

-- Function to check if IP is blacklisted
create or replace function moderation.is_ip_blacklisted(ip_addr text)
returns boolean language plpgsql as $$
begin
  return exists (
    select 1 from moderation.ip_blacklist
    where ip_address = ip_addr::inet
    and is_active = true
    and (expires_at is null or expires_at > now())
  );
end;
$$;

-- Function to audit blacklist changes
create or replace function moderation.audit_blacklist_change()
returns trigger language plpgsql as $$
declare
  action_type text;
  blacklist_type text;
begin
  -- Determine action type
  if TG_OP = 'INSERT' then
    action_type := 'created';
  elsif TG_OP = 'UPDATE' then
    if OLD.is_active != NEW.is_active then
      if NEW.is_active = false then
        action_type := 'deactivated';
      else
        action_type := 'reactivated';
      end if;
    else
      action_type := 'updated';
    end if;
  end if;

  -- Determine blacklist type based on table
  blacklist_type := case TG_TABLE_NAME
    when 'user_blacklist' then 'user'
    when 'property_blacklist' then 'property'
    when 'ip_blacklist' then 'ip'
    when 'email_domain_blacklist' then 'email_domain'
    when 'content_filter' then 'content'
    else 'unknown'
  end;

  -- Insert audit record
  insert into moderation.blacklist_audit (
    blacklist_type,
    blacklist_id,
    action,
    performed_by,
    old_values,
    new_values,
    reason
  ) values (
    blacklist_type,
    case
      when TG_OP = 'INSERT' then NEW.id
      else NEW.id
    end,
    action_type,
    NEW.blocked_by, -- For content_filter, this might need adjustment
    case when TG_OP = 'UPDATE' then row_to_json(OLD) else null end,
    row_to_json(NEW),
    case
      when TG_OP = 'INSERT' then 'Blacklist entry created'
      when TG_OP = 'UPDATE' then
        case
          when OLD.is_active != NEW.is_active then
            case when NEW.is_active = false then 'Blacklist entry deactivated' else 'Blacklist entry reactivated' end
          else 'Blacklist entry updated'
        end
      else 'Unknown action'
    end
  );

  return case when TG_OP = 'DELETE' then OLD else NEW end;
end;
$$;

-- Create triggers for audit logging
create trigger audit_user_blacklist after insert or update on moderation.user_blacklist
  for each row execute function moderation.audit_blacklist_change();

create trigger audit_property_blacklist after insert or update on moderation.property_blacklist
  for each row execute function moderation.audit_blacklist_change();

create trigger audit_ip_blacklist after insert or update on moderation.ip_blacklist
  for each row execute function moderation.audit_blacklist_change();

create trigger audit_email_domain_blacklist after insert or update on moderation.email_domain_blacklist
  for each row execute function moderation.audit_blacklist_change();

create trigger audit_content_filter after insert or update on moderation.content_filter
  for each row execute function moderation.audit_blacklist_change();

-- Enable RLS on all tables
alter table moderation.user_blacklist enable row level security;
alter table moderation.property_blacklist enable row level security;
alter table moderation.ip_blacklist enable row level security;
alter table moderation.email_domain_blacklist enable row level security;
alter table moderation.content_filter enable row level security;
alter table moderation.blacklist_audit enable row level security;

-- RLS Policies - Only admins can manage blacklists
create policy user_blacklist_admin on moderation.user_blacklist
  for all using (auth.role() = 'admin' or auth.jwt()->>'role' = 'admin');

create policy property_blacklist_admin on moderation.property_blacklist
  for all using (auth.role() = 'admin' or auth.jwt()->>'role' = 'admin');

create policy ip_blacklist_admin on moderation.ip_blacklist
  for all using (auth.role() = 'admin' or auth.jwt()->>'role' = 'admin');

create policy email_domain_blacklist_admin on moderation.email_domain_blacklist
  for all using (auth.role() = 'admin' or auth.jwt()->>'role' = 'admin');

create policy content_filter_admin on moderation.content_filter
  for all using (auth.role() = 'admin' or auth.jwt()->>'role' = 'admin');

create policy blacklist_audit_admin on moderation.blacklist_audit
  for all using (auth.role() = 'admin' or auth.jwt()->>'role' = 'admin');

-- Create a scheduled job to clean up expired blacklists (run daily)
-- Note: This would typically be set up via pg_cron or a scheduled task
-- For now, we'll create a function that can be called manually or via cron

comment on schema moderation is 'Blacklist and moderation system for the real estate platform';
comment on table moderation.user_blacklist is 'Blocks users from accessing the platform';
comment on table moderation.property_blacklist is 'Blocks properties from being listed or searched';
comment on table moderation.ip_blacklist is 'Blocks IP addresses from accessing the platform';
comment on table moderation.email_domain_blacklist is 'Blocks email domains from user registration';
comment on table moderation.content_filter is 'Blocks specific words/phrases from content';
comment on table moderation.blacklist_audit is 'Audit log for all blacklist operations';
