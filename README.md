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

## GitHub Repository

Project ini terhubung dengan repository GitHub: https://github.com/3msktr/kalcah.git

### Push ke GitHub

Jika Anda belum melakukan push, ikuti langkah berikut:

1. **Setup autentikasi GitHub:**
   - Opsi 1: Gunakan SSH (disarankan)
     ```bash
     git remote set-url origin git@github.com:3msktr/kalcah.git
     ```
   - Opsi 2: Gunakan Personal Access Token
     - Buat token di: https://github.com/settings/tokens
     - Gunakan token sebagai password saat push

2. **Push ke GitHub:**
   ```bash
   git push -u origin main
   ```

## Deployment ke Vercel

1. **Install Vercel CLI (opsional):**
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard:**
   - Buka https://vercel.com
   - Import project dari GitHub repository
   - Atau deploy via CLI:
     ```bash
     vercel
     ```

3. **Setup Environment Variables di Vercel:**
   - Buka project settings di Vercel Dashboard
   - Masuk ke tab "Environment Variables"
   - Tambahkan variabel berikut:
     ```
     NEXT_PUBLIC_STRAVA_CLIENT_ID=your_client_id
     NEXT_PUBLIC_STRAVA_CLIENT_SECRET=your_client_secret
     NEXT_PUBLIC_STRAVA_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback
     ```
   - **Penting:** Ganti `your-app.vercel.app` dengan domain Vercel Anda
   - Pilih environment: Production, Preview, dan Development

4. **Update Strava App Settings:**
   - Buka https://www.strava.com/settings/api
   - Edit aplikasi Anda
   - Tambahkan Authorization Callback Domain: `your-app.vercel.app`
   - Atau tambahkan redirect URI lengkap: `https://your-app.vercel.app/api/auth/callback`

5. **Redeploy:**
   - Setelah menambahkan environment variables, redeploy aplikasi
   - Bisa melalui dashboard atau push commit baru

## Catatan

- Pastikan redirect URI di Strava settings sesuai dengan domain Vercel Anda
- Token akan disimpan di localStorage browser
- Gambar yang diunduh akan berisi semua data yang ditampilkan di dashboard
- Environment variables harus di-set di Vercel untuk production

