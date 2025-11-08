'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authorized
    const token = localStorage.getItem('strava_access_token')
    if (token) {
      setIsAuthorized(true)
    }
    setLoading(false)
  }, [])

  const handleAuthorize = () => {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID
    const redirectUri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI || 'http://localhost:3000/api/auth/callback'
    const scope = 'read,activity:read'
    const responseType = 'code'
    const approvalPrompt = 'force'
    
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}&approval_prompt=${approvalPrompt}`
    
    window.location.href = authUrl
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (isAuthorized) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Strava Data Viewer</h1>
          <p className="text-gray-600">Lihat dan download data aktivitas Strava Anda</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleAuthorize}
            className="w-full bg-strava-orange hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h-5.688L8.294 7.345l2.085-4.112 7.02 13.828h-5.688"/>
            </svg>
            Connect with Strava
          </button>
          
          <p className="text-sm text-gray-500 text-center">
            Anda akan diarahkan ke Strava untuk memberikan izin akses
          </p>
        </div>
      </div>
    </div>
  )
}

