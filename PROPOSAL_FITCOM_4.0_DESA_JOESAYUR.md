# PROPOSAL SINGKAT PROYEK WEB PROGRAMMING FITCOM 4.0
**Subtema:** Intelligent Home & Community  
**Judul Proyek:** Desa Joesayur — Sistem Pengurusan Surat dan Pengaduan Fasilitas Desa Terpadu  
**Tim Pengembang:** Tim Desa Joesayur  

---

## BAB 1: LATAR BELAKANG DAN RUMUSAN MASALAH

### 1.1 Latar Belakang
Pelayanan administrasi kependudukan di tingkat desa umumnya masih bertumpu pada kehadiran fisik warga di kantor balai desa. Pada wilayah pedesaan dengan rentang geografis yang luas seperti Desa Joesayur (Kecamatan Kedunggalar, Kabupaten Ngawi) yang terbagi menjadi empat dusun (Dusun Krajan, Dusun Mulyo, Dusun Rejo, dan Dusun Makmur), model pelayanan konvensional ini menimbulkan sejumlah kendala praktis.

Mayoritas warga desa bekerja di sektor pertanian dan perburuhan dengan jam kerja aktif pada pagi hingga siang hari, bersamaan dengan jam operasional loket balai desa. Akibatnya, warga kerap harus meluangkan waktu kerja hanya untuk mengurus surat keterangan sederhana atau menyampaikan keluhan fasilitas umum. Di sisi lain, perangkat desa menghadapi kendala pencatatan manual yang rentan tercecer serta membutuhkan waktu verifikasi berkas fisik yang berulang.

Menjawab tantangan tersebut, platform web **Desa Joesayur** dikembangkan sebagai sistem layanan cerdas yang menjembatani kebutuhan warga dan efisiensi kerja pamong desa melalui integrasi dua layanan esensial: pengurusan surat daring dan pelaporan gangguan fasilitas desa.

### 1.2 Rumusan Masalah
1. **Inefisiensi Pengurusan Dokumen:** Warga harus datang langsung dan mengantre di loket untuk kebutuhan surat pengantar domisili, SKTM, atau keterangan usaha.
2. **Ketiadaan Kanal Pengaduan Fasilitas yang Terstruktur:** Kerusakan infrastruktur vital seperti jalan berlubang, lampu penerangan jalan umum (PJU) padam, dan saluran irigasi tersumbat lambat ditangani karena pelaporan warga tidak disertai dokumentasi visual yang akurat.
3. **Kesenjangan Literasi Digital:** Banyak aplikasi layanan publik memiliki alur formulir yang panjang dan istilah birokrasi yang membingungkan bagi masyarakat desa awam.

### 1.3 Tujuan
Membangun aplikasi web yang ringkas, fungsional, dan mudah dioperasikan oleh warga desa tanpa keahlian teknis khusus, sekaligus menyediakan dasbor pengelolaan data yang rapi dan terukur bagi aparatur pemerintah desa.

---

## BAB 2: SOLUSI DAN SPESIFIKASI DUA MODUL CRUD UTAMA

Aplikasi berfokus pada dua modul operasional utama yang mengimplementasikan siklus data lengkap (Create, Read, Update, Delete/Status Lifecycle):

### 2.1 Modul 1: SuratCepat (Pengajuan Surat Administrasi Mandiri)
Modul ini mengotomatiskan proses pengajuan surat pengantar warga dari rumah:
- **Pengajuan (Create):** Warga memilih jenis permohonan (Surat Domisili, SKTM, Pengantar KTP-el, Surat Keterangan Usaha, Surat Kematian, atau Pengantar Nikah), mengisi formulir satu halaman yang memuat Nama Lengkap, NIK 16 digit, Nomor WhatsApp, dan Dusun domisili, serta melampirkan foto KTP/KK.
- **Penerimaan & Kode Unik (Read - Warga):** Sistem menerbitkan kode pelacakan instan (format: `SRT-XXXX`) yang dapat disalin dan langsung terhubung dengan tautan konfirmasi WhatsApp Balai Desa.
- **Verifikasi & Persetujuan (Read & Update - Admin):** Melalui dasbor *Manajemen Surat*, petugas dapat memfilter berkas berdasarkan status (*Menunggu, Diproses, Selesai, Ditolak*), memeriksa kesesuaian NIK, membuka pratinjau surat resmi berkop pemerintah kabupaten lengkap dengan QR code tanda tangan elektronik, serta menyetujui permohonan dengan satu klik.

### 2.2 Modul 2: LaporDesa (Pengaduan Kerusakan Infrastruktur Desa)
Modul ini berfungsi sebagai pusat penampungan aspirasi dan keluhan sarana fisik desa:
- **Pelaporan (Create):** Warga memilih kategori kerusakan (Jalan Rusak, Lampu PJU Mati, Saluran Irigasi Mampet, Sampah Liar, atau Kamtibmas), mengisi judul masalah, dusun, dan patokan lokasi yang jelas, serta mengunggah foto bukti kejadian langsung dari kamera ponsel.
- **Perlindungan Privasi Pelapor:** Tersedia opsi pelaporan anonim agar warga merasa aman menyampaikan laporan tanpa kekhawatiran sosial.
- **Tindak Lanjut & Disposisi (Update - Admin):** Petugas desa menerima laporan melalui dasbor *Laporan Warga*, memperbarui status pengerjaan lapangan, dan menuliskan catatan respons tindak lanjut yang dapat dipantau oleh pelapor.

### 2.3 Fitur Integrasi: Pelacakan Status Terpadu
Warga dapat memantau perkembangan surat maupun pengaduan secara mandiri kapan saja melalui modal *Lacak Pengajuan* cukup dengan memasukkan NIK atau kode tiket yang telah diterima.

---

## BAB 3: FILOSOFI DESAIN DAN PENDEKATAN UI/UX

Desain antarmuka aplikasi dirancang berlandaskan karakteristik pengguna di pedesaan dengan memprioritaskan keterbacaan, kejelasan fungsi, dan eliminasi hambatan teknis.

### 3.1 Pendekatan User Experience (UX): Zero-Friction
1. **Formulir Tunggal Kompak (Single-Page Form):** Menghindari proses bertahap (multi-step wizard) yang melelahkan. Seluruh kolom isian dirancang ringkas dalam satu tampilan modal yang proporsional sehingga waktu pengisian di bawah dua menit.
2. **Bahasa Lugas dan Bersahabat:** Menghilangkan jargon teknis birokrasi dan menggantinya dengan label komunikatif, seperti *"Patokan Lokasi"*, *"Foto Bukti Kejadian"*, dan *"Lacak Pengajuan"*.
3. **Umpan Balik Instan (Clear Feedback):** Setiap aksi berhasil selalu menampilkan konfirmasi yang jelas berupa kode tiket, ringkasan permohonan, serta tombol pintas ke WhatsApp resmi desa untuk memastikan warga merasa laporannya benar-benar diterima.

### 3.2 Estetika Visual (UI) dan Komposisi Warna
Tema visual dibangun dengan palet warna civic yang harmonis dan bermakna:
- **Hijau Daun / Emerald (`#16A34A`):** Warna primer pada tombol aksi utama dan identitas desa. Memberikan nuansa agraris, kesegaran lingkungan desa, serta asosiasi psikologis positif (kemudahan dan keberhasilan).
- **Biru Civic / Layanan (`#2563EB` & `#1E3A8A`):** Digunakan pada modul pengaduan, navigasi, dan dasbor institusi balai desa guna merepresentasikan rasa aman, ketertiban, dan profesionalitas aparat desa.
- **Putih Bersih dan Slate Netral (`#FFFFFF` & `#0F172A`):** Latar belakang permukaan yang bersih dengan warna teks bertingkat kontras tinggi (memenuhi standar aksesibilitas WCAG AAA) agar teks tetap terbaca tegas di layar ponsel pada kondisi pencahayaan luar ruangan.

### 3.3 Tipografi dan Tata Letak Responsif
- **Hierarki Tipografi:** Menggunakan font modern **Outfit** untuk penjudulan agar terkesan ramah dan formal, dipadukan dengan **Inter** pada teks isi dan formulir demi memastikan keterbacaan angka NIK dan rincian alamat.
- **Mobile-First Accessibility:** Seluruh tombol dan area sentuh (*touch target*) memiliki dimensi minimal 44 × 44 piksel dengan jarak yang proporsional untuk mencegah kesalahan ketuk bagi warga lanjut usia.
