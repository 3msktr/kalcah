'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import html2canvas from 'html2canvas'

interface Activity {
  id: number
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  start_date: string
  average_speed: number
  max_speed: number
}

interface Athlete {
  id: number
  firstname: string
  lastname: string
  profile: string
}

interface Stats {
  all_ride_totals: {
    distance: number
    moving_time: number
    elevation_gain: number
  }
  all_run_totals: {
    distance: number
    moving_time: number
    elevation_gain: number
  }
  biggest_ride_distance: number
  biggest_climb_elevation_gain: number
}

export default function Dashboard() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const dataRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('strava_access_token')

      if (token) {
        setAccessToken(token)
      } else {
        router.push('/')
        return
      }
    }
  }, [router])

  useEffect(() => {
    if (!accessToken) return

    const fetchData = async () => {
      try {
        // Fetch athlete info
        const athleteRes = await fetch(`/api/strava/athlete?access_token=${accessToken}`)
        const athleteData = await athleteRes.json()
        setAthlete(athleteData)

        // Fetch activities
        const activitiesRes = await fetch(`/api/strava/activities?access_token=${accessToken}`)
        const activitiesData = await activitiesRes.json()
        setActivities(activitiesData)

        // Fetch stats
        if (athleteData.id) {
          const statsRes = await fetch(`/api/strava/stats?access_token=${accessToken}&athlete_id=${athleteData.id}`)
          const statsData = await statsRes.json()
          setStats(statsData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [accessToken])

  const handleDownload = async () => {
    if (!dataRef.current) return

    setDownloading(true)
    try {
      const canvas = await html2canvas(dataRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `strava-data-${new Date().toISOString().split('T')[0]}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
      alert('Gagal mengunduh gambar. Silakan coba lagi.')
    } finally {
      setDownloading(false)
    }
  }

  const formatDistance = (meters: number) => {
    return (meters / 1000).toFixed(2) + ' km'
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('strava_access_token')
    localStorage.removeItem('strava_refresh_token')
    localStorage.removeItem('strava_expires_at')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Memuat data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Strava</h1>
            {athlete && (
              <p className="text-gray-600">
                Selamat datang, {athlete.firstname} {athlete.lastname}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-strava-orange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {downloading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengunduh...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Image
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Data Display - This will be captured as image */}
        <div ref={dataRef} className="bg-white rounded-lg shadow-md p-8">
          {/* Athlete Profile */}
          {athlete && (
            <div className="mb-8 pb-8 border-b">
              <div className="flex items-center gap-4">
                {athlete.profile && (
                  <img
                    src={athlete.profile}
                    alt={`${athlete.firstname} ${athlete.lastname}`}
                    className="w-24 h-24 rounded-full border-4 border-strava-orange"
                  />
                )}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {athlete.firstname} {athlete.lastname}
                  </h2>
                  <p className="text-gray-600 mt-1">Strava Athlete</p>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          {stats && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Statistik Total</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">Total Jarak Bersepeda</p>
                  <p className="text-2xl font-bold text-strava-orange">
                    {formatDistance(stats.all_ride_totals?.distance || 0)}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Total Jarak Lari</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatDistance(stats.all_run_totals?.distance || 0)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Perjalanan Terpanjang</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatDistance(stats.biggest_ride_distance || 0)}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Ketinggian Tertinggi</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(stats.biggest_climb_elevation_gain || 0)} m
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activities */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h3>
            {activities.length === 0 ? (
              <p className="text-gray-600">Tidak ada aktivitas ditemukan</p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {activity.name}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Jarak</p>
                            <p className="font-semibold text-gray-800">
                              {formatDistance(activity.distance)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Waktu</p>
                            <p className="font-semibold text-gray-800">
                              {formatTime(activity.moving_time)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Ketinggian</p>
                            <p className="font-semibold text-gray-800">
                              {Math.round(activity.total_elevation_gain)} m
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Kecepatan Rata-rata</p>
                            <p className="font-semibold text-gray-800">
                              {(activity.average_speed * 3.6).toFixed(1)} km/h
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(activity.start_date)} • {activity.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

