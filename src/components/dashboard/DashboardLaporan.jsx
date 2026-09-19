import { useState } from 'react';
import {
  AlertTriangle, Search, Filter, CheckCircle, Clock, XCircle,
  Eye, MessageSquare, MapPin, Calendar, Phone, ArrowUpRight,
  ChevronDown, Check, X, ShieldAlert, Sparkles, Download
} from 'lucide-react';

const initialLaporanData = [
  {
    id: 'LAP-2026-081',
    pelapor: 'Siti Aminah',
    nik: '3521015609820002',
    telepon: '0812-3456-7890',
    dusun: 'Dusun Krajan (RT 03 / RW 01)',
    kategori: 'Infrastruktur',
    prioritas: 'Tinggi',
    judul: 'Jalan Penghubung Dusun Rusak Parah dan Berlubang',
    deskripsi: 'Jalan utama antar RT 02 dan RT 03 rusak berlubang dalam akibat hujan deras semalam. Sudah ada warga yang tergelincir motor.',
    tanggal: '18 Sep 2026',
    status: 'proses',
    tanggapan: 'Tim sarana prasarana desa telah meninjau lokasi jam 09.00 WIB. Material urukan sirtu dikirim sore ini.',
    petugas: 'Pak Bambang (Kasi Kesra)',
  },
  {
    id: 'LAP-2026-080',
    pelapor: 'Joko Susanto',
    nik: '3521011204750001',
    telepon: '0857-9876-1234',
    dusun: 'Dusun Mulyo (RT 01 / RW 02)',
    kategori: 'Fasilitas Umum',
    prioritas: 'Sedang',
    judul: 'Lampu Penerangan Jalan Umum (PJU) Padam 4 Titik',
    deskripsi: 'Sepanjang jalan makam hingga pos kamling gelap gulita karena lampu PJU mati sejak 3 hari lalu.',
    tanggal: '18 Sep 2026',
    status: 'menunggu',
    tanggapan: '',
    petugas: '-',
  },
  {
    id: 'LAP-2026-079',
    pelapor: 'Endang Wahyuni',
    nik: '3521016801910003',
    telepon: '0821-4567-8901',
    dusun: 'Dusun Rejo (RT 04 / RW 02)',
    kategori: 'Sanitasi & Lingkungan',
    prioritas: 'Sedang',
    judul: 'Saluran Irigasi Tersumbat Sampah Plastik & Ranting',
    deskripsi: 'Gorong-gorong air depan lapangan tersumbat menyebabkan air meluap ke badan jalan saat hujan lebat.',
    tanggal: '17 Sep 2026',
    status: 'selesai',
    tanggapan: 'Kerja bakti bersama warga RT 04 telah dilaksanakan hari Minggu pagi. Saluran air lancar kembali.',
    petugas: 'Supriyadi (Ketua RW 02)',
  },
  {
    id: 'LAP-2026-078',
    pelapor: 'Hendra Gunawan',
    nik: '3521012306880004',
    telepon: '0813-2345-6789',
    dusun: 'Dusun Krajan (RT 02 / RW 01)',
    kategori: 'Keamanan',
    prioritas: 'Tinggi',
    judul: 'Permintaan Penertiban Knalpot Brong di Sekitar Masjid',
    deskripsi: 'Sering ada pemuda luar desa yang nongkrong dan geber motor knalpot bising menjelang tengah malam di pertigaan dekat masjid.',
    tanggal: '16 Sep 2026',
    status: 'proses',
    tanggapan: 'Sudah dikoordinasikan dengan Babinsa dan Linmas desa untuk menambah jadwal ronda malam.',
    petugas: 'Sersan Mayor Wagino (Babinsa)',
  },
  {
    id: 'LAP-2026-077',
    pelapor: 'Suparno',
    nik: '3521011508670005',
    telepon: '0852-1122-3344',
    dusun: 'Dusun Makmur (RT 02 / RW 03)',
    kategori: 'Bantuan Sosial',
    prioritas: 'Rendah',
    judul: 'Konfirmasi Jadwal Penyaluran Bantuan Beras CPP',
    deskripsi: 'Mohon info tanggal pasti pencairan dan pengambilan bantuan beras Bulog untuk warga lanjut usia di balai desa.',
    tanggal: '15 Sep 2026',
    status: 'selesai',
    tanggapan: 'Jadwal penyaluran telah diumumkan: Kamis, 20 September 2026 pukul 08.30 di Aula Balai Desa.',
    petugas: 'Dewi Lestari (Kaur Umum)',
  },
  {
    id: 'LAP-2026-076',
    pelapor: 'Rahmat Hidayat',
    nik: '3521011902990006',
    telepon: '0877-3344-5566',
    dusun: 'Dusun Mulyo (RT 03 / RW 02)',
    kategori: 'Lingkungan',
    prioritas: 'Rendah',
    judul: 'Pembakaran Sampah Liar di Lahan Kosong Belakang SD',
    deskripsi: 'Asap tebal dari pembakaran sampah dedaunan kering mengganggu aktivitas belajar mengajar di SD Joesayur.',
    tanggal: '14 Sep 2026',
    status: 'selesai',
    tanggapan: 'Pemilik lahan telah diberi surat teguran lisan dan imbauan oleh Trantib desa.',
    petugas: 'Bambang Sudibyo (Kasi Trantib)',
  },
  {
    id: 'LAP-2026-075',
    pelapor: 'Mulyadi',
    nik: '3521010303730007',
    telepon: '0819-8765-4321',
    dusun: 'Dusun Rejo (RT 01 / RW 02)',
    kategori: 'Infrastruktur',
    prioritas: 'Tinggi',
    judul: 'Talud Penahan Tanah Longsor Dekat Jembatan Gantung',
    deskripsi: 'Pondasi talud sisi timur jembatan terkikis air sungai deras, dikhawatirkan longsor jika tidak segera bronjong.',
    tanggal: '13 Sep 2026',
    status: 'proses',
    tanggapan: 'Pengajuan darurat telah diteruskan ke Dinas PUPR Kabupaten Ngawi untuk bantuan kawat bronjong.',
    petugas: 'Kepala Desa Joesayur',
  },
  {
    id: 'LAP-2026-074',
    pelapor: 'Anonim Warga',
    nik: '3521010000000000',
    telepon: '-',
    dusun: 'Dusun Krajan',
    kategori: 'Lainnya',
    prioritas: 'Rendah',
    judul: 'Laporan Spam Tidak Jelas',
    deskripsi: 'Tes kirim pengaduan sistem web baru desa.',
    tanggal: '12 Sep 2026',
    status: 'ditolak',
    tanggapan: 'Laporan merupakan pesan uji coba, tidak memenuhi syarat pengaduan resmi.',
    petugas: 'Admin Web Desa',
  },
];

const statusMeta = {
  menunggu: { label: 'Menunggu', bg: '#FFFBEB', color: '#D97706', border: '#FDE68A', icon: Clock },
  proses:   { label: 'Diproses', bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE', icon: ArrowUpRight },
  selesai:  { label: 'Selesai',  bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0', icon: CheckCircle },
  ditolak:  { label: 'Ditolak',  bg: '#FFF1F2', color: '#E11D48', border: '#FECDD3', icon: XCircle },
};

const prioritasBadge = {
  Tinggi: { bg: '#FFF1F2', color: '#E11D48', border: '#FECDD3', label: 'Tinggi' },
  Sedang: { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A', label: 'Sedang' },
  Rendah: { bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0', label: 'Rendah' },
};

export default function DashboardLaporan() {
  const [laporanList, setLaporanList] = useState(initialLaporanData);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterKategori, setFilterKategori] = useState('semua');
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Counters
  const countTotal = laporanList.length;
  const countMenunggu = laporanList.filter(item => item.status === 'menunggu').length;
  const countProses = laporanList.filter(item => item.status === 'proses').length;
  const countSelesai = laporanList.filter(item => item.status === 'selesai').length;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filter logic
  const filtered = laporanList.filter((item) => {
    const matchSearch =
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      item.pelapor.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.dusun.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === 'semua' || item.status === filterStatus;
    const matchKategori = filterKategori === 'semua' || item.kategori === filterKategori;

    return matchSearch && matchStatus && matchKategori;
  });

  // Action update status
  const handleUpdateStatus = (id, newStatus, tanggapanText = '') => {
    setLaporanList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            tanggapan: tanggapanText || item.tanggapan || 'Status diperbarui oleh petugas.',
            petugas: item.petugas === '-' ? 'Petugas Admin' : item.petugas
          };
        }
        return item;
      })
    );

    if (selectedLaporan && selectedLaporan.id === id) {
      setSelectedLaporan(prev => ({
        ...prev,
        status: newStatus,
        tanggapan: tanggapanText || prev.tanggapan || 'Status diperbarui oleh petugas.',
        petugas: prev.petugas === '-' ? 'Petugas Admin' : prev.petugas
      }));
    }

    const statusText = statusMeta[newStatus]?.label || newStatus;
    showToast(`Status laporan ${id} berhasil diubah menjadi "${statusText}"`);
  };

  const handleOpenDetail = (laporan) => {
    setSelectedLaporan(laporan);
    setFeedbackNote(laporan.tanggapan || '');
  };

  const handleSaveModalTanggapan = () => {
    if (!selectedLaporan) return;
    handleUpdateStatus(selectedLaporan.id, selectedLaporan.status, feedbackNote);
    showToast(`Tanggapan untuk laporan ${selectedLaporan.id} telah disimpan.`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-green-700 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up border border-green-500">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
              Civic Response
            </span>
            <span className="text-xs text-text-muted">• Tanggap Keluhan Warga Desa</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Laporan & Pengaduan Warga
          </h2>
          <p className="text-text-secondary text-sm">
            Pantau dan tindak lanjuti aspirasi warga desa secara cepat, terbuka, dan transparan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," +
                ["ID,Pelapor,Dusun,Kategori,Prioritas,Judul,Status,Tanggal"]
                  .concat(laporanList.map(e => `"${e.id}","${e.pelapor}","${e.dusun}","${e.kategori}","${e.prioritas}","${e.judul}","${e.status}","${e.tanggal}"`))
                  .join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `Laporan_Warga_Joesayur_${new Date().toISOString().slice(0,10)}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              showToast("Data laporan warga berhasil diexport ke CSV!");
            }}
            className="inline-flex items-center gap-2 bg-white border border-border text-text-primary px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-surface-soft transition-colors cursor-pointer shadow-sm"
          >
            <Download size={16} className="text-text-secondary" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Quick KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-border card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Laporan</p>
            <p className="text-2xl font-bold font-display text-text-primary mt-1">{countTotal}</p>
            <span className="text-xs text-blue-600 font-medium mt-1 inline-block">Seluruh pengaduan</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MessageSquare size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200 card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Perlu Tindakan</p>
            <p className="text-2xl font-bold font-display text-amber-600 mt-1">{countMenunggu}</p>
            <span className="text-xs text-amber-700 font-medium mt-1 inline-block">Belum diproses</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-blue-200 card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Sedang Ditangani</p>
            <p className="text-2xl font-bold font-display text-blue-600 mt-1">{countProses}</p>
            <span className="text-xs text-blue-700 font-medium mt-1 inline-block">Dalam pengerjaan tim</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ArrowUpRight size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-green-200 card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">Selesai Dituntaskan</p>
            <p className="text-2xl font-bold font-display text-green-600 mt-1">{countSelesai}</p>
            <span className="text-xs text-green-700 font-medium mt-1 inline-block">Sudah ada solusi</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle size={22} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-border card-shadow p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Cari keluhan warga, nama pelapor, dusun, atau nomor ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Kategori Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-medium whitespace-nowrap">Kategori:</span>
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="semua">Semua Kategori</option>
              <option value="Infrastruktur">Infrastruktur</option>
              <option value="Fasilitas Umum">Fasilitas Umum</option>
              <option value="Sanitasi & Lingkungan">Sanitasi & Lingkungan</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Bantuan Sosial">Bantuan Sosial</option>
              <option value="Lingkungan">Lingkungan</option>
            </select>
          </div>
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
          <span className="text-xs text-text-muted font-medium mr-1">Status:</span>
          {['semua', 'menunggu', 'proses', 'selesai', 'ditolak'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                filterStatus === s
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-1'
                  : 'bg-surface-muted text-text-secondary hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {s === 'semua' ? 'Semua Laporan' : statusMeta[s]?.label ?? s}
            </button>
          ))}
        </div>
      </div>

      {/* Laporan Table / List */}
      <div className="bg-white rounded-2xl border border-border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-surface-muted text-text-secondary text-xs border-b border-border">
                <th className="px-5 py-3.5 font-semibold">ID & Tanggal</th>
                <th className="px-4 py-3.5 font-semibold">Pelapor & Dusun</th>
                <th className="px-4 py-3.5 font-semibold">Rincian Laporan</th>
                <th className="px-4 py-3.5 font-semibold hidden md:table-cell">Kategori</th>
                <th className="px-4 py-3.5 font-semibold hidden sm:table-cell">Prioritas</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-text-muted">
                    <AlertTriangle size={36} className="mx-auto mb-2 text-amber-500/50" />
                    <p className="font-semibold text-text-secondary">Tidak ada laporan yang sesuai</p>
                    <p className="text-xs text-text-muted mt-1">Coba sesuaikan kata kunci pencarian atau filter status.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const sMeta = statusMeta[item.status] || statusMeta.menunggu;
                  const StatusIcon = sMeta.icon;
                  const pBadge = prioritasBadge[item.prioritas] || prioritasBadge.Sedang;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => handleOpenDetail(item)}
                    >
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md block w-fit mb-1">
                          {item.id}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Calendar size={12} /> {item.tanggal}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-semibold text-text-primary text-sm">{item.pelapor}</p>
                        <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                          <MapPin size={11} className="text-text-muted shrink-0" />
                          <span className="truncate max-w-[180px]">{item.dusun}</span>
                        </p>
                      </td>

                      <td className="px-4 py-4 max-w-xs md:max-w-md">
                        <p className="font-medium text-text-primary text-sm line-clamp-1 group-hover:text-blue-700 transition-colors">
                          {item.judul}
                        </p>
                        <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                          {item.deskripsi}
                        </p>
                      </td>

                      <td className="px-4 py-4 hidden md:table-cell whitespace-nowrap">
                        <span className="inline-block text-xs bg-surface-muted text-text-secondary font-medium px-2.5 py-1 rounded-lg">
                          {item.kategori}
                        </span>
                      </td>

                      <td className="px-4 py-4 hidden sm:table-cell whitespace-nowrap">
                        <span
                          className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: pBadge.bg,
                            color: pBadge.color,
                            borderColor: pBadge.border,
                          }}
                        >
                          {pBadge.label}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border"
                          style={{
                            backgroundColor: sMeta.bg,
                            color: sMeta.color,
                            borderColor: sMeta.border,
                          }}
                        >
                          <StatusIcon size={11} />
                          {sMeta.label}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(item)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Buka Rincian"
                          >
                            <Eye size={16} />
                          </button>

                          {item.status === 'menunggu' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'proses')}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-sm"
                            >
                              Tindak Lanjuti
                            </button>
                          )}

                          {item.status === 'proses' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'selesai')}
                              className="px-2.5 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors shadow-sm"
                            >
                              Selesaikan
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination & Count summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-border bg-surface-soft text-xs text-text-muted gap-2">
          <span>Menampilkan {filtered.length} dari total {laporanList.length} pengaduan warga</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg bg-white border border-border text-text-secondary hover:bg-surface-muted transition-colors cursor-pointer">
              Sebelumnya
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-medium flex items-center justify-center">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-border text-text-secondary hover:bg-surface-muted transition-colors cursor-pointer">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Modal Detail & Tanggapan Laporan */}
      {selectedLaporan && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {selectedLaporan.id}
                </span>
                <span className="text-xs text-text-muted">• {selectedLaporan.tanggal}</span>
              </div>
              <button
                onClick={() => setSelectedLaporan(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-muted flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Title & Status */}
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: statusMeta[selectedLaporan.status]?.bg,
                      color: statusMeta[selectedLaporan.status]?.color,
                      borderColor: statusMeta[selectedLaporan.status]?.border,
                    }}
                  >
                    {statusMeta[selectedLaporan.status]?.label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-surface-muted text-text-secondary font-medium">
                    {selectedLaporan.kategori}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded font-medium border"
                    style={{
                      backgroundColor: prioritasBadge[selectedLaporan.prioritas]?.bg,
                      color: prioritasBadge[selectedLaporan.prioritas]?.color,
                      borderColor: prioritasBadge[selectedLaporan.prioritas]?.border,
                    }}
                  >
                    Prioritas {selectedLaporan.prioritas}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary">
                  {selectedLaporan.judul}
                </h3>
              </div>

              {/* Pelapor Card */}
              <div className="bg-surface-soft p-4 rounded-xl border border-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-text-muted block">Nama Pelapor:</span>
                  <span className="font-semibold text-text-primary text-sm">{selectedLaporan.pelapor}</span>
                </div>
                <div>
                  <span className="text-text-muted block">NIK Pelapor:</span>
                  <span className="font-mono text-text-primary">{selectedLaporan.nik}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Lokasi / Dusun:</span>
                  <span className="text-text-primary font-medium flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-blue-600" /> {selectedLaporan.dusun}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block">Kontak / No. WhatsApp:</span>
                  <span className="text-text-primary font-medium flex items-center gap-1 mt-0.5">
                    <Phone size={12} className="text-green-600" /> {selectedLaporan.telepon}
                  </span>
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Keterangan Lengkap Keluhan:
                </h4>
                <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100 text-sm text-text-primary leading-relaxed">
                  {selectedLaporan.deskripsi}
                </div>
              </div>

              {/* Status Update Quick Buttons */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Ubah Status Laporan:
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedLaporan.id, 'proses')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedLaporan.status === 'proses'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white hover:bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    <ArrowUpRight size={14} /> Proses Penanganan
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedLaporan.id, 'selesai')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedLaporan.status === 'selesai'
                        ? 'bg-green-600 text-white border-green-600 shadow-xs'
                        : 'bg-white hover:bg-green-50 text-green-700 border-green-200'
                    }`}
                  >
                    <CheckCircle size={14} /> Selesai Ditangani
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedLaporan.id, 'ditolak')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedLaporan.status === 'ditolak'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    <XCircle size={14} /> Tolak Laporan
                  </button>
                </div>
              </div>

              {/* Input Tanggapan Petugas */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                  Tanggapan / Catatan Tindak Lanjut untuk Warga:
                </label>
                <textarea
                  rows={3}
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="Tuliskan catatan tindak lanjut dari perangkat desa atau solusi yang telah diberikan..."
                  className="w-full p-3 rounded-xl border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {selectedLaporan.petugas && selectedLaporan.petugas !== '-' && (
                  <p className="text-xs text-text-muted">
                    Penanggung Jawab: <span className="font-semibold text-text-secondary">{selectedLaporan.petugas}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-border px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedLaporan(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-muted transition-colors cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={handleSaveModalTanggapan}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors cursor-pointer shadow-sm"
              >
                Simpan Tanggapan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
