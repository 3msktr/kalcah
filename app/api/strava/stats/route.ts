import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const accessToken = searchParams.get('access_token')
  const athleteId = searchParams.get('athlete_id')

  if (!accessToken || !athleteId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 401 })
  }

  try {
    // Fetch athlete stats
    const statsResponse = await fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!statsResponse.ok) {
      throw new Error('Failed to fetch stats')
    }

    const stats = await statsResponse.json()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

