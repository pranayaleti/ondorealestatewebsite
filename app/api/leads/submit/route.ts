import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkUserBlacklist, checkIPBlacklist, validateContent } from '@/lib/blacklist'

// POST /api/leads/submit - Submit a lead with blacklist checking
export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const body = await request.json()
    const { name, email, phone, message, propertyId, source } = body

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

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

    // Insert the lead
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        message: message?.trim(),
        property_id: propertyId,
        source: source || 'website',
        ip_address: clientIP,
        user_agent: request.headers.get('user-agent'),
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting lead:', insertError)
      return NextResponse.json(
        { error: 'Failed to submit lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      lead: lead
    })

  } catch (error) {
    console.error('Error in lead submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getClientIP(request: NextRequest): string | null {
  // Check various headers that might contain the real IP
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip', // Cloudflare
    'x-cluster-client-ip', // Rackspace
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ]

  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      // Take the first IP if there are multiple (comma-separated)
      const ip = value.split(',')[0].trim()
      if (ip && ip !== 'unknown') {
        return ip
      }
    }
  }

  return null
}
