import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  BlacklistCheckResult,
  UserBlacklistCheck,
  PropertyBlacklistCheck,
  IPBlacklistCheck,
  BlacklistResponse
} from '@/lib/types'

// POST /api/blacklist/check - Check if user/property/IP is blacklisted
export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await request.json()
    const { type, value, email } = body

    let result: BlacklistCheckResult

    switch (type) {
      case 'user':
        result = await checkUserBlacklist(value, email)
        break

      case 'property':
        result = await checkPropertyBlacklist(parseInt(value))
        break

      case 'ip':
        result = await checkIPBlacklist(value)
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid check type' },
          { status: 400 }
        )
    }

    const response: BlacklistResponse<BlacklistCheckResult> = {
      success: true,
      data: result
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error checking blacklist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check blacklist' },
      { status: 500 }
    )
  }
}

async function checkUserBlacklist(userId: string, email?: string): Promise<UserBlacklistCheck> {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Check direct user blacklist
    const { data: userBlacklist, error: userError } = await supabase
      .rpc('moderation.is_user_blacklisted', {
        user_uuid: userId,
        user_email: email
      })

    if (userError) throw userError

    if (userBlacklist) {
      // Get details of the blacklist entry
      const query = supabase
        .from('moderation.user_blacklist')
        .select('reason, blocked_at, expires_at')
        .eq('is_active', true)
        .or(`user_id.eq.${userId}${email ? `,email.eq.${email}` : ''}`)

      const { data: blacklistData, error: detailError } = await query
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (!detailError && blacklistData) {
        return {
          isBlacklisted: true,
          type: 'user',
          reason: blacklistData.reason,
          blockedAt: blacklistData.blocked_at,
          expiresAt: blacklistData.expires_at
        }
      }
    }

    // Check email domain blacklist
    if (email) {
      const domain = email.split('@')[1]
      const { data: domainData, error: domainError } = await supabase
        .from('moderation.email_domain_blacklist')
        .select('reason, blocked_at, expires_at')
        .eq('domain', domain)
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .single()

      if (!domainError && domainData) {
        return {
          isBlacklisted: true,
          type: 'email_domain',
          reason: domainData.reason,
          blockedAt: domainData.blocked_at,
          expiresAt: domainData.expires_at
        }
      }
    }

    return {
      isBlacklisted: false,
      type: 'user'
    }

  } catch (error) {
    console.error('Error checking user blacklist:', error)
    // Return not blacklisted on error to avoid blocking legitimate users
    return {
      isBlacklisted: false,
      type: 'user'
    }
  }
}

async function checkPropertyBlacklist(propertyId: number): Promise<PropertyBlacklistCheck> {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: isBlacklisted, error } = await supabase
      .rpc('moderation.is_property_blacklisted', {
        prop_id: propertyId
      })

    if (error) throw error

    if (isBlacklisted) {
      // Get details of the blacklist entry
      const { data: blacklistData, error: detailError } = await supabase
        .from('moderation.property_blacklist')
        .select('reason, blocked_at, expires_at')
        .eq('property_id', propertyId)
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .single()

      if (!detailError && blacklistData) {
        return {
          isBlacklisted: true,
          type: 'property',
          reason: blacklistData.reason,
          blockedAt: blacklistData.blocked_at,
          expiresAt: blacklistData.expires_at
        }
      }
    }

    return {
      isBlacklisted: false,
      type: 'property'
    }

  } catch (error) {
    console.error('Error checking property blacklist:', error)
    // Return not blacklisted on error to avoid hiding legitimate properties
    return {
      isBlacklisted: false,
      type: 'property'
    }
  }
}

async function checkIPBlacklist(ipAddress: string): Promise<IPBlacklistCheck> {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: isBlacklisted, error } = await supabase
      .rpc('moderation.is_ip_blacklisted', {
        ip_addr: ipAddress
      })

    if (error) throw error

    if (isBlacklisted) {
      // Get details of the blacklist entry
      const { data: blacklistData, error: detailError } = await supabase
        .from('moderation.ip_blacklist')
        .select('reason, blocked_at, expires_at')
        .eq('ip_address', ipAddress)
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .single()

      if (!detailError && blacklistData) {
        return {
          isBlacklisted: true,
          type: 'ip',
          reason: blacklistData.reason,
          blockedAt: blacklistData.blocked_at,
          expiresAt: blacklistData.expires_at
        }
      }
    }

    return {
      isBlacklisted: false,
      type: 'ip'
    }

  } catch (error) {
    console.error('Error checking IP blacklist:', error)
    // Return not blacklisted on error to avoid blocking legitimate IPs
    return {
      isBlacklisted: false,
      type: 'ip'
    }
  }
}
