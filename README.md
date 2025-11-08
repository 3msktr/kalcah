# Strava Data Viewer

Aplikasi web untuk menampilkan dan mengunduh data Strava dalam bentuk gambar.

## Fitur

- ✅ OAuth Authorization dengan Strava
- ✅ Menampilkan profil atlet
- ✅ Menampilkan statistik total (jarak, waktu, ketinggian)
- ✅ Menampilkan aktivitas terbaru
- ✅ Download data sebagai gambar PNG

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Dapatkan Strava API Credentials:**
   - Buka https://www.strava.com/settings/api
   - Buat aplikasi baru
   - Catat Client ID dan Client Secret
   - Set Authorization Callback Domain ke: `localhost`

3. **Setup Environment Variables:**
   - Copy `.env.local.example` ke `.env.local`
   - Isi dengan credentials Strava Anda:
     ```
     NEXT_PUBLIC_STRAVA_CLIENT_ID=your_client_id
     NEXT_PUBLIC_STRAVA_CLIENT_SECRET=your_client_secret
     NEXT_PUBLIC_STRAVA_REDIRECT_URI=http://localhost:3000/api/auth/callback
     ```

4. **Jalankan aplikasi:**
   ```bash
   npm run dev
   ```

5. **Buka browser:**
   - Buka http://localhost:3000
   - Klik "Connect with Strava"
   - Authorize aplikasi
   - Lihat data Anda dan download sebagai gambar!

## Teknologi

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- html2canvas (untuk download gambar)
- Strava API v3

## Catatan

- Pastikan redirect URI di Strava settings sesuai dengan yang di `.env.local`
- Token akan disimpan di localStorage browser
- Gambar yang diunduh akan berisi semua data yang ditampilkan di dashboard

