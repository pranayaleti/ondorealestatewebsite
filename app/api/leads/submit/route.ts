import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkUserBlacklist, checkIPBlacklist, validateContent } from '@/lib/blacklist'
import { z } from 'zod'

// ---- HubSpot & Zapier helpers (lightweight, no heavy SDK) ----

async function syncLeadToHubSpot(lead: { name: string; email: string; phone?: string; message?: string; source?: string }) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) return

  const nameParts = lead.name.trim().split(/\s+/)
  const firstname = nameParts[0] ?? ''
  const lastname = nameParts.slice(1).join(' ') || ''

  await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      properties: {
        email: lead.email,
        firstname,
        lastname,
        phone: lead.phone ?? '',
        hs_lead_status: 'NEW',
      },
    }),
  })
}

function notifyZapierNewLead(data: Record<string, unknown>) {
  const url = process.env.ZAPIER_NEW_LEAD_WEBHOOK
  if (!url) return

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString(), event: 'new_lead' }),
  }).catch(() => {})
}

// POST routes must be force-dynamic — static export excludes this file at build time,
// but it works in development and any server-rendered deployment.
export const dynamic = 'force-dynamic'

const LeadSchema = z.object({
  name: z.string().min(1).max(120).transform(s => s.trim()),
  email: z.string().email().max(254).transform(s => s.toLowerCase().trim()),
  phone: z.string().min(7).max(20).regex(/^[+\d\s\-().]+$/, 'Invalid phone format').transform(s => s.trim()),
  message: z.string().max(2000).optional().transform(s => s?.trim()),
  propertyId: z.string().uuid().optional(),
  source: z.enum(['website', 'referral', 'direct', 'social', 'ad']).default('website'),
})

// POST /api/leads/submit - Submit a lead with blacklist checking
export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const rawBody = await request.json()
    const parseResult = LeadSchema.safeParse(rawBody)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    const { name, email, phone, message, propertyId, source } = parseResult.data

    // Get client IP for blacklist checking
    const clientIP = getClientIP(request)

    // Check if IP is blacklisted
    if (clientIP) {
      const ipCheck = await checkIPBlacklist(clientIP)
      if (ipCheck.isBlacklisted) {
        return NextResponse.json(
          { error: 'Access denied' },
          { status: 403 }
        )
      }
    }

    // Check if email/user is blacklisted
    const userCheck = await checkUserBlacklist('', email)
    if (userCheck.isBlacklisted) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Validate message content if provided
    if (message) {
      const contentValidation = await validateContent(message)
      if (!contentValidation.isValid) {
        return NextResponse.json(
          { error: 'Message contains prohibited content' },
          { status: 400 }
        )
      }
    }

    // Check if property exists and is not blacklisted
    if (propertyId) {
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .select('id')
        .eq('id', propertyId)
        .single()

      if (propertyError || !property) {
        return NextResponse.json(
          { error: 'Property not found' },
          { status: 404 }
        )
      }
    }

    // Insert the lead — data already sanitized by Zod schema
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone,
        message,
        property_id: propertyId,
        source,
        ip_address: clientIP,
        user_agent: request.headers.get('user-agent'),
        created_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (insertError) {
      // Log error code only — no PII, no full error objects
      console.error('Lead insert failed:', insertError.code)
      return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 })
    }

    // Sync to HubSpot (non-blocking, best-effort)
    syncLeadToHubSpot({ name, email, phone, message, source }).catch(() => {})

    // Notify Zapier (fire-and-forget)
    notifyZapierNewLead({ name, email, phone, message, source, leadId: lead.id })

    return NextResponse.json({ success: true, message: 'Lead submitted successfully', leadId: lead.id })

  } catch (error) {
    console.error('Lead submission error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function getClientIP(request: NextRequest): string | null {
  // Trust only Cloudflare's header to prevent IP spoofing via crafted request headers.
  // If not behind Cloudflare, fall back to x-forwarded-for (set by the trusted reverse proxy only).
  const cf = request.headers.get('cf-connecting-ip')
  if (cf && cf !== 'unknown') return cf.trim()

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const ip = forwarded.split(',')[0].trim()
    if (ip && ip !== 'unknown') return ip
  }

  return null
}
