const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'API Layanan Cuci Sepatu',
        version: '1.0.0',
        endpoints: {
            'GET /items': 'Ambil semua data sepatu (support filter ?status=)',
            'GET /items/:id': 'Ambil data sepatu berdasarkan ID',
            'POST /items': 'Tambah data sepatu baru',
            'PUT /items/:id': 'Update data sepatu',
            'DELETE /items/:id': 'Hapus data sepatu'
        }
    });
});

// CREATE - Tambah sepatu baru
app.post('/items', async (req, res) => {
    try {
        const { nama_pelanggan, jenis_sepatu, warna, layanan, status, harga, tanggal_masuk, estimasi_selesai } = req.body;

        // Validasi input
        if (!nama_pelanggan || !jenis_sepatu || !layanan || !harga) {
            return res.status(400).json({
                error: 'Data tidak lengkap',
                required: ['nama_pelanggan', 'jenis_sepatu', 'layanan', 'harga']
            });
        }

        const { data, error } = await supabase
            .from('sepatu')
            .insert([{
                nama_pelanggan,
                jenis_sepatu,
                warna: warna || null,
                layanan,
                status: status || 'Dalam Proses',
                harga,
                tanggal_masuk: tanggal_masuk || new Date().toISOString(),
                estimasi_selesai: estimasi_selesai || null
            }])
            .select();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: 'Data sepatu berhasil ditambahkan',
            data: data[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// READ - Ambil semua data (dengan filter optional)
app.get('/items', async (req, res) => {
    try {
        const { status } = req.query;

        let query = supabase.from('sepatu').select('*').order('created_at', { ascending: false });

        // Filter berdasarkan status jika ada
        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// READ - Ambil data berdasarkan ID
app.get('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('sepatu')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({
                success: false,
                error: 'Data tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// UPDATE - Update data sepatu
app.put('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_pelanggan, jenis_sepatu, warna, layanan, status, harga, estimasi_selesai } = req.body;

        const updateData = {};
        if (nama_pelanggan) updateData.nama_pelanggan = nama_pelanggan;
        if (jenis_sepatu) updateData.jenis_sepatu = jenis_sepatu;
        if (warna) updateData.warna = warna;
        if (layanan) updateData.layanan = layanan;
        if (status) updateData.status = status;
        if (harga) updateData.harga = harga;
        if (estimasi_selesai) updateData.estimasi_selesai = estimasi_selesai;

        const { data, error } = await supabase
            .from('sepatu')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Data tidak ditemukan'
            });
        }

        res.json({
            success: true,
            message: 'Data berhasil diupdate',
            data: data[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// DELETE - Hapus data sepatu
app.delete('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('sepatu')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Data tidak ditemukan'
            });
        }

        res.json({
            success: true,
            message: 'Data berhasil dihapus',
            data: data[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint tidak ditemukan'
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

module.exports = app;