# PROPOSAL KARYA WEB PROGRAMMING FITCOM 4.0
**TEMA: INTELLIGENT LIVING SYSTEMS**  
**SUBTEMA: INTELLIGENT HOME & COMMUNITY**

---

# DESA JOESAYUR: SISTEM INFORMASI PELAYANAN DAN TANGGAP INFRASTRUKTUR DESA TERPADU
### *(Solusi Integrasi Dua Modul Utama: SuratCepat dan LaporDesa)*

**Disusun Oleh:**  
Tim Web Programming Desa Joesayur  
Ajang Kompetisi FITCOM 4.0 — Universitas Dinamika Surabaya  
September 2026

---

## 1. LATAR BELAKANG DAN ANALISIS MASALAH PEDESAAN

Perkembangan teknologi informasi saat ini menjadi pilar utama transformasi daerah pedesaan menuju *Smart Village* (Desa Cerdas). Namun, di banyak wilayah pedesaan seperti Desa Joesayur, Kecamatan Kedunggalar, Kabupaten Ngawi, pelayanan publik masih menghadapi kendala klasik:

1. **Birokrasi Persuratan yang Manual dan Menyita Waktu:**
   Warga yang bekerja sebagai petani atau buruh harian seringkali harus mengorbankan waktu kerja mereka untuk datang dan mengantre di Balai Desa hanya untuk mengurus surat pengantar domisili atau SKTM (Surat Keterangan Tidak Mampu). Jarak antar-dusun (seperti Dusun Krajan ke Dusun Makmur) yang cukup jauh memperberat mobilitas warga, terutama lansia.
2. **Keterlambatan Penanganan Kerusakan Fasilitas & Infrastruktur:**
   Gangguan fasilitas publik seperti jalan desa yang berlubang, talud jembatan amblas, penerangan jalan umum (PJU) padam, atau saluran irigasi sawah tersumbat sering kali lambat dilaporkan karena tidak tersedianya kanal pengaduan resmi yang cepat, transparan, dan dilengkapi dokumentasi foto bukti.
3. **Keterbatasan Literasi Digital Masyarakat Awam:**
   Banyak aplikasi pemerintah yang terlalu rumit, penuh istilah teknis (*jargon* birokrasi), dan memiliki tata letak yang padat sehingga menyulitkan masyarakat pedesaan awam.

Untuk menjawab permasalahan tersebut secara nyata dan aplikatif, tim mengembangkan **"Desa Joesayur"** dengan fokus pada dua modul interaktif utama sesuai panduan teknis FITCOM 4.0: **SuratCepat** (Pengurusan persuratan online warga) dan **LaporDesa** (Pelaporan gangguan infrastruktur dengan fitur unggah foto bukti).

---

## 2. SOLUSI DAN 2 MODUL CRUD UTAMA

Sesuai kriteria FITCOM 4.0 yang berfokus pada skala implementasi yang realistis, fungsional, dan memiliki operasi CRUD penuh:

### A. Modul 1: SuratCepat (Pengajuan & Penerbitan Surat Digital)
- **Create (Warga):** Warga dapat mengajukan 6 jenis surat administrasi (Surat Domisili, SKTM, Pengantar KTP-el, Surat Keterangan Usaha/SKU, Kematian, dan Pengantar Nikah) secara daring melalui form *step-by-step* yang intuitif, dilengkapi pengunggahan berkas KTP/Pengantar RT.
- **Read (Warga & Admin):** Warga mendapatkan **Kode Pelacakan Unik** (contoh: `SRT-2026-001`) untuk melacak status verifikasi secara *real-time*. Admin desa dapat memantau seluruh antrean surat di dasbor.
- **Update (Admin):** Petugas loket dapat memvalidasi data pemohon, mengubah status (*Menunggu → Diproses → Selesai/Ditolak*), serta membubuhkan pengesahan.
- **Delete / Archive:** Pengarsipan permohonan surat yang telah selesai atau pembatalan pengajuan yang tidak sesuai kriteria.
- **Fitur Ekstra:** Pratinjau cetak blangko resmi berkop Pemerintah Kabupaten Ngawi lengkap dengan stempel QR code digital (TTE).

### B. Modul 2: LaporDesa (Tanggap Cepat Gangguan Infrastruktur Desa)
- **Create (Warga):** Warga dapat melaporkan masalah jalan rusak, lampu PJU padam, irigasi tersumbat, atau kamtibmas lengkap dengan **fitur unggah foto bukti kamera HP**, titik lokasi patokan, dan opsi pelaporan rahasia/anonim.
- **Read (Warga & Admin):** Warga dapat melacak tindak lanjut perbaikan melalui nomor tiket pengaduan (`LAP-2026-081`). Perangkat desa (Kasi Kesra/Trantib) dapat melihat rincian lokasi kejadian di dasbor.
- **Update (Admin):** Perangkat desa dapat memperbarui status pengerjaan lapangan (*Menunggu Disposisi → Dalam Pengerjaan → Selesai Diperbaiki*) serta menuliskan catatan solusi tindak lanjut bagi warga.
- **Delete / Reject:** Fitur menolak pengaduan palsu/spam dengan alasan penolakan yang transparan.

---

## 3. FILOSOFI DESAIN DAN PENDEKATAN UI/UX

Mengacu pada bobot penilaian Babak Penyisihan (40% Kemudahan UX & 35% Estetika Visual UI):

### A. Palet Warna Civic yang Menenangkan & Berwibawa
- **Emerald Green (`#16A34A` / `#22C55E`):** Melambangkan identitas pedesaan yang subur dan agraris, sekaligus menjadi warna tombol aksi utama (*Call-to-Action*) yang ramah dan menenangkan.
- **Civic Blue (`#2563EB` / `#1E3A8A`):** Merepresentasikan keandalan institusi pemerintahan balai desa, rasa aman, dan transparansi pelayanan publik.
- **Crisp White & Slate Neutral (`#FFFFFF`, `#F8FAFC`, `#0F172A`):** Memberikan latar belakang yang bersih tanpa distraksi, memastikan rasio kontras teks memenuhi standar aksesibilitas WCAG AAA sehingga nyaman dibaca oleh warga usia lanjut.

### B. Prinsip UX "Zero Technical Barrier" (Ramah Warga Awam)
1. **Wizard Form Bertahap (Progressive Disclosure):** Form pengajuan surat dan laporan dipecah menjadi 3 langkah sederhana (*Pilih Kategori → Isi Data Diri → Unggah Foto & Konfirmasi*), menghindari formulir panjang yang membuat warga merasa terbebani.
2. **Bahasa Keseharian yang Jelas:** Menghindari istilah teknis rumit; menggunakan label seperti *"Jalan Berlubang"*, *"Lampu Padam"*, *"Cek Status Surat"*, dan *"Unggah Foto dari Kamera HP"*.
3. **Feedback Interaktif & Multikanal:** Setelah submit, warga langsung memperoleh kartu bukti dengan tombol satu-klik **"Konfirmasi ke WhatsApp Balai Desa"** yang otomatis mengisi template pesan WhatsApp ke nomor resmi balai desa.
4. **Desain Responsif Mobile-First:** Mayoritas warga desa mengakses layanan melalui smartphone; oleh karena itu, seluruh komponen (tombol berukuran sentuh minimal 44x44px, bottom sheet, floating action button) dioptimalkan untuk layar ponsel.

---

## 4. ARSITEKTUR TEKNIS DAN PERSIAPAN BABAK FINAL (LIVE CODING)

Aplikasi dirancang modular dan siap diimplementasikan secara penuh pada babak final:
- **Frontend:** Menggunakan **React 19** dengan bundler Vite dan utility-first CSS **Tailwind CSS**. Mengutamakan clean architecture berbasis komponen reusable (`ModalAjukanSurat`, `ModalLaporDesa`, `ModalCekStatus`, `DashboardSurat`, `DashboardLaporan`).
- **Backend / RESTful API (Kesiapan Final):** Struktur endpoint standar yang kompatibel dengan Apache/XAMPP (PHP Native / Laravel / Node.js) dengan format JSON:
  - `POST /api/surat` & `GET /api/surat` (Status Code: 201 Created, 200 OK)
  - `PUT /api/surat/{id}/status` (Status Code: 200 OK, 400 Bad Request)
  - `POST /api/laporan` (Multipart Form Data untuk upload foto, Status Code: 201)
  - `GET /api/laporan/{id}` & `PUT /api/laporan/{id}/tanggapan` (Status Code: 200 OK)
- **Data Persistence:** Mendukung penyimpanan lokal *hybrid* (localStorage / IndexedDB) pada tahap prototype dan transisi instan ke basis data MySQL/MariaDB pada babak final.

---

## 5. KESIMPULAN

Website Portal dan Dasbor **Desa Joesayur** bukan sekadar mockup visual, melainkan sebuah purwarupa solusi digital yang aplikatif dan berpijak pada kebutuhan nyata masyarakat pedesaan. Dengan memadukan kemudahan antarmuka bagi warga dan efisiensi manajemen dasbor bagi pamong desa, aplikasi ini mewujudkan semangat *Intelligent Living Systems* dalam membangun desa yang mandiri, cerdas, dan transparan.
