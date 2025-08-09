# 📚 LibraryHub

**LibraryHub** adalah proyek latihan awal yang dibuat menggunakan React dan Express. Website ini berupa **landing page** dengan 4 halaman utama, dirancang untuk menjadi platform perpustakaan digital sederhana yang dapat diakses secara online.  

Website ini memungkinkan pengguna untuk menjelajahi koleksi buku, membaca pratinjau beberapa halaman, dan mengunduh buku sesuai hak akses yang dimiliki. Tampilan dibuat bersih, responsif, dan mudah digunakan.

---

## ✨ Fitur

- 🔍 Pencarian dan filter buku berdasarkan kata kunci atau kategori  
- 📖 Pratinjau beberapa halaman buku menggunakan `react-pdf`  
- 💾 Unduh buku sesuai tingkat akses pengguna  
- 🌐 Tampilan responsif dengan React + Tailwind CSS  

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React, Vite, Tailwind CSS, React Router DOM  
- **Backend**: Node.js, Express  
- **Database**: Supabase (PostgreSQL)  
- **Storage**: Supabase Storage  
- **PDF Viewer**: `@react-pdf-viewer`  
- **Deployment**: Vercel (frontend & backend) & Supabase (DB)  

---

## 🚀 Cara Menjalankan Proyek Ini

### 1. Clone repositori
```bash
git clone https://github.com/gusalitt/libraryhub.git
cd libraryhub
```

### 2. Setup Frontend (Client)
```bash
cd client
npm install
cp .env.example .env
```
Edit file `.env` di `client` dan isi dengan:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_SUPABASE_STORAGE_URL=your_supabase_storage_url
```

### 3. Setup Backend (Server)
```bash
cd ../server
npm install
cp .env.example .env
```
Edit file `.env` di `server` dan isi dengan:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
```

### 4. Jalankan Backend
```bash
cd server
npm run dev
```

### 5. Jalankan Frontend
Buka terminal baru:
```bash
cd client
npm run dev
```

### 6. Akses Website
- **Frontend**: `http://localhost:5173`  
- **Backend**: `http://localhost:3000/api/v1`

---

## 📂 Struktur Folder
```
libraryhub/
├── client/                 # Source code frontend (React + Vite + Tailwind)
│   ├── public/              # File statis frontend
│   ├── src/                 # Komponen React & logika UI
│   └── .env.example         # Contoh konfigurasi environment untuk client
│
├── server/                 # Source code backend (Express + Supabase)
│   ├── src/                 # API routes & logic server
│   └── .env.example         # Contoh konfigurasi environment untuk server
│
├── README.md               # Dokumentasi proyek
└── package.json            # Konfigurasi npm (jika ada setup root)
```