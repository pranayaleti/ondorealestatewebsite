"use client"

import { useState, useEffect, useCallback } from 'react'
import {
  checkUserBlacklist,
  checkPropertyBlacklist,
  checkIPBlacklist,
  validateContent,
  clearBlacklistCache
} from '@/lib/blacklist'
import {
  UserBlacklistCheck,
  PropertyBlacklistCheck,
  IPBlacklistCheck
} from '@/lib/types'

/**
 * Hook for checking if a user is blacklisted
 */
export function useUserBlacklist(userId: string, email?: string, enabled = true) {
  const [check, setCheck] = useState<UserBlacklistCheck>({ isBlacklisted: false, type: 'user' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performCheck = useCallback(async () => {
    if (!enabled || !userId) return

    setLoading(true)
    setError(null)

    try {
      const result = await checkUserBlacklist(userId, email)
      setCheck(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check blacklist'
      setError(errorMessage)
      console.error('User blacklist check error:', err)
    } finally {
      setLoading(false)
    }
  }, [userId, email, enabled])

  useEffect(() => {
    performCheck()
  }, [performCheck])

  const refetch = useCallback(() => {
    performCheck()
  }, [performCheck])

  return {
    isBlacklisted: check.isBlacklisted,
    reason: check.reason,
    blockedAt: check.blockedAt,
    expiresAt: check.expiresAt,
    loading,
    error,
    refetch
  }
}

/**
 * Hook for checking if a property is blacklisted
 */
export function usePropertyBlacklist(propertyId: number, enabled = true) {
  const [check, setCheck] = useState<PropertyBlacklistCheck>({ isBlacklisted: false, type: 'property' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performCheck = useCallback(async () => {
    if (!enabled || !propertyId) return

    setLoading(true)
    setError(null)

    try {
      const result = await checkPropertyBlacklist(propertyId)
      setCheck(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check property blacklist'
      setError(errorMessage)
      console.error('Property blacklist check error:', err)
    } finally {
      setLoading(false)
    }
  }, [propertyId, enabled])

  useEffect(() => {
    performCheck()
  }, [performCheck])

  const refetch = useCallback(() => {
    performCheck()
  }, [performCheck])

  return {
    isBlacklisted: check.isBlacklisted,
    reason: check.reason,
    blockedAt: check.blockedAt,
    expiresAt: check.expiresAt,
    loading,
    error,
    refetch
  }
}

/**
 * Hook for checking if an IP is blacklisted
 */
export function useIPBlacklist(ipAddress: string, enabled = true) {
  const [check, setCheck] = useState<IPBlacklistCheck>({ isBlacklisted: false, type: 'ip' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performCheck = useCallback(async () => {
    if (!enabled || !ipAddress) return

    setLoading(true)
    setError(null)

    try {
      const result = await checkIPBlacklist(ipAddress)
      setCheck(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check IP blacklist'
      setError(errorMessage)
      console.error('IP blacklist check error:', err)
    } finally {
      setLoading(false)
    }
  }, [ipAddress, enabled])

  useEffect(() => {
    performCheck()
  }, [performCheck])

  const refetch = useCallback(() => {
    performCheck()
  }, [performCheck])

  return {
    isBlacklisted: check.isBlacklisted,
    reason: check.reason,
    blockedAt: check.blockedAt,
    expiresAt: check.expiresAt,
    loading,
    error,
    refetch
  }
}

/**
 * Hook for validating content against filters
 */
export function useContentValidation(content: string, enabled = true) {
  const [validation, setValidation] = useState<{ isValid: boolean; blockedPattern?: string }>({
    isValid: true
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performValidation = useCallback(async () => {
    if (!enabled || !content.trim()) {
      setValidation({ isValid: true })
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await validateContent(content)
      setValidation(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to validate content'
      setError(errorMessage)
      console.error('Content validation error:', err)
      setValidation({ isValid: true }) // Allow content on error
    } finally {
      setLoading(false)
    }
  }, [content, enabled])

  useEffect(() => {
    performValidation()
  }, [performValidation])

  const refetch = useCallback(() => {
    performValidation()
  }, [performValidation])

  return {
    isValid: validation.isValid,
    blockedPattern: validation.blockedPattern,
    loading,
    error,
    refetch
  }
}

/**
 * Hook for clearing blacklist cache
 */
export function useBlacklistCache() {
  const clearCache = useCallback(() => {
    clearBlacklistCache()
  }, [])

  return { clearCache }
}
