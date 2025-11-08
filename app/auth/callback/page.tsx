'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const expiresAt = searchParams.get('expires_at')

    if (accessToken) {
      localStorage.setItem('strava_access_token', accessToken)
      if (refreshToken) {
        localStorage.setItem('strava_refresh_token', refreshToken)
      }
      if (expiresAt) {
        localStorage.setItem('strava_expires_at', expiresAt)
      }
      
      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      // No token, redirect to home
      router.push('/?error=no_token')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Mengautentikasi...</div>
    </div>
  )
}

