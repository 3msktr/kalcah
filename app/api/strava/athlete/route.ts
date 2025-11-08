import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const accessToken = searchParams.get('access_token')

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token provided' }, { status: 401 })
  }

  try {
    // Fetch athlete info
    const athleteResponse = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!athleteResponse.ok) {
      throw new Error('Failed to fetch athlete')
    }

    const athlete = await athleteResponse.json()
    return NextResponse.json(athlete)
  } catch (error) {
    console.error('Error fetching athlete:', error)
    return NextResponse.json({ error: 'Failed to fetch athlete' }, { status: 500 })
  }
}

