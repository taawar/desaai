import { FileText, AlertTriangle, Users, Clock, TrendingUp, CheckCircle, XCircle, MoreHorizontal, Eye, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const kpiCards = [
  {
    id: 'kpi-surat',
    label: 'Total Surat Masuk',
    value: '128',
    change: '+12 minggu ini',
    changeUp: true,
    icon: FileText,
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
    border: '#BBF7D0',
  },
  {
    id: 'kpi-laporan',
    label: 'Laporan Warga',
    value: '34',
    change: '+5 hari ini',
    changeUp: true,
    icon: AlertTriangle,
    iconBg: '#DBEAFE',
    iconColor: '#2563EB',
    border: '#BFDBFE',
  },
  {
    id: 'kpi-warga',
    label: 'Total Warga',
    value: '3.718',
    change: 'Jiwa terdaftar',
    changeUp: null,
    icon: Users,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    border: '#FDE68A',
  },
  {
    id: 'kpi-proses',
    label: 'Menunggu Proses',
    value: '17',
    change: '3 mendesak',
    changeUp: false,
    icon: Clock,
    iconBg: '#FFF1F2',
    iconColor: '#E11D48',
    border: '#FECDD3',
  },
];

const recentSurat = [
  { id: 'S-001', nama: 'Ahmad Fauzi',       jenis: 'Surat Domisili',  tanggal: '18 Sep 2026', status: 'selesai' },
  { id: 'S-002', nama: 'Siti Rahayu',       jenis: 'SKTM',            tanggal: '18 Sep 2026', status: 'proses' },
  { id: 'S-003', nama: 'Budi Santoso',      jenis: 'Pengantar KTP',   tanggal: '17 Sep 2026', status: 'selesai' },
  { id: 'S-004', nama: 'Dewi Kusuma',       jenis: 'Surat Domisili',  tanggal: '17 Sep 2026', status: 'menunggu' },
  { id: 'S-005', nama: 'Rudi Hartono',      jenis: 'SKTM',            tanggal: '16 Sep 2026', status: 'ditolak' },
];

const recentLaporan = [
  { id: 'L-001', judul: 'Jalan Rusak RT 03',   kategori: 'Infrastruktur', prioritas: 'Tinggi',  status: 'proses' },
  { id: 'L-002', judul: 'Lampu Jalan Padam',   kategori: 'Fasilitas',     prioritas: 'Sedang',  status: 'menunggu' },
  { id: 'L-003', judul: 'Saluran Air Mampet',  kategori: 'Sanitasi',      prioritas: 'Sedang',  status: 'selesai' },
  { id: 'L-004', judul: 'Pohon Tumbang',        kategori: 'Lingkungan',    prioritas: 'Tinggi',  status: 'selesai' },
];

const statusConfig = {
  selesai:  { label: 'Selesai',  bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
  proses:   { label: 'Diproses', bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
  menunggu: { label: 'Menunggu', bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  ditolak:  { label: 'Ditolak',  bg: '#FFF1F2', color: '#E11D48', border: '#FECDD3' },
};

const prioritasConfig = {
  Tinggi: { bg: '#FFF1F2', color: '#E11D48' },
  Sedang: { bg: '#FFFBEB', color: '#D97706' },
  Rendah: { bg: '#F0FDF4', color: '#16A34A' },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] ?? statusConfig.menunggu;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border"
      style={{ backgroundColor: cfg.bg, color: cfg.color, borderColor: cfg.border }}
    >
      {status === 'selesai' ? <CheckCircle size={10} /> : status === 'ditolak' ? <XCircle size={10} /> : <Clock size={10} />}
      {cfg.label}
    </span>
  );
}

export default function DashboardHome() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold mb-1">Selamat datang, Petugas Admin! 👋</h2>
          <p className="text-blue-100 text-sm">Ada <span className="font-semibold text-white">17 pengajuan</span> yang perlu ditindaklanjuti hari ini.</p>
        </div>
        <Link
          to="/dashboard/surat"
          className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors shrink-0"
        >
          Lihat Semua
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map(({ id, label, value, change, changeUp, icon: Icon, iconBg, iconColor, border }) => (
          <div
            key={id}
            id={id}
            className="bg-white rounded-2xl p-5 border-2 card-shadow card-hover"
            style={{ borderColor: border }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBg }}>
                <Icon size={22} style={{ color: iconColor }} />
              </div>
              {changeUp !== null && (
                <span className={`text-xs font-medium flex items-center gap-0.5 ${changeUp ? 'text-green-600' : 'text-rose-500'}`}>
                  <TrendingUp size={12} className={changeUp ? '' : 'rotate-180'} />
                </span>
              )}
            </div>
            <p className="font-display text-2xl font-extrabold text-text-primary">{value}</p>
            <p className="text-text-secondary text-xs mt-1 font-medium">{label}</p>
            <p className={`text-xs mt-0.5 ${changeUp === true ? 'text-green-600' : changeUp === false ? 'text-rose-500' : 'text-text-muted'}`}>{change}</p>
          </div>
        ))}
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Surat Terbaru */}
        <div className="bg-white rounded-2xl border border-border card-shadow overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-display font-bold text-text-primary">Surat Masuk Terbaru</h3>
            <Link to="/dashboard/surat" className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
              Lihat semua <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-muted text-text-secondary text-xs">
                  <th className="text-left px-6 py-3 font-semibold">Nama</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Jenis</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentSurat.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-soft transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-text-primary text-sm">{s.nama}</p>
                      <p className="text-text-muted text-xs">{s.id} · {s.tanggal}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className="text-text-secondary text-xs">{s.jenis}</span>
                    </td>
                    <td className="px-4 py-3.5"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-3.5">
                      <button className="w-7 h-7 rounded-lg hover:bg-surface-muted flex items-center justify-center text-text-muted hover:text-text-secondary transition-colors cursor-pointer">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Laporan Terbaru */}
        <div className="bg-white rounded-2xl border border-border card-shadow overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-display font-bold text-text-primary">Laporan Warga Terbaru</h3>
            <Link to="/dashboard/laporan" className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
              Lihat semua <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-muted text-text-secondary text-xs">
                  <th className="text-left px-6 py-3 font-semibold">Laporan</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Prioritas</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentLaporan.map((l) => {
                  const p = prioritasConfig[l.prioritas] ?? prioritasConfig.Rendah;
                  return (
                    <tr key={l.id} className="hover:bg-surface-soft transition-colors">
                      <td className="px-6 py-3.5">
                        <p className="font-medium text-text-primary text-sm">{l.judul}</p>
                        <p className="text-text-muted text-xs">{l.id} · {l.kategori}</p>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: p.bg, color: p.color }}>
                          {l.prioritas}
                        </span>
                      </td>
                      <td className="px-4 py-3.5"><StatusBadge status={l.status} /></td>
                      <td className="px-4 py-3.5">
                        <button className="w-7 h-7 rounded-lg hover:bg-surface-muted flex items-center justify-center text-text-muted hover:text-text-secondary transition-colors cursor-pointer">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick stats donut */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Surat Selesai', pct: 98, color: '#16A34A', bg: '#DCFCE7', border: '#BBF7D0' },
          { label: 'Laporan Ditindak', pct: 76, color: '#2563EB', bg: '#DBEAFE', border: '#BFDBFE' },
          { label: 'Kepuasan Warga', pct: 92, color: '#D97706', bg: '#FEF3C7', border: '#FDE68A' },
        ].map(({ label, pct, color, bg, border }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border-2 card-shadow flex items-center gap-4" style={{ borderColor: border }}>
            <div className="relative w-14 h-14 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke={color} strokeWidth="3"
                  strokeDasharray={`${pct} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-xs" style={{ color }}>
                {pct}%
              </span>
            </div>
            <div>
              <p className="font-display font-bold text-text-primary text-lg">{pct}%</p>
              <p className="text-text-secondary text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
