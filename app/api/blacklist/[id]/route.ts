import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { UpdateBlacklistRequest, BlacklistResponse } from '@/lib/types'

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

// Helper function to determine table name from blacklist type
function getTableName(type: string) {
  switch (type) {
    case 'user': return 'moderation.user_blacklist'
    case 'property': return 'moderation.property_blacklist'
    case 'ip': return 'moderation.ip_blacklist'
    case 'email_domain': return 'moderation.email_domain_blacklist'
    case 'content': return 'moderation.content_filter'
    default: return null
  }
}

// GET /api/blacklist/[id] - Get specific blacklist entry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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
    const type = searchParams.get('type')

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type parameter is required' },
        { status: 400 }
      )
    }

    const tableName = getTableName(type)
    if (!tableName) {
      return NextResponse.json(
        { success: false, error: 'Invalid blacklist type' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Blacklist entry not found' },
          { status: 404 }
        )
      }
      throw error
    }

    const response: BlacklistResponse = {
      success: true,
      data: { ...data, type }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error fetching blacklist entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blacklist entry' },
      { status: 500 }
    )
  }
}

// PUT /api/blacklist/[id] - Update blacklist entry
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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
    const type = searchParams.get('type')

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type parameter is required' },
        { status: 400 }
      )
    }

    const tableName = getTableName(type)
    if (!tableName) {
      return NextResponse.json(
        { success: false, error: 'Invalid blacklist type' },
        { status: 400 }
      )
    }

    const body: UpdateBlacklistRequest = await request.json()

    // Build update object
    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    if (body.reason !== undefined) updateData.reason = body.reason
    if (body.expiresAt !== undefined) updateData.expires_at = body.expiresAt
    if (body.isActive !== undefined) updateData.is_active = body.isActive
    if (body.notes !== undefined) updateData.notes = body.notes

    const { data, error } = await supabase
      .from(tableName)
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Blacklist entry not found' },
          { status: 404 }
        )
      }
      throw error
    }

    const response: BlacklistResponse = {
      success: true,
      data: { ...data, type },
      message: 'Blacklist entry updated successfully'
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error updating blacklist entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update blacklist entry' },
      { status: 500 }
    )
  }
}

// DELETE /api/blacklist/[id] - Delete blacklist entry (soft delete by deactivating)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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
    const type = searchParams.get('type')

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type parameter is required' },
        { status: 400 }
      )
    }

    const tableName = getTableName(type)
    if (!tableName) {
      return NextResponse.json(
        { success: false, error: 'Invalid blacklist type' },
        { status: 400 }
      )
    }

    // Soft delete by deactivating the entry
    const { data, error } = await supabase
      .from(tableName)
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Blacklist entry not found' },
          { status: 404 }
        )
      }
      throw error
    }

    const response: BlacklistResponse = {
      success: true,
      data: { ...data, type },
      message: 'Blacklist entry deactivated successfully'
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error deactivating blacklist entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to deactivate blacklist entry' },
      { status: 500 }
    )
  }
}
