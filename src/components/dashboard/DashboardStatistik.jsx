import { useState } from 'react';
import {
  BarChart2, TrendingUp, Users, FileText, Landmark,
  Award, ArrowUpRight, Download, Calendar, CheckCircle, PieChart
} from 'lucide-react';

export default function DashboardStatistik() {
  const [selectedYear, setSelectedYear] = useState('2026');

  const ageGroups = [
    { label: 'Balita & Anak (0 - 14 Th)', count: 684, percent: 18.4, color: 'bg-blue-500' },
    { label: 'Usia Produktif (15 - 59 Th)', count: 2420, percent: 65.1, color: 'bg-green-600' },
    { label: 'Lansia (60+ Th)', count: 614, percent: 16.5, color: 'bg-amber-500' },
  ];

  const jobs = [
    { label: 'Petani & Pekebun', count: '1.560', percent: 42, color: 'bg-emerald-600' },
    { label: 'Wiraswasta / UMKM', count: '892', percent: 24, color: 'bg-blue-600' },
    { label: 'Buruh Harian Lepas', count: '670', percent: 18, color: 'bg-amber-500' },
    { label: 'PNS, TNI, POLRI & Guru', count: '298', percent: 8, color: 'bg-indigo-600' },
    { label: 'Karyawan Swasta', count: '298', percent: 8, color: 'bg-teal-600' },
  ];

  const monthlyLetters = [
    { month: 'Jan', count: 94 },
    { month: 'Feb', count: 108 },
    { month: 'Mar', count: 115 },
    { month: 'Apr', count: 88 },
    { month: 'Mei', count: 122 },
    { month: 'Jun', count: 130 },
    { month: 'Jul', count: 142 },
    { month: 'Agt', count: 156 },
    { month: 'Sep', count: 128 },
  ];

  const dusunStats = [
    { dusun: 'Dusun Krajan', kk: 320, jiwa: '1.140', bansos: 142, pkm: '44%' },
    { dusun: 'Dusun Mulyo', kk: 260, jiwa: '930', bansos: 118, pkm: '48%' },
    { dusun: 'Dusun Rejo', kk: 242, jiwa: '868', bansos: 124, pkm: '52%' },
    { dusun: 'Dusun Makmur', kk: 220, jiwa: '780', bansos: 102, pkm: '39%' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
              Analitik & Data Desa
            </span>
            <span className="text-xs text-text-muted">• Indeks Desa Membangun (IDM)</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Statistik & Profil Kinerja Desa
          </h2>
          <p className="text-text-secondary text-sm">
            Visualisasi data kependudukan, efisiensi pelayanan surat, dan distribusi jaminan sosial warga.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-border px-3 py-2 rounded-xl text-xs font-semibold">
            <Calendar size={14} className="text-text-muted" />
            <span>Tahun Data:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent font-bold text-blue-700 focus:outline-none cursor-pointer"
            >
              <option value="2026">2026 (Aktif)</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Cetak</span> Laporan
          </button>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-700 to-green-800 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-15">
            <Award size={130} />
          </div>
          <div className="relative z-10">
            <span className="inline-block text-xs uppercase tracking-wider font-semibold text-green-200 mb-1">
              Status Kemandirian Desa
            </span>
            <h3 className="font-display text-2xl font-black">Desa Mandiri</h3>
            <p className="text-xs text-green-100 mt-1">Nilai IDM: 0.8845 (Sangat Baik / Mandiri)</p>
            <div className="mt-4 pt-3 border-t border-green-600/60 flex items-center justify-between text-xs">
              <span>Target 2026: Terpenuhi</span>
              <span className="font-bold flex items-center gap-1"><CheckCircle size={12} /> Terverifikasi Kemendesa</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-15">
            <FileText size={130} />
          </div>
          <div className="relative z-10">
            <span className="inline-block text-xs uppercase tracking-wider font-semibold text-blue-200 mb-1">
              Rata-rata Waktu Pelayanan
            </span>
            <h3 className="font-display text-2xl font-black">1.2 Jam Kerja</h3>
            <p className="text-xs text-blue-100 mt-1">Standar SOP: Maksimal 24 Jam</p>
            <div className="mt-4 pt-3 border-t border-blue-600/60 flex items-center justify-between text-xs">
              <span>96.4% Surat Selesai Hari H</span>
              <span className="font-bold text-green-300">+14% Lebih Cepat</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-15">
            <Users size={130} />
          </div>
          <div className="relative z-10">
            <span className="inline-block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1">
              Kepuasan Masyarakat (IKM)
            </span>
            <h3 className="font-display text-2xl font-black">94.8 / 100</h3>
            <p className="text-xs text-slate-300 mt-1">Kategori: Sangat Memuaskan (A)</p>
            <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
              <span>Berdasarkan 420 Ulasan Warga</span>
              <span className="text-amber-300 font-bold">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Pengurusan Surat */}
        <div className="bg-white rounded-2xl p-6 border border-border card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-text-primary">
                Tren Pengurusan Surat Bulanan
              </h3>
              <p className="text-xs text-text-muted">Total surat permohonan warga per bulan di {selectedYear}</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-green-100 text-green-800 font-bold text-xs">
              +18.4% YoY
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 pt-6">
            {monthlyLetters.map((item) => {
              const heightPercent = Math.round((item.count / 160) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[10px] font-bold text-text-muted group-hover:text-blue-600 transition-colors">
                    {item.count}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end p-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-md group-hover:from-green-600 group-hover:to-green-400 transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-secondary font-medium">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Demografi Usia */}
        <div className="bg-white rounded-2xl p-6 border border-border card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-text-primary">
                Struktur Kelompok Usia Penduduk
              </h3>
              <p className="text-xs text-text-muted">Distribusi 3.718 jiwa penduduk Desa Joesayur</p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <PieChart size={18} />
            </div>
          </div>

          {/* Stacked Progress Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex gap-0.5 bg-slate-100">
            {ageGroups.map((g) => (
              <div
                key={g.label}
                className={`${g.color} h-full transition-all duration-500`}
                style={{ width: `${g.percent}%` }}
                title={`${g.label}: ${g.percent}%`}
              />
            ))}
          </div>

          <div className="space-y-3 pt-2">
            {ageGroups.map((g) => (
              <div key={g.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-md ${g.color}`} />
                  <span className="font-medium text-text-primary">{g.label}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-text-primary">{g.count} Jiwa</span>
                  <span className="text-text-muted ml-2 font-mono">({g.percent}%)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800">
            💡 <strong>Bonus Demografi:</strong> Sebanyak 65.1% warga berada dalam rentang usia produktif dan aktif menggerakkan roda ekonomi desa.
          </div>
        </div>
      </div>

      {/* Mata Pencaharian & Wilayah Dusun */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mata Pencaharian */}
        <div className="bg-white rounded-2xl p-6 border border-border card-shadow space-y-4">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Mata Pencaharian & Sektor Kerja
            </h3>
            <p className="text-xs text-text-muted">Pekerjaan utama kepala keluarga dan usia kerja</p>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-text-primary">{job.label}</span>
                  <span className="font-bold text-text-secondary">{job.count} orang ({job.percent}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`${job.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${job.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabel Rekap Wilayah Dusun */}
        <div className="bg-white rounded-2xl p-6 border border-border card-shadow space-y-4">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Data Agregat per Wilayah Dusun
            </h3>
            <p className="text-xs text-text-muted">Jumlah KK, penduduk, dan penerima jaminan sosial</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-surface-muted text-text-secondary border-b border-border">
                  <th className="px-3 py-2.5 font-semibold">Nama Dusun</th>
                  <th className="px-3 py-2.5 font-semibold">Kepala Keluarga</th>
                  <th className="px-3 py-2.5 font-semibold">Jumlah Jiwa</th>
                  <th className="px-3 py-2.5 font-semibold">Keluarga Bansos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dusunStats.map((d) => (
                  <tr key={d.dusun} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-semibold text-text-primary">{d.dusun}</td>
                    <td className="px-3 py-3 text-text-secondary">{d.kk} KK</td>
                    <td className="px-3 py-3 font-medium text-text-primary">{d.jiwa} Jiwa</td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                        {d.bansos} KK
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
