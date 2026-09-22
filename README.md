# 🌾 DesaAI — Portal Layanan & Dashboard Desa Joesayur

Aplikasi web portal resmi dan sistem manajemen administrasi desa terintegrasi untuk **Desa Joesayur, Kabupaten Ngawi**. Dirancang khusus dengan tema civic **Hijau, Putih, dan Biru**, kontras tinggi, dan ramah pengguna untuk memudahkan warga desa serta perangkat balai desa.

---

## 🎨 Color Palette & Design System

Tabel palet warna resmi yang digunakan di aplikasi web DesaAI dan Figma:

### 1. Primary Colors (Green & Blue)
| Kategori | Nama Token | HEX Code | Preview | Penggunaan Utama |
| :--- | :--- | :--- | :---: | :--- |
| **Primary Green** | `green-600` | `#16A34A` | 🟩 | Tombol aksi utama, SuratCepat, status aktif |
| | `green-500` | `#22C55E` | 🟢 | Hover state, aksen cerah |
| | `green-700` | `#15803D` | 🌲 | Teks penekanan hijau, footer |
| | `green-800` | `#166534` | 🌲 | Elemen gelap hijau |
| | `green-200` | `#BBF7D0` | 🪟 | Border card SuratCepat |
| | `green-100` | `#DCFCE7` | 🟩 | Background kotak icon SuratCepat |
| | `green-50` | `#F0FDF4` | ⚪ | Background badge / tag surat |
| **Primary Blue** | `blue-600` | `#2563EB` | 🟦 | Tombol LaporDesa, link aktif |
| | `blue-700` | `#1D4ED8` | 🔵 | Hover tombol biru |
| | `blue-900` | `#1E3A8A` | 🔷 | Navy header & navigasi |
| | `blue-200` | `#BFDBFE` | 🪟 | Border card LaporDesa |
| | `blue-100` | `#DBEAFE` | 🟦 | Background kotak icon LaporDesa |
| | `blue-50` | `#EFF6FF` | ⚪ | Background badge / info banner |

### 2. Neutral, Surface & Background
| Kategori | Nama Token | HEX Code | Opacity Figma | Penggunaan Utama |
| :--- | :--- | :--- | :---: | :--- |
| **Surface / Card** | `surface` | `#FFFFFF` | 100% / 75%-85% (Glass) | Kartu dashboard, modal, card layanan |
| **Page BG** | `bg` | `#F0F9FF` | 100% | Latar belakang halaman web |
| **Soft BG** | `bg-soft` | `#F8FAFC` | 100% | Alternating row table & container |
| **Border Soft** | `border` | `#E2E8F0` | 100% / 40%-60% | Garis batas card & separator |
| **Text Primary** | `text-primary` | `#0F172A` | 100% | Heading judul utama (Slate Navy) |
| **Text Secondary**| `text-secondary`| `#475569` | 100% | Deskripsi teks & paragraf |
| **Text Muted** | `text-muted` | `#94A3B8` | 100% | Caption, timestamp, placeholder |
| **Text Inverse** | `text-inverse` | `#FFFFFF` | 100% | Teks putih di atas tombol berwarna |

### 3. Status & Accents
| Kategori | Nama Token | HEX Code | Penggunaan Utama |
| :--- | :--- | :--- | :--- |
| **Warning / Gold** | `amber-500` | `#F59E0B` | Status pending, highlight garis atas card |
| | `amber-600` | `#D97706` | Dark amber teks status |
| | `amber-50` | `#FFFBEB` | Background badge pending |
| **Danger / Alert** | `rose-500` | `#F43F5E` | Status ditolak / urgent priority |
| | `rose-50` | `#FFF1F2` | Background alert penolakan |

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
