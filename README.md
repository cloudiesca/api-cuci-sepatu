# REST API Daftar Barang Cuci Sepatu

## Deskripsi Umum

API ini dibuat untuk membantu pengelolaan layanan cuci sepatu secara digital. Dibangun dengan Node.js dan Express.js, API ini menyediakan sistem pencatatan yang efisien untuk tracking sepatu pelanggan mulai dari proses masuk, pencucian, hingga pengambilan.
Dengan menggunakan database Supabase, semua data tersimpan dengan aman dan dapat diakses kapan saja. API ini cocok digunakan untuk usaha cuci sepatu skala kecil hingga menengah yang ingin mengdigitalkan sistem pencatatan mereka.

---

## Tujuan

1. Mengimplementasikan konsep CRUD (Create, Read, Update, Delete) dalam REST API.
2. Meningkatkan pemahaman penggunaan Express.js sebagai framework backend.
3. Mengelola data menggunakan format JSON sebagai penyimpanan sederhana.
4. Membangun sistem pencatatan yang relevan dengan kebutuhan bisnis nyata.

---

## Fitur Utama API

API ini menyediakan endpoint untuk menampilkan seluruh daftar sepatu yang sedang dicuci, menambahkan data sepatu baru ke dalam daftar, memperbarui status sepatu (misalnya dari Sedang Dicuci menjadi Selesai), dan menghapus data sepatu yang sudah selesai dicuci. Tersedia juga fitur filter untuk mencari sepatu berdasarkan status tertentu menggunakan query parameter.

### Endpoint yang Tersedia

```
GET    /items           - Menampilkan seluruh daftar sepatu yang sedang dicuci
GET    /items/:id       - Menampilkan detail sepatu berdasarkan ID
GET    /items?status=   - Menampilkan sepatu dengan filter status tertentu
POST   /items           - Menambahkan data sepatu baru ke dalam daftar
PUT    /items/:id       - Memperbarui status sepatu
DELETE /items/:id       - Menghapus data sepatu yang sudah selesai dicuci
```

---

## Struktur Data

Setiap data sepatu memiliki struktur sebagai berikut:

```javascript
{
  id: "uuid",                          // ID unik yang di-generate otomatis
  nama_pelanggan: "string",            // Nama pelanggan (required)
  jenis_sepatu: "string",              // Jenis sepatu seperti Sneakers, Boots, dll (required)
  warna: "string",                     // Warna sepatu (optional)
  layanan: "string",                   // Jenis layanan: Fast Cleaning, Deep Cleaning, atau Premium Cleaning (required)
  status: "string",                    // Status cucian: Dalam Proses, Selesai, atau Diambil (default: Dalam Proses)
  harga: number,                       // Harga layanan dalam Rupiah (required)
  tanggal_masuk: "timestamp",          // Tanggal sepatu masuk (auto-generated)
  estimasi_selesai: "timestamp",       // Estimasi waktu selesai (optional)
  created_at: "timestamp"              // Waktu record dibuat (auto-generated)
}
```

> **Catatan:** Field yang wajib diisi saat membuat data baru adalah `nama_pelanggan`, `jenis_sepatu`, `layanan`, dan `harga`. Sedangkan field lainnya bersifat opsional atau akan di-generate secara otomatis oleh sistem.

---

## Contoh Request dan Response

### Menampilkan Semua Data Sepatu

**Request:**
```http
GET https://api-cuci-sepatu-liard.vercel.app/items
```

**Response:**
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": "02f870b9-49ed-4102-9c02-4fec5cca1afc",
            "nama_pelanggan": "Ahmad Rizki",
            "jenis_sepatu": "Sneakers",
            "warna": "Putih",
            "layanan": "Deep Cleaning",
            "status": "Dalam Proses",
            "harga": 50000,
            "tanggal_masuk": "2025-10-22T01:41:45.852673",
            "estimasi_selesai": null,
            "created_at": "2025-10-22T01:41:45.852673"
        },
        {
            "id": "8148c5cf-7807-4bde-b915-fe188e7815cc",
            "nama_pelanggan": "Siti Nurhaliza",
            "jenis_sepatu": "Boots",
            "warna": "Hitam",
            "layanan": "Fast Cleaning",
            "status": "Selesai",
            "harga": 35000,
            "tanggal_masuk": "2025-10-22T01:41:45.852673",
            "estimasi_selesai": null,
            "created_at": "2025-10-22T01:41:45.852673"
        },
        {
            "id": "cbca4dc6-4ae5-46e3-990f-4bc4f7872135",
            "nama_pelanggan": "Budi Santoso",
            "jenis_sepatu": "Casual",
            "warna": "Biru",
            "layanan": "Deep Cleaning",
            "status": "Dalam Proses",
            "harga": 45000,
            "tanggal_masuk": "2025-10-22T01:41:45.852673",
            "estimasi_selesai": null,
            "created_at": "2025-10-22T01:41:45.852673"
        }
    ]
}
```

---

### Menampilkan Data dengan Filter Status

**Request:**
```http
GET https://api-cuci-sepatu-liard.vercel.app/items?status=Selesai
```

**Response:**
```json
{
    "success": true,
    "count": 1,
    "data": [
        {
            "id": "8148c5cf-7807-4bde-b915-fe188e7815cc",
            "nama_pelanggan": "Siti Nurhaliza",
            "jenis_sepatu": "Boots",
            "warna": "Hitam",
            "layanan": "Fast Cleaning",
            "status": "Selesai",
            "harga": 35000,
            "tanggal_masuk": "2025-10-22T01:41:45.852673",
            "estimasi_selesai": null,
            "created_at": "2025-10-22T01:41:45.852673"
        }
    ]
}
```

---

### Menambahkan Data Sepatu Baru

**Request:**
```http
POST https://api-cuci-sepatu-liard.vercel.app/items
Content-Type: application/json

{
  "nama_pelanggan": "Siti Aminah",
  "jenis_sepatu": "Boots",
  "warna": "Hitam",
  "layanan": "Fast Cleaning",
  "harga": 35000
}
```

**Response:**
```json
{
    "success": true,
    "message": "Data sepatu berhasil ditambahkan",
    "data": {
        "id": "57af544a-a5ea-4c39-afdd-e6a5a7e48767",
        "nama_pelanggan": "Siti Aminah",
        "jenis_sepatu": "Boots",
        "warna": "Hitam",
        "layanan": "Fast Cleaning",
        "status": "Dalam Proses",
        "harga": 35000,
        "tanggal_masuk": "2025-10-23T03:12:35.657",
        "estimasi_selesai": null,
        "created_at": "2025-10-23T03:12:36.54"
    }
}
```

---

### Memperbarui Status Sepatu

**Request:**
```http
PUT https://api-cuci-sepatu-liard.vercel.app/items/02f870b9-49ed-4102-9c02-4fec5cca1afc (tambahkan id pelanggan yang ingin diupdate)
Content-Type: application/json

{
  "status": "Selesai"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Data berhasil diupdate",
    "data": {
        "id": "02f870b9-49ed-4102-9c02-4fec5cca1afc",
        "nama_pelanggan": "Ahmad Rizki",
        "jenis_sepatu": "Sneakers",
        "warna": "Putih",
        "layanan": "Deep Cleaning",
        "status": "Selesai",
        "harga": 50000,
        "tanggal_masuk": "2025-10-22T01:41:45.852673",
        "estimasi_selesai": null,
        "created_at": "2025-10-22T01:41:45.852673"
    }
}
```

---

### Menghapus Data Sepatu

**Request:**
```http
DELETE https://api-cuci-sepatu-liard.vercel.app/items/02f870b9-49ed-4102-9c02-4fec5cca1afc (tambahkan id pelanggan yang ingin dihapus)
```

**Response:**
```json
{
    "success": true,
    "message": "Data berhasil dihapus",
    "data": {
        "id": "02f870b9-49ed-4102-9c02-4fec5cca1afc",
        "nama_pelanggan": "Ahmad Rizki",
        "jenis_sepatu": "Sneakers",
        "warna": "Putih",
        "layanan": "Deep Cleaning",
        "status": "Selesai",
        "harga": 50000,
        "tanggal_masuk": "2025-10-22T01:41:45.852673",
        "estimasi_selesai": null,
        "created_at": "2025-10-22T01:41:45.852673"
    }
}
```

---

## Langkah Instalasi dan Cara Menjalankan API

### Setup Database (Langkah Pertama)

**1. Buat akun dan project di Supabase:**
- Buka [supabase.com](https://supabase.com) dan Sign Up
- Klik **"New Project"**
- Isi nama project, database password, dan pilih region **Southeast Asia (Singapore)**
- Tunggu hingga project selesai dibuat (2-3 menit)

**2. Dapatkan API Credentials:**
- Di Supabase Dashboard, klik **Settings** → **API**
- Copy dan simpan:
  - **Project URL** (contoh: `https://xxxxx.supabase.co`)
  - **anon public key** (key yang panjang, mulai dengan `eyJh...`)

**3. Buat tabel database:**
- Di sidebar, klik **SQL Editor** → **New Query**
- Copy-paste query berikut dan klik **Run**:

```sql
CREATE TABLE sepatu (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_pelanggan VARCHAR(255) NOT NULL,
  jenis_sepatu VARCHAR(100) NOT NULL,
  warna VARCHAR(50),
  layanan VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Dalam Proses',
  harga INTEGER NOT NULL,
  tanggal_masuk TIMESTAMP DEFAULT NOW(),
  estimasi_selesai TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE sepatu ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON sepatu FOR ALL USING (true);

-- Insert sample data
INSERT INTO sepatu (nama_pelanggan, jenis_sepatu, warna, layanan, status, harga) VALUES
('Ahmad Rizki', 'Sneakers', 'Putih', 'Deep Cleaning', 'Dalam Proses', 50000),
('Siti Nurhaliza', 'Boots', 'Hitam', 'Fast Cleaning', 'Selesai', 35000);
```

**4. Verifikasi database:**
- Klik **Table Editor** di sidebar
- Pastikan tabel `sepatu` sudah ada dengan 2 data sample

---

### Instalasi Project Lokal (Langkah Kedua)

**1. Clone repository ini ke komputer Anda:**
```bash
git clone https://github.com/cloudiesca/api-cuci-sepatu.git
cd api-cuci-sepatu
```

**2. Install semua dependencies yang diperlukan:**
```bash
npm install
```

**3. Buat file `.env` dengan menyalin dari `.env.example`:**
```bash
cp .env.example .env
```

**4. Buka file `.env` dan isi dengan credentials Supabase yang sudah didapatkan:**
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
PORT=3000
```

---

### Menjalankan Server

Setelah semua setup selesai, jalankan server dengan perintah:

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`. Anda bisa membuka browser dan mengakses URL tersebut untuk melihat info API, atau gunakan tools seperti **Postman** untuk testing endpoint.

---

## Link Deploy (Vercel)

API ini sudah di-deploy dan dapat diakses secara publik melalui:

```
Production URL: https://api-cuci-sepatu-liard.vercel.app/
Repository: https://github.com/cloudiesca/api-cuci-sepatu
```

Anda dapat langsung melakukan testing ke URL production tanpa perlu menjalankan server lokal.

---

### Testing API Production

Untuk melakukan testing, dapat menggunakan beberapa cara:
1. Testing dengan Browser (untuk GET endpoint):

Buka browser dan akses: https://api-cuci-sepatu-liard.vercel.app/
Untuk filter: https://api-cuci-sepatu-liard.vercel.app/items?status=Selesai

2. Testing dengan Postman (Recommended):

Download dan install Postman
Buat request dengan endpoint seperti pada browser di atas

---


