import { useState } from 'react';
import {
  Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, FileText,
  Printer, X, User, MapPin, Calendar, Check, AlertCircle, FileCheck
} from 'lucide-react';

const initialSuratData = [
  {
    id: 'SRT-2026-001',
    nama: 'Ahmad Fauzi',
    nik: '3521012345678901',
    noKK: '3521012301050012',
    jenis: 'Surat Domisili',
    tanggal: '18 Sep 2026',
    status: 'selesai',
    keperluan: 'Persyaratan pembukaan rekening bank syariah',
    alamat: 'Dusun Krajan RT 02 / RW 01',
    noHp: '0812-3456-7890',
  },
  {
    id: 'SRT-2026-002',
    nama: 'Siti Rahayu',
    nik: '3521012345678902',
    noKK: '3521012301050023',
    jenis: 'Surat Keterangan Tidak Mampu (SKTM)',
    tanggal: '18 Sep 2026',
    status: 'proses',
    keperluan: 'Pengajuan beasiswa KIP Kuliah untuk anak pertama',
    alamat: 'Dusun Mulyo RT 01 / RW 02',
    noHp: '0857-1234-5678',
  },
  {
    id: 'SRT-2026-003',
    nama: 'Budi Santoso',
    nik: '3521012345678903',
    noKK: '3521012301050034',
    jenis: 'Pengantar KTP-el Baru',
    tanggal: '17 Sep 2026',
    status: 'selesai',
    keperluan: 'Perekaman KTP-el usia 17 tahun ke Kecamatan',
    alamat: 'Dusun Rejo RT 03 / RW 02',
    noHp: '0821-9876-5432',
  },
  {
    id: 'SRT-2026-004',
    nama: 'Dewi Kusuma',
    nik: '3521012345678904',
    noKK: '3521012301050045',
    jenis: 'Surat Keterangan Usaha (SKU)',
    tanggal: '17 Sep 2026',
    status: 'menunggu',
    keperluan: 'Pengajuan kredit usaha rakyat (KUR) peternakan kambing',
    alamat: 'Dusun Makmur RT 04 / RW 03',
    noHp: '0813-5566-7788',
  },
  {
    id: 'SRT-2026-005',
    nama: 'Rudi Hartono',
    nik: '3521012345678905',
    noKK: '3521012301050056',
    jenis: 'Surat Keterangan Tidak Mampu (SKTM)',
    tanggal: '16 Sep 2026',
    status: 'ditolak',
    keperluan: 'Bantuan sosial, namun data ekonomi keluarga tidak sesuai kriteria',
    alamat: 'Dusun Krajan RT 01 / RW 01',
    noHp: '0877-2233-4455',
  },
  {
    id: 'SRT-2026-006',
    nama: 'Nurul Hidayah',
    nik: '3521012345678906',
    noKK: '3521012301050067',
    jenis: 'Pengantar Nikah (N1-N4)',
    tanggal: '15 Sep 2026',
    status: 'selesai',
    keperluan: 'Pendaftaran berkas akad nikah ke KUA Kedunggalar',
    alamat: 'Dusun Mulyo RT 02 / RW 02',
    noHp: '0852-3344-5566',
  },
  {
    id: 'SRT-2026-007',
    nama: 'Agus Priyono',
    nik: '3521012345678907',
    noKK: '3521012301050078',
    jenis: 'Surat Domisili',
    tanggal: '15 Sep 2026',
    status: 'proses',
    keperluan: 'Pindah domisili sementara kerja proyek konstruksi',
    alamat: 'Dusun Rejo RT 01 / RW 02',
    noHp: '0819-4455-6677',
  },
  {
    id: 'SRT-2026-008',
    nama: 'Lestari Wulandari',
    nik: '3521012345678908',
    noKK: '3521012301050089',
    jenis: 'Surat Keterangan Kematian',
    tanggal: '14 Sep 2026',
    status: 'menunggu',
    keperluan: 'Klaim asuransi dan pengurusan akta kematian almarhum kakek',
    alamat: 'Dusun Krajan RT 03 / RW 01',
    noHp: '0812-9988-1122',
  },
];

const statusConfig = {
  selesai:  { label: 'Selesai',  bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0', icon: CheckCircle },
  proses:   { label: 'Diproses', bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE', icon: Clock },
  menunggu: { label: 'Menunggu', bg: '#FFFBEB', color: '#D97706', border: '#FDE68A', icon: Clock },
  ditolak:  { label: 'Ditolak',  bg: '#FFF1F2', color: '#E11D48', border: '#FECDD3', icon: XCircle },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] ?? statusConfig.menunggu;
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border"
      style={{ backgroundColor: cfg.bg, color: cfg.color, borderColor: cfg.border }}
    >
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

export default function DashboardSurat() {
  const [suratList, setSuratList] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('desa_surat_list') || '[]');
      if (saved.length > 0) {
        const merged = [...saved];
        initialSuratData.forEach(item => {
          if (!merged.some(m => m.id === item.id)) merged.push(item);
        });
        return merged;
      }
    } catch (e) {
      console.error(e);
    }
    return initialSuratData;
  });
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const updateSuratStatus = (id, newStatus) => {
    setSuratList(prev => {
      const updated = prev.map(s => (s.id === id ? { ...s, status: newStatus } : s));
      try {
        localStorage.setItem('desa_surat_list', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });

    if (selectedSurat && selectedSurat.id === id) {
      setSelectedSurat(prev => ({ ...prev, status: newStatus }));
    }

    const label = statusConfig[newStatus]?.label || newStatus;
    showToast(`Status permohonan surat ${id} diubah menjadi "${label}".`);
  };

  const filtered = suratList.filter((s) => {
    const matchSearch =
      s.nama.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.jenis.toLowerCase().includes(search.toLowerCase()) ||
      s.nik.includes(search);
    const matchStatus = filterStatus === 'semua' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

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
            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
              Pelayanan Terpadu
            </span>
            <span className="text-xs text-text-muted">• Verifikasi & Tanda Tangan Digital</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Manajemen Surat Masuk Desa
          </h2>
          <p className="text-text-secondary text-sm">
            Periksa dokumen pemohon, verifikasi kesesuaian data warga, dan setujui permohonan surat administrasi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," +
                ["ID,Nama,NIK,Jenis_Surat,Tanggal,Status,Keperluan"]
                  .concat(suratList.map(e => `"${e.id}","${e.nama}","${e.nik}","${e.jenis}","${e.tanggal}","${e.status}","${e.keperluan}"`))
                  .join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `Surat_Masuk_Joesayur_${new Date().toISOString().slice(0,10)}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              showToast("Data permohonan surat berhasil diexport ke CSV!");
            }}
            className="inline-flex items-center gap-2 bg-white border border-border text-text-primary px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-surface-soft transition-colors cursor-pointer shadow-sm"
          >
            <Download size={16} className="text-text-secondary" />
            Export Data
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-border card-shadow p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama warga, NIK, jenis surat, atau ID permohonan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['semua', 'menunggu', 'proses', 'selesai', 'ditolak'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer capitalize ${
                filterStatus === s
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-surface-muted text-text-secondary hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {s === 'semua' ? 'Semua Status' : statusConfig[s]?.label ?? s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-surface-muted text-text-secondary text-xs border-b border-border">
                <th className="px-5 py-3.5 font-semibold">ID Surat</th>
                <th className="px-4 py-3.5 font-semibold">Nama Pemohon</th>
                <th className="px-4 py-3.5 font-semibold hidden md:table-cell">NIK</th>
                <th className="px-4 py-3.5 font-semibold">Jenis Surat</th>
                <th className="px-4 py-3.5 font-semibold hidden lg:table-cell">Tanggal Masuk</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">Aksi Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-text-muted">
                    <FileText size={32} className="mx-auto mb-2 opacity-30" />
                    Tidak ada surat ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedSurat(s)}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-1 rounded-lg">
                        {s.id}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-text-primary group-hover:text-blue-700 transition-colors">
                      {s.nama}
                    </td>
                    <td className="px-4 py-4 text-text-muted text-xs hidden md:table-cell font-mono">
                      {s.nik}
                    </td>
                    <td className="px-4 py-4 text-text-secondary font-medium">
                      {s.jenis}
                    </td>
                    <td className="px-4 py-4 text-text-muted hidden lg:table-cell text-xs">
                      {s.tanggal}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedSurat(s)}
                          className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center text-blue-600 transition-colors cursor-pointer"
                          title="Lihat Detail & Cetak"
                        >
                          <Eye size={15} />
                        </button>
                        {s.status === 'menunggu' && (
                          <>
                            <button
                              onClick={() => updateSuratStatus(s.id, 'selesai')}
                              className="w-8 h-8 rounded-lg hover:bg-green-50 flex items-center justify-center text-green-600 transition-colors cursor-pointer"
                              title="Setujui Langsung"
                            >
                              <CheckCircle size={15} />
                            </button>
                            <button
                              onClick={() => updateSuratStatus(s.id, 'ditolak')}
                              className="w-8 h-8 rounded-lg hover:bg-rose-50 flex items-center justify-center text-rose-600 transition-colors cursor-pointer"
                              title="Tolak Permohonan"
                            >
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                        {s.status === 'proses' && (
                          <button
                            onClick={() => updateSuratStatus(s.id, 'selesai')}
                            className="px-2.5 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
                          >
                            Tandatangani
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-surface-soft text-xs text-text-muted">
          <span>Menampilkan {filtered.length} dari {suratList.length} surat</span>
          <div className="flex gap-1">
            {[1, 2].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  p === 1 ? 'bg-blue-600 text-white' : 'hover:bg-surface-muted text-text-secondary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Detail Surat & Pratinjau Dokumen */}
      {selectedSurat && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {selectedSurat.id}
                </span>
                <span className="text-xs text-text-muted">• {selectedSurat.tanggal}</span>
              </div>
              <button
                onClick={() => setSelectedSurat(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-muted flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Surat Overview */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">
                    Permohonan Dokumen
                  </span>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {selectedSurat.jenis}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    Keperluan: <strong>{selectedSurat.keperluan}</strong>
                  </p>
                </div>
                <StatusBadge status={selectedSurat.status} />
              </div>

              {/* Pemohon Info */}
              <div className="bg-surface-soft p-4 rounded-xl border border-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-text-muted block">Nama Pemohon:</span>
                  <span className="font-semibold text-text-primary text-sm">{selectedSurat.nama}</span>
                </div>
                <div>
                  <span className="text-text-muted block">NIK Pemohon:</span>
                  <span className="font-mono text-text-primary font-semibold">{selectedSurat.nik}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Alamat / RT RW:</span>
                  <span className="text-text-primary font-medium">{selectedSurat.alamat}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Nomor WhatsApp:</span>
                  <span className="text-text-primary font-medium">{selectedSurat.noHp}</span>
                </div>
              </div>

              {/* Checklist Verifikasi Berkas */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Checklist Verifikasi Kelengkapan:
                </h4>
                <div className="space-y-2 bg-blue-50/40 p-3.5 rounded-xl border border-blue-100 text-xs">
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <Check size={14} className="text-green-600" />
                    <span>NIK dan Nomor KK terdaftar valid di database kependudukan desa.</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <Check size={14} className="text-green-600" />
                    <span>Foto KTP-el dan Pengantar RT telah diunggah dan terverifikasi.</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 font-medium">
                    <Check size={14} className="text-blue-600" />
                    <span>Format blangko resmi Desa Joesayur siap diterbitkan (QR Code TTE).</span>
                  </div>
                </div>
              </div>

              {/* Pratinjau Kop Surat Resmi */}
              <div className="border border-dashed border-slate-300 rounded-xl p-5 bg-white text-center text-xs space-y-2 shadow-xs">
                <div className="border-b-2 border-slate-900 pb-2">
                  <p className="font-serif font-bold text-sm tracking-wide uppercase">PEMERINTAH KABUPATEN NGAWI</p>
                  <p className="font-serif font-bold text-xs uppercase">KECAMATAN KEDUNGGALAR • DESA JOESAYUR</p>
                  <p className="text-[10px] text-text-muted">Jl. Raya Joesayur No. 01, Kode Pos 63254</p>
                </div>
                <div className="py-2">
                  <p className="font-bold underline text-xs uppercase">{selectedSurat.jenis}</p>
                  <p className="text-[10px] text-text-muted font-mono">Nomor: 470 / {selectedSurat.id} / 2026</p>
                </div>
                <p className="text-left text-text-secondary text-[11px] leading-relaxed">
                  Kepala Desa Joesayur menerangkan bahwa saudara <strong>{selectedSurat.nama}</strong> (NIK: {selectedSurat.nik}) benar-benar warga sah kami yang beralamat di {selectedSurat.alamat}, dan surat ini diterbitkan untuk keperluan {selectedSurat.keperluan}.
                </p>
              </div>

              {/* Status Action Buttons */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Aksi Persetujuan Petugas:
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateSuratStatus(selectedSurat.id, 'proses')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedSurat.status === 'proses'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white hover:bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    <Clock size={14} /> Proses Surat
                  </button>

                  <button
                    onClick={() => updateSuratStatus(selectedSurat.id, 'selesai')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedSurat.status === 'selesai'
                        ? 'bg-green-600 text-white border-green-600 shadow-xs'
                        : 'bg-white hover:bg-green-50 text-green-700 border-green-200'
                    }`}
                  >
                    <CheckCircle size={14} /> Setujui & TTD
                  </button>

                  <button
                    onClick={() => updateSuratStatus(selectedSurat.id, 'ditolak')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedSurat.status === 'ditolak'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    <XCircle size={14} /> Tolak Berkas
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-border px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-surface-muted hover:bg-blue-50 text-text-primary transition-colors cursor-pointer"
              >
                <Printer size={16} />
                Cetak Surat
              </button>

              <button
                onClick={() => setSelectedSurat(null)}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
