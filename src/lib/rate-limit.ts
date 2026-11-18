import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface RateLimitConfig {
  maxRequests: number // Maximum allowed requests
  windowSeconds: number // Window in seconds
}

// In-memory sliding window cache for fast burst mitigation
const memoryStore = new Map<string, { count: number; resetAt: number }>()

/**
 * Periodically purge expired in-memory rate-limit entries to prevent memory leaks
 */
function cleanupMemoryStore() {
  const now = Date.now()
  for (const [key, record] of memoryStore.entries()) {
    if (record.resetAt <= now) {
      memoryStore.delete(key)
    }
  }
}

// Clean up every 2 minutes
setInterval(cleanupMemoryStore, 2 * 60 * 1000).unref?.()

/**
 * Resolves the client IP address from standard proxy headers
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // Return first IP in the chain (client IP)
    return forwarded.split(',')[0].trim()
  }

  const cfIp = request.headers.get('cf-connecting-ip')
  if (cfIp) return cfIp.trim()

  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  return '127.0.0.1'
}

/**
 * Checks rate limit for a given key (e.g. `register:192.168.1.1`)
 * Returns `{ allowed: boolean, remaining: number, resetInSeconds: number }`
 */
export async function checkRateLimit(
  key: string,
  config: RateLimitConfig = { maxRequests: 5, windowSeconds: 600 }
): Promise<{ allowed: boolean; remaining: number; resetInSeconds: number }> {
  const now = Date.now()
  const windowMs = config.windowSeconds * 1000

  // 1. Fast in-memory check
  const memRecord = memoryStore.get(key)
  if (memRecord && memRecord.resetAt > now) {
    if (memRecord.count >= config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetInSeconds: Math.ceil((memRecord.resetAt - now) / 1000),
      }
    }
    memRecord.count += 1
  } else {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs })
  }

  // 2. Persistent Supabase-backed rate limiting (if database table exists)
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.rpc('check_rate_limit', {
      rate_key: key,
      max_limit: config.maxRequests,
      window_seconds: config.windowSeconds,
    })

    if (!error && data !== null && typeof data === 'boolean') {
      return {
        allowed: data,
        remaining: data ? 1 : 0,
        resetInSeconds: config.windowSeconds,
      }
    }
  } catch {
    // If the DB RPC function is not yet installed in Supabase, fallback cleanly to memoryStore
  }

  const current = memoryStore.get(key)!
  return {
    allowed: current.count <= config.maxRequests,
    remaining: Math.max(0, config.maxRequests - current.count),
    resetInSeconds: Math.ceil((current.resetAt - now) / 1000),
  }
}
