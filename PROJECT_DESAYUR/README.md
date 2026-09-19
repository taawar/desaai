# 🌾 Portal Layanan & Dashboard Desa Joesayur

Aplikasi web portal resmi dan sistem manajemen administrasi desa terintegrasi untuk **Desa Joesayur, Kabupaten Ngawi**. Dirancang khusus dengan tema civic **Hijau, Putih, dan Biru**, kontras tinggi, dan ramah pengguna untuk memudahkan warga desa serta perangkat balai desa.

---

## 🌟 Fitur Utama

### 1. Website Publik (Warga Desa)
- **Beranda (Hero Section):** Sambutan hangat, pencarian cepat layanan administrasi, dan tautan langsung ke WhatsApp balai desa.
- **Layanan Administrasi:** Pengurusan Surat Domisili, SKTM, Pengantar KTP-el, Surat Usaha (SKU), dan Keterangan Kematian.
- **Statistik Desa Interaktif:** Data agregat kependudukan (3.718 Jiwa, 1.042 KK, 4 Dusun).
- **Panduan Pengurusan:** Alur langkah permohonan surat yang jelas dan mudah dipahami oleh lansia maupun generasi muda.
- **Transparansi APBDes & Kontak Resmi:** Lokasi kantor, nomor telepon, dan jam pelayanan loket balai desa.

### 2. Admin Dashboard (Perangkat Desa)
- **Ringkasan (Overview):** KPI cards real-time, aktivitas surat masuk, pengaduan terbaru, serta metrik kecepatan pelayanan.
- **Manajemen Surat (`/dashboard/surat`):** Pencarian & filter status, verifikasi data pemohon, persetujuan/penolakan surat, dan pratinjau cetak blangko resmi desa dengan QR code TTE.
- **Laporan & Pengaduan Warga (`/dashboard/laporan`):** Manajemen aspirasi dan keluhan warga per dusun, update status penanganan, pencatatan tanggapan petugas, dan filter prioritas/kategori.
- **Data Warga SID (`/dashboard/warga`):** Sistem informasi kependudukan, filter dusun & status kepesertaan bansos (PKH, BLT, BPNT), form tambah warga baru, serta rincian biodata.
- **Statistik & Analitik Desa (`/dashboard/statistik`):** Visualisasi tren surat bulanan, piramida kelompok usia, mata pencaharian warga, dan status Desa Mandiri (IDM).
- **Pengaturan Sistem (`/dashboard/settings`):** Konfigurasi identitas balai desa, jam pelayanan kerja, dan preferensi notifikasi.

---

## 🛠️ Teknologi & Stack

- **Framework:** React 19 (SPA dengan Vite 8)
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v3 (Custom Civic Palette: Forest Green, Civic Blue, Crisp White)
- **Icons:** Lucide React
- **Typography:** Outfit (Display & Headings) + Inter (Body Text)

---

## 🚀 Cara Menjalankan

### 1. Instal Dependensi
```bash
npm install
```

### 2. Jalankan Mode Pengembangan (Dev Server)
```bash
npm run dev
```
Akses di browser: `http://localhost:5173/`

### 3. Build untuk Produksi
```bash
npm run build
```
Hasil build siap didistribusikan di folder `dist/`.

---

© 2026 Pemerintah Desa Joesayur • Kabupaten Ngawi, Jawa Timur.
