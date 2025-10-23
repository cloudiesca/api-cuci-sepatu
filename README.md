API Layanan Cuci Sepatu
Merupakan REST API untuk mengelola data layanan cuci sepatu dengan fitur CRUD lengkap dan filter status.

🔗 Links

Repository: https://github.com/cloudiesca/api-cuci-sepatu
Live API: https://api-cuci-sepatu-liard.vercel.app/


📖 Tentang Proyek
API ini dibuat untuk memudahkan pengelolaan data sepatu yang masuk ke layanan cuci sepatu. Dibangun dengan Node.js, Express.js, dan Supabase sebagai database.
Fitur Utama

✅ Create - Tambah data sepatu baru
✅ Read - Lihat semua data atau berdasarkan ID
✅ Update - Ubah data sepatu (status, harga, dll)
✅ Delete - Hapus data sepatu
✅ Filter - Cari berdasarkan status (Dalam Proses, Selesai, Diambil)


🗂️ Struktur Data
Tabel: sepatu

{
  id: "uuid",                          // Auto-generated
  nama_pelanggan: "string",            // Required
  jenis_sepatu: "string",              // Required (Sneakers, Boots, dll)
  warna: "string",                     // Optional
  layanan: "string",                   // Required (Fast/Deep/Premium Cleaning)
  status: "string",                    // Default: "Dalam Proses"
  harga: number,                       // Required (dalam Rupiah)
  tanggal_masuk: "timestamp",          // Auto
  estimasi_selesai: "timestamp",       // Optional
  created_at: "timestamp"              // Auto
}

Status yang tersedia: Dalam Proses | Selesai | Diambil

🚀 API Endpoints
Base URL
Production: https://api-cuci-sepatu-liard.vercel.app/
Local: http://localhost:3000

Endpoint List
GET / - Info API
GET /items - Semua data sepatu
GET /items?status=Selesai - Filter by status
GET /items/:id - Data spesifik
POST /items - Tambah data baru
PUT /items/:id - Update data
DELETE /items/:id - Hapus data

📝 Contoh Request & Response
1. GET All Items
httpGET /items
Response:

{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "nama_pelanggan": "Ahmad Rizki",
      "jenis_sepatu": "Sneakers",
      "warna": "Putih",
      "layanan": "Deep Cleaning",
      "status": "Dalam Proses",
      "harga": 50000,
      "tanggal_masuk": "2025-01-15T10:00:00Z",
      "estimasi_selesai": "2025-01-17T10:00:00Z"
    }
  ]
}

2. GET with Filter
   
httpGET /items?status=Selesai

3. CREATE New Item
   
POST /items
Content-Type: application/json

{
  "nama_pelanggan": "Siti Aminah",
  "jenis_sepatu": "Boots",
  "warna": "Hitam",
  "layanan": "Fast Cleaning",
  "harga": 35000
}
Response:
{
  "success": true,
  "message": "Data sepatu berhasil ditambahkan",
  "data": {
    "id": "new-uuid-here",
    "nama_pelanggan": "Siti Aminah",
    "status": "Dalam Proses",
    ...
  }
}

4. UPDATE Item
PUT /items/:id
Content-Type: application/json

{
  "status": "Selesai"
}

5. DELETE Item
DELETE /items/:id
Response:
{
  "success": true,
  "message": "Data berhasil dihapus"
}

🛠️ Instalasi & Menjalankan Lokal
Setup

1. Clone repository

git clone https://github.com/cloudiesca/api-cuci-sepatu.git
cd api-cuci-sepatu

2. Install dependencies

npm install

3. Setup environment variables

cp .env.example .env

Edit .env:

SUPABASE_URL=https://sohxhhdzzklarzyrpnnc.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaHhoaGR6emtsYXJ6eXJwbm5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwOTMwMTAsImV4cCI6MjA3NjY2OTAxMH0.atpchJABSklBxEalndStqk-HVfw3r27qw6LncrpXC4s
PORT=3000

4. Setup database di Supabase

Jalankan SQL ini di Supabase SQL Editor:

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

5. Run server

npm run dev

Server berjalan di http://localhost:3000

🌐 Deploy ke Vercel

1. Push code ke GitHub
2. Import project di Vercel
3. Tambahkan environment variables:
SUPABASE_URL
SUPABASE_KEY
4. Deploy

🧪 Testing
Manual Test
# Get all items
curl https://api-cuci-sepatu.vercel.app/items

# Filter by status
curl https://api-cuci-sepatu.vercel.app/items?status=Selesai

# Create item
 POST https://api-cuci-sepatu.vercel.app/items \
"Content-Type: application/json" \

'{
    "nama_pelanggan": "Test User",
    "jenis_sepatu": "Sneakers",
    "layanan": "Fast Cleaning",
    "harga": 35000
  }'
