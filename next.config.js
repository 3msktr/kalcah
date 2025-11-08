/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_STRAVA_CLIENT_ID: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
    NEXT_PUBLIC_STRAVA_CLIENT_SECRET: process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET,
    NEXT_PUBLIC_STRAVA_REDIRECT_URI: process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI,
  },
}

module.exports = nextConfig

