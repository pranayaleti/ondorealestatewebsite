import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  BlacklistType,
  BlacklistQueryParams,
  BlacklistListResponse,
  BlacklistResponse,
  CreateUserBlacklistRequest,
  CreatePropertyBlacklistRequest,
  CreateIPBlacklistRequest,
  CreateEmailDomainBlacklistRequest,
  CreateContentFilterRequest
} from '@/lib/types'

// Helper function to get user from token
async function getUserFromToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)

  // Initialize Supabase client inside function to avoid build-time issues
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return null
  }

  return user
}

// GET /api/blacklist - List blacklist entries
export async function GET(request: NextRequest) {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const queryParams: BlacklistQueryParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      isActive: searchParams.get('isActive') === 'true' ? true :
               searchParams.get('isActive') === 'false' ? false : undefined,
      type: searchParams.get('type') as BlacklistType || undefined,
      search: searchParams.get('search') || undefined
    }

    const offset = (queryParams.page! - 1) * queryParams.limit!

    let query

    // Build query based on type
    switch (queryParams.type) {
      case 'user':
        query = supabase
          .from('moderation.user_blacklist')
          .select('*', { count: 'exact' })
        break
      case 'property':
        query = supabase
          .from('moderation.property_blacklist')
          .select('*', { count: 'exact' })
        break
      case 'ip':
        query = supabase
          .from('moderation.ip_blacklist')
          .select('*', { count: 'exact' })
        break
      case 'email_domain':
        query = supabase
          .from('moderation.email_domain_blacklist')
          .select('*', { count: 'exact' })
        break
      case 'content':
        query = supabase
          .from('moderation.content_filter')
          .select('*', { count: 'exact' })
        break
      default:
        // Get all types combined
        const [userData, propertyData, ipData, domainData, contentData] = await Promise.all([
          supabase.from('moderation.user_blacklist').select('*'),
          supabase.from('moderation.property_blacklist').select('*'),
          supabase.from('moderation.ip_blacklist').select('*'),
          supabase.from('moderation.email_domain_blacklist').select('*'),
          supabase.from('moderation.content_filter').select('*')
        ])

        const allData = [
          ...userData.data?.map(item => ({ ...item, type: 'user' })) || [],
          ...propertyData.data?.map(item => ({ ...item, type: 'property' })) || [],
          ...ipData.data?.map(item => ({ ...item, type: 'ip' })) || [],
          ...domainData.data?.map(item => ({ ...item, type: 'email_domain' })) || [],
          ...contentData.data?.map(item => ({ ...item, type: 'content' })) || []
        ]

        // Apply filters
        let filteredData = allData
        if (queryParams.isActive !== undefined) {
          filteredData = filteredData.filter(item => item.is_active === queryParams.isActive)
        }
        if (queryParams.search) {
          const search = queryParams.search.toLowerCase()
          filteredData = filteredData.filter(item =>
            item.reason?.toLowerCase().includes(search) ||
            item.notes?.toLowerCase().includes(search) ||
            (item.type === 'user' && (item.email?.toLowerCase().includes(search) || item.user_id?.toLowerCase().includes(search))) ||
            (item.type === 'property' && item.property_id?.toString().includes(search)) ||
            (item.type === 'ip' && item.ip_address?.includes(search)) ||
            (item.type === 'email_domain' && item.domain?.toLowerCase().includes(search)) ||
            (item.type === 'content' && item.pattern?.toLowerCase().includes(search))
          )
        }

        const total = filteredData.length
        const paginatedData = filteredData.slice(offset, offset + queryParams.limit!)

        const response: BlacklistListResponse<any> = {
          success: true,
          data: paginatedData,
          total,
          page: queryParams.page!,
          limit: queryParams.limit!,
          hasMore: offset + queryParams.limit! < total
        }

        return NextResponse.json(response)
    }

    // Apply common filters
    if (queryParams.isActive !== undefined) {
      query = query.eq('is_active', queryParams.isActive)
    }

    if (queryParams.search) {
      const search = queryParams.search.toLowerCase()
      switch (queryParams.type) {
        case 'user':
          query = query.or(`reason.ilike.%${search}%,notes.ilike.%${search}%,email.ilike.%${search}%`)
          break
        case 'property':
          query = query.or(`reason.ilike.%${search}%,notes.ilike.%${search}%`)
          break
        case 'ip':
          query = query.or(`reason.ilike.%${search}%,notes.ilike.%${search}%,ip_address.ilike.%${search}%`)
          break
        case 'email_domain':
          query = query.or(`reason.ilike.%${search}%,notes.ilike.%${search}%,domain.ilike.%${search}%`)
          break
        case 'content':
          query = query.or(`reason.ilike.%${search}%,notes.ilike.%${search}%,pattern.ilike.%${search}%`)
          break
      }
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + queryParams.limit! - 1)

    const { data, error, count } = await query
    if (error) throw error

    const response: BlacklistListResponse<any> = {
      success: true,
      data: data || [],
      total: count || 0,
      page: queryParams.page!,
      limit: queryParams.limit!,
      hasMore: offset + queryParams.limit! < (count || 0)
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error fetching blacklist entries:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blacklist entries' },
      { status: 500 }
    )
  }
}

// POST /api/blacklist - Create blacklist entry
export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client inside function to avoid build-time issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type, ...data } = body

    let result
    switch (type) {
      case 'user':
        const userData: CreateUserBlacklistRequest = data
        result = await supabase
          .from('moderation.user_blacklist')
          .insert({
            user_id: userData.userId,
            email: userData.email,
            reason: userData.reason,
            blocked_by: user.id,
            expires_at: userData.expiresAt,
            notes: userData.notes
          })
          .select()
          .single()
        break

      case 'property':
        const propertyData: CreatePropertyBlacklistRequest = data
        result = await supabase
          .from('moderation.property_blacklist')
          .insert({
            property_id: propertyData.propertyId,
            reason: propertyData.reason,
            blocked_by: user.id,
            expires_at: propertyData.expiresAt,
            notes: propertyData.notes
          })
          .select()
          .single()
        break

      case 'ip':
        const ipData: CreateIPBlacklistRequest = data
        result = await supabase
          .from('moderation.ip_blacklist')
          .insert({
            ip_address: ipData.ipAddress,
            reason: ipData.reason,
            blocked_by: user.id,
            expires_at: ipData.expiresAt,
            notes: ipData.notes
          })
          .select()
          .single()
        break

      case 'email_domain':
        const domainData: CreateEmailDomainBlacklistRequest = data
        result = await supabase
          .from('moderation.email_domain_blacklist')
          .insert({
            domain: domainData.domain,
            reason: domainData.reason,
            blocked_by: user.id,
            expires_at: domainData.expiresAt,
            notes: domainData.notes
          })
          .select()
          .single()
        break

      case 'content':
        const contentData: CreateContentFilterRequest = data
        result = await supabase
          .from('moderation.content_filter')
          .insert({
            pattern: contentData.pattern,
            reason: contentData.reason,
            blocked_by: user.id,
            notes: contentData.notes
          })
          .select()
          .single()
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid blacklist type' },
          { status: 400 }
        )
    }

    if (result.error) {
      throw result.error
    }

    const response: BlacklistResponse = {
      success: true,
      data: result.data,
      message: 'Blacklist entry created successfully'
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error creating blacklist entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blacklist entry' },
      { status: 500 }
    )
  }
}
