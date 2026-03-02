import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configure for static export
export const dynamic = 'force-static'
export const revalidate = 0

// GET /api/properties/public - Get public properties with blacklist filtering
export async function GET(request: NextRequest) {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100) // Max 100
    const offset = parseInt(searchParams.get('offset') || '0')

    // First, get all properties that are not blacklisted
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json(
        { error: 'Failed to fetch properties' },
        { status: 500 }
      )
    }

    if (!properties || properties.length === 0) {
      return NextResponse.json([])
    }

    // Filter out blacklisted properties
    const filteredProperties = []

    for (const property of properties) {
      // Check if property is blacklisted
      const { data: isBlacklisted } = await supabase
        .rpc('moderation.is_property_blacklisted', {
          prop_id: property.id
        })

      if (!isBlacklisted) {
        filteredProperties.push(property)
      }
    }

    // If we filtered out some properties and need more to reach the limit, fetch additional ones
    let finalProperties = filteredProperties
    if (filteredProperties.length < limit && properties.length === limit) {
      let additionalOffset = offset + limit
      let additionalNeeded = limit - filteredProperties.length

      while (additionalNeeded > 0) {
        const { data: additionalProperties, error: additionalError } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false })
          .range(additionalOffset, additionalOffset + additionalNeeded - 1)

        if (additionalError || !additionalProperties || additionalProperties.length === 0) {
          break
        }

        const additionalFiltered = []
        for (const property of additionalProperties) {
          const { data: isBlacklisted } = await supabase
            .rpc('moderation.is_property_blacklisted', {
              prop_id: property.id
            })

          if (!isBlacklisted) {
            additionalFiltered.push(property)
          }
        }

        finalProperties = [...finalProperties, ...additionalFiltered]
        additionalOffset += additionalNeeded
        additionalNeeded = limit - finalProperties.length

        if (additionalFiltered.length === 0) {
          break // No more valid properties
        }
      }
    }

    return NextResponse.json(finalProperties)

  } catch (error) {
    console.error('Error in properties API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function _getClientIP(request: NextRequest): string | null {
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip',
    'x-cluster-client-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ]

  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      const ip = value.split(',')[0].trim()
      if (ip && ip !== 'unknown') {
        return ip
      }
    }
  }

  return null
}
