# PANDUAN LENGKAP PENYUSUNAN MOCKUP FIGMA (BABAK PENYISIHAN FITCOM 4.0)

Dokumen ini disusun sebagai panduan praktis bagi tim dalam menyusun file desain di **Figma** sesuai kriteria penilaian Babak Penyisihan FITCOM 4.0:
- **Bobot UX (40%):** Alur navigasi dan kemudahan interaksi bagi warga awam desa.
- **Bobot UI (35%):** Komposisi warna, tata letak, kejelasan tipografi, dan responsivitas.
- **Bobot Solusi (25%):** Relevansi modul SuratCepat & LaporDesa.

---

## 1. STRUKTUR FRAME FIGMA YANG HARUS DIBUAT (6 FRAME UTAMA)

Buat satu file baru di Figma dengan nama:  
**`FITCOM 4.0 - Desa Joesayur - [Nama Tim Anda]`**

Susun kanvas ke dalam 6 Frame utama (Mobile & Desktop):

### 📱 1. Frame: Landing Page (Public Portal Warga)
- **Ukuran Frame:** Desktop (1440 x 1024 px) dan Mobile iPhone 14 / Android (393 x 852 px).
- **Elemen yang Ditampilkan:**
  - **Top Navigation Bar:** Logo Desa Joesayur (Hijau), Link Menu (*Beranda, Layanan, Statistik, Panduan, Kontak*), Tombol *"Lacak Surat"* dan *"Masuk Admin"*.
  - **Hero Section:** Judul megah *"DESA JOESAYUR"*, slogan ramah warga, foto pemandangan desa, Tombol CTA Utama: **"Ajukan Surat Sekarang" (Hijau)** & **"Lapor Gangguan Desa" (Biru)**.
  - **Layanan Section (2 Modul CRUD):**
    - Kartu **SuratCepat** (Icon Surat, Tag: Domisili, SKTM, Pengantar KTP, SKU, Tombol Aksi).
    - Kartu **LaporDesa** (Icon Peringatan, Tag: Jalan Berlubang, Lampu PJU, Irigasi, Tombol Aksi).
  - **Statistik Desa Interaktif:** Angka demografi 3.718 Jiwa, 1.042 KK, 4 Dusun.
  - **Panduan 4 Langkah Pengurusan Surat:** Alur visual yang mudah dipahami lansia.
  - **Footer:** Alamat Balai Desa, Jam Loket Pelayanan, dan Kontak WhatsApp.

### 📄 2. Frame: Modal Form Ajukan Surat (SuratCepat)
- **Ukuran Frame:** 680 x 780 px (Modal Dialog Overlay).
- **Elemen yang Ditampilkan:**
  - Step Indicator (Langkah 1: Pilih Surat → Langkah 2: Data Pemohon → Langkah 3: Unggah Berkas).
  - Pilihan radio card jenis surat (Domisili, SKTM, KTP, SKU).
  - Input field: Nama Lengkap, NIK 16 digit, No. WhatsApp, Dusun & RT/RW, Keperluan.
  - **Upload Area Berkas Persyaratan:** Area unggah foto KTP dengan drag-and-drop dan pratinjau thumbnail gambar.
  - Layar Konfirmasi Sukses dengan **Kode Tracking** (`SRT-2026-089`) dan tombol hubungi WhatsApp Balai Desa.

### 🚨 3. Frame: Modal Form LaporDesa (Pengaduan Infrastruktur)
- **Ukuran Frame:** 680 x 820 px (Modal Dialog Overlay).
- **Elemen yang Ditampilkan:**
  - Pilihan Kategori Gangguan (*Jalan Rusak, Lampu Jalan Padam, Saluran Mampet, Kamtibmas*).
  - Form Input: Judul Laporan, Dusun & RT/RW, Patokan Lokasi, Pilihan Urgensi (*Tinggi / Sedang / Rendah*).
  - **Fitur Unggah Foto Bukti:** Area foto kamera HP dengan pratinjau bukti lapangan.
  - Opsi *"Lapor Secara Anonim"* (checkbox perlindungan identitas pelapor).
  - Kartu Tiket Pengaduan Sukses (`LAP-2026-081`).

### 🔍 4. Frame: Modal Lacak Status (Tracking Warga)
- **Ukuran Frame:** 600 x 600 px.
- **Elemen yang Ditampilkan:**
  - Input pencarian: Nomor Kode Tracking atau NIK.
  - Status Badge (*Menunggu / Diproses / Selesai*).
  - Timeline vertikal tahapan pengerjaan oleh petugas desa.

### 📊 5. Frame: Dashboard Admin — Manajemen Surat Masuk
- **Ukuran Frame:** Desktop (1440 x 900 px).
- **Elemen yang Ditampilkan:**
  - Sidebar Navigasi: Logo Desa Joesayur, Menu Ringkasan, Surat Masuk (Aktif), Laporan Warga, Data Warga, Statistik, Pengaturan.
  - Bar Pencarian & Filter Status (*Semua, Menunggu, Diproses, Selesai, Ditolak*).
  - Tabel Daftar Permohonan Surat (ID Surat, Nama Pemohon, NIK, Jenis Surat, Tanggal, Status Badge, Tombol Aksi: Lihat / Setujui / Tolak).
  - Modal Pratinjau Cetak Surat Resmi (Kop Kabupaten Ngawi, Nomor Registrasi, Stempel QR Code TTE).

### 🛠️ 6. Frame: Dashboard Admin — Manajemen Laporan Warga
- **Ukuran Frame:** Desktop (1440 x 900 px).
- **Elemen yang Ditampilkan:**
  - Counter Statistik: Total Laporan, Perlu Tindakan, Sedang Ditangani, Selesai.
  - Filter Kategori & Urgensi.
  - Tabel Laporan Pengaduan Warga lengkap dengan detail lokasi dusun.
  - Popup Tanggapan Petugas (Ubah status penanganan dan tulis catatan solusi perbaikan).

---

## 2. DESIGN TOKENS & ATRIBUT WARNA (COPY-PASTE KE FIGMA)

Gunakan Color Styles berikut di Figma agar penilaian Estetika Visual (35%) maksimal:

| Nama Token | Hex Code | Penggunaan |
| :--- | :--- | :--- |
| **Primary Green** | `#16A34A` | Tombol Utama, Ikon Sukses, Nuansa Alam Desa |
| **Light Green** | `#DCFCE7` | Background badge status / highlight |
| **Civic Blue** | `#2563EB` | Warna Institusi Balai Desa, Tombol Sekunder |
| **Dark Blue** | `#1E3A8A` | Latar Sidebar Admin & Header Utama |
| **Soft Sky BG** | `#F0F9FF` | Latar Belakang Website Publik |
| **Card Surface** | `#FFFFFF` | Latar Belakang Kartu & Modal Dialog |
| **Text Primary** | `#0F172A` | Teks Utama (Hitam Slate Kontras Tinggi WCAG) |
| **Text Secondary**| `#475569` | Teks Penjelas / Label |
| **Warning Amber** | `#D97706` | Status Menunggu / Urgent |
| **Danger Rose** | `#E11D48` | Status Ditolak / Bahaya Kerusakan |

---

## 3. PANDUAN TIPOGRAFI FIGMA

- **Heading & Display Font:** `Outfit` (Bold / SemiBold / Black) — Memberikan kesan ramah, modern, dan percaya diri.
- **Body & Form Text:** `Inter` (Regular / Medium / SemiBold) — Keterbacaan optimal di berbagai resolusi layar.

---

## 4. CARA MENGAMBIL TAUTAN (LINK) FIGMA UNTUK PENGUMPULAN

Sesuai ketentuan panitia FITCOM 4.0 di halaman 5:
1. Di Figma, klik tombol **"Share"** di pojok kanan atas.
2. Pada bagian *Anyone with the link*, ubah hak akses menjadi: **"can view"**.
3. Klik tombol **"Copy link"**.
4. Simpan link tersebut bersama file `PROPOSAL_FITCOM_4.0_DESA_JOESAYUR.pdf` untuk dikirimkan melalui link form pengumpulan panitia FITCOM 4.0 sebelum tenggat waktu 25 September 2026.
