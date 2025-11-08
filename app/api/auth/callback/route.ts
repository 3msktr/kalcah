import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL(`/?error=${error}`, request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url))
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID
    const clientSecret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET
    const redirectUri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI || 'http://localhost:3000/api/auth/callback'

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange token')
    }

    const tokenData = await tokenResponse.json()
    const { access_token, refresh_token, expires_at } = tokenData

    // Redirect to callback page with tokens in query params
    const redirectUrl = new URL('/auth/callback', request.url)
    redirectUrl.searchParams.set('access_token', access_token)
    if (refresh_token) redirectUrl.searchParams.set('refresh_token', refresh_token)
    if (expires_at) redirectUrl.searchParams.set('expires_at', expires_at.toString())

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
  }
}

