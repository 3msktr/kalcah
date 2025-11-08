import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const accessToken = searchParams.get('access_token')

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token provided' }, { status: 401 })
  }

  try {
    // Fetch recent activities
    const activitiesResponse = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=10', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!activitiesResponse.ok) {
      throw new Error('Failed to fetch activities')
    }

    const activities = await activitiesResponse.json()
    return NextResponse.json(activities)
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}

