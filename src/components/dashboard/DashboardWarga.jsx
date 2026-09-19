import { useState } from 'react';
import {
  Users, UserPlus, Search, Filter, Download, Eye, Edit, Trash2,
  CheckCircle, X, Shield, Phone, MapPin, Calendar, HeartHandshake,
  CreditCard, Home, Briefcase
} from 'lucide-react';

const initialWargaData = [
  {
    nik: '3521011804850001',
    noKK: '3521012301050012',
    nama: 'Bambang Supriyanto',
    jk: 'Laki-laki',
    usia: 41,
    tempatLahir: 'Ngawi',
    tglLahir: '18 April 1985',
    pekerjaan: 'Petani / Pekebun',
    dusun: 'Dusun Krajan',
    rtRw: 'RT 02 / RW 01',
    statusKeluarga: 'Kepala Keluarga',
    statusBansos: 'PKH',
    golDarah: 'O',
    noHp: '0812-3411-2233',
  },
  {
    nik: '3521015609880002',
    noKK: '3521012301050012',
    nama: 'Siti Maryam',
    jk: 'Perempuan',
    usia: 38,
    tempatLahir: 'Ngawi',
    tglLahir: '16 September 1988',
    pekerjaan: 'Mengurus Rumah Tangga',
    dusun: 'Dusun Krajan',
    rtRw: 'RT 02 / RW 01',
    statusKeluarga: 'Istri',
    statusBansos: 'PKH',
    golDarah: 'A',
    noHp: '0813-8899-7711',
  },
  {
    nik: '3521012201990003',
    noKK: '3521012301050088',
    nama: 'Ahmad Rizki Maulana',
    jk: 'Laki-laki',
    usia: 27,
    tempatLahir: 'Ngawi',
    tglLahir: '22 Januari 1999',
    pekerjaan: 'Wiraswasta / UMKM',
    dusun: 'Dusun Mulyo',
    rtRw: 'RT 03 / RW 02',
    statusKeluarga: 'Kepala Keluarga',
    statusBansos: 'Non-Bansos',
    golDarah: 'B',
    noHp: '0857-4433-2211',
  },
  {
    nik: '3521014503620004',
    noKK: '3521012301050099',
    nama: 'Mbah Sastro Sutrisno',
    jk: 'Laki-laki',
    usia: 64,
    tempatLahir: 'Ngawi',
    tglLahir: '05 Maret 1962',
    pekerjaan: 'Buruh Tani',
    dusun: 'Dusun Rejo',
    rtRw: 'RT 01 / RW 02',
    statusKeluarga: 'Kepala Keluarga',
    statusBansos: 'BLT Desa',
    golDarah: 'AB',
    noHp: '0821-9988-7766',
  },
  {
    nik: '3521016811950005',
    noKK: '3521012301050044',
    nama: 'Dewi Rahmawati',
    jk: 'Perempuan',
    usia: 30,
    tempatLahir: 'Madiun',
    tglLahir: '28 November 1995',
    pekerjaan: 'Guru Honorer',
    dusun: 'Dusun Makmur',
    rtRw: 'RT 04 / RW 03',
    statusKeluarga: 'Anggota Keluarga',
    statusBansos: 'Non-Bansos',
    golDarah: 'O',
    noHp: '0852-6655-4433',
  },
  {
    nik: '3521011112700006',
    noKK: '3521012301050033',
    nama: 'Sugeng Widodo',
    jk: 'Laki-laki',
    usia: 55,
    tempatLahir: 'Ngawi',
    tglLahir: '11 Desember 1970',
    pekerjaan: 'Peternak Sapi',
    dusun: 'Dusun Krajan',
    rtRw: 'RT 01 / RW 01',
    statusKeluarga: 'Kepala Keluarga',
    statusBansos: 'BPNT',
    golDarah: 'A',
    noHp: '0812-7711-2244',
  },
  {
    nik: '3521015007010007',
    noKK: '3521012301050033',
    nama: 'Tri Wahyuni',
    jk: 'Perempuan',
    usia: 25,
    tempatLahir: 'Ngawi',
    tglLahir: '10 Juli 2001',
    pekerjaan: 'Karyawan Swasta',
    dusun: 'Dusun Krajan',
    rtRw: 'RT 01 / RW 01',
    statusKeluarga: 'Anak',
    statusBansos: 'Non-Bansos',
    golDarah: 'B',
    noHp: '0878-1122-9900',
  },
  {
    nik: '3521010101580008',
    noKK: '3521012301050055',
    nama: 'Kastur Pawiro',
    jk: 'Laki-laki',
    usia: 68,
    tempatLahir: 'Ngawi',
    tglLahir: '01 Januari 1958',
    pekerjaan: 'Pensiunan / Petani',
    dusun: 'Dusun Mulyo',
    rtRw: 'RT 02 / RW 02',
    statusKeluarga: 'Kepala Keluarga',
    statusBansos: 'BLT Desa',
    golDarah: 'O',
    noHp: '0813-9087-6543',
  },
];

const bansosBadgeStyle = {
  'PKH':       { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'BLT Desa':  { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
  'BPNT':      { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
  'Non-Bansos':{ bg: '#F1F5F9', color: '#64748B', border: '#E2E8F0' },
};

export default function DashboardWarga() {
  const [wargaList, setWargaList] = useState(initialWargaData);
  const [search, setSearch] = useState('');
  const [filterDusun, setFilterDusun] = useState('semua');
  const [filterBansos, setFilterBansos] = useState('semua');
  const [filterJK, setFilterJK] = useState('semua');

  const [selectedWarga, setSelectedWarga] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form State for Adding Citizen
  const [formData, setFormData] = useState({
    nik: '',
    noKK: '',
    nama: '',
    jk: 'Laki-laki',
    tglLahir: '',
    pekerjaan: 'Petani / Pekebun',
    dusun: 'Dusun Krajan',
    rtRw: 'RT 01 / RW 01',
    statusKeluarga: 'Kepala Keluarga',
    statusBansos: 'Non-Bansos',
    noHp: '',
    golDarah: 'O',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filtered dataset
  const filtered = wargaList.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nik.includes(search) ||
      item.noKK.includes(search) ||
      item.pekerjaan.toLowerCase().includes(search.toLowerCase());

    const matchDusun = filterDusun === 'semua' || item.dusun === filterDusun;
    const matchBansos = filterBansos === 'semua' || item.statusBansos === filterBansos;
    const matchJK = filterJK === 'semua' || item.jk === filterJK;

    return matchSearch && matchDusun && matchBansos && matchJK;
  });

  const handleCreateWarga = (e) => {
    e.preventDefault();
    if (!formData.nik || !formData.nama) {
      alert('Mohon isi NIK dan Nama Lengkap warga.');
      return;
    }

    const newCitizen = {
      ...formData,
      usia: formData.tglLahir ? new Date().getFullYear() - new Date(formData.tglLahir).getFullYear() : 30,
      tempatLahir: 'Ngawi',
    };

    setWargaList([newCitizen, ...wargaList]);
    setShowAddModal(false);
    setFormData({
      nik: '',
      noKK: '',
      nama: '',
      jk: 'Laki-laki',
      tglLahir: '',
      pekerjaan: 'Petani / Pekebun',
      dusun: 'Dusun Krajan',
      rtRw: 'RT 01 / RW 01',
      statusKeluarga: 'Kepala Keluarga',
      statusBansos: 'Non-Bansos',
      noHp: '',
      golDarah: 'O',
    });

    showToast(`Data warga "${newCitizen.nama}" berhasil ditambahkan.`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-green-700 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up border border-green-500">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
              Kependudukan Desa
            </span>
            <span className="text-xs text-text-muted">• Sistem Informasi Data Warga (SID)</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Data Kependudukan Desa Joesayur
          </h2>
          <p className="text-text-secondary text-sm">
            Kelola data warga, identitas keluarga, status domisili, dan kepesertaan jaminan sosial desa.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," +
                ["NIK,No_KK,Nama,JK,Usia,Dusun,RTRW,Pekerjaan,Status_Bansos,No_HP"]
                  .concat(wargaList.map(e => `"${e.nik}","${e.noKK}","${e.nama}","${e.jk}","${e.usia}","${e.dusun}","${e.rtRw}","${e.pekerjaan}","${e.statusBansos}","${e.noHp}"`))
                  .join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `Data_Warga_Joesayur_${new Date().toISOString().slice(0,10)}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              showToast("Data kependudukan berhasil diexport ke CSV!");
            }}
            className="inline-flex items-center gap-2 bg-white border border-border text-text-primary px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-surface-soft transition-colors cursor-pointer shadow-sm"
          >
            <Download size={16} className="text-text-secondary" />
            <span className="hidden sm:inline">Export</span> CSV
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <UserPlus size={16} />
            <span>Tambah Warga</span>
          </button>
        </div>
      </div>

      {/* Population Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-border card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Penduduk</p>
            <p className="text-2xl font-bold font-display text-text-primary mt-1">3.718</p>
            <span className="text-xs text-green-700 font-medium mt-1 inline-block">1.890 L / 1.828 P</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Kepala Keluarga</p>
            <p className="text-2xl font-bold font-display text-blue-600 mt-1">1.042</p>
            <span className="text-xs text-blue-700 font-medium mt-1 inline-block">KK Terdaftar</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Home size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Wajib KTP (17+)</p>
            <p className="text-2xl font-bold font-display text-amber-600 mt-1">2.890</p>
            <span className="text-xs text-amber-700 font-medium mt-1 inline-block">98.2% Perekaman</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <CreditCard size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Penerima Bansos</p>
            <p className="text-2xl font-bold font-display text-rose-600 mt-1">486</p>
            <span className="text-xs text-rose-700 font-medium mt-1 inline-block">PKH, BLT, BPNT</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <HeartHandshake size={22} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-border card-shadow p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Cari berdasarkan NIK, No. KK, Nama Warga, atau Pekerjaan..."
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

          {/* Dusun Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-medium whitespace-nowrap">Dusun:</span>
            <select
              value={filterDusun}
              onChange={(e) => setFilterDusun(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="semua">Semua Dusun</option>
              <option value="Dusun Krajan">Dusun Krajan</option>
              <option value="Dusun Mulyo">Dusun Mulyo</option>
              <option value="Dusun Rejo">Dusun Rejo</option>
              <option value="Dusun Makmur">Dusun Makmur</option>
            </select>
          </div>

          {/* Bansos Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-medium whitespace-nowrap">Bansos:</span>
            <select
              value={filterBansos}
              onChange={(e) => setFilterBansos(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="semua">Semua Status</option>
              <option value="Non-Bansos">Non-Bansos</option>
              <option value="PKH">PKH</option>
              <option value="BLT Desa">BLT Desa</option>
              <option value="BPNT">BPNT</option>
            </select>
          </div>
        </div>

        {/* Gender Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
          <span className="text-xs text-text-muted font-medium mr-1">Jenis Kelamin:</span>
          {['semua', 'Laki-laki', 'Perempuan'].map((g) => (
            <button
              key={g}
              onClick={() => setFilterJK(g)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                filterJK === g
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-surface-muted text-text-secondary hover:bg-green-50 hover:text-green-800'
              }`}
            >
              {g === 'semua' ? 'Semua Warga' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Warga Table */}
      <div className="bg-white rounded-2xl border border-border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-surface-muted text-text-secondary text-xs border-b border-border">
                <th className="px-5 py-3.5 font-semibold">Nama Lengkap & NIK</th>
                <th className="px-4 py-3.5 font-semibold">Gender / Usia</th>
                <th className="px-4 py-3.5 font-semibold">Wilayah (Dusun & RT)</th>
                <th className="px-4 py-3.5 font-semibold hidden md:table-cell">Pekerjaan</th>
                <th className="px-4 py-3.5 font-semibold hidden sm:table-cell">Hub. Keluarga</th>
                <th className="px-4 py-3.5 font-semibold">Bantuan Sosial</th>
                <th className="px-5 py-3.5 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-text-muted">
                    <Users size={36} className="mx-auto mb-2 text-text-muted/50" />
                    <p className="font-semibold text-text-secondary">Tidak ada data warga ditemukan</p>
                    <p className="text-xs text-text-muted mt-1">Periksa kata kunci pencarian atau sesuaikan opsi filter.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const bStyle = bansosBadgeStyle[item.statusBansos] || bansosBadgeStyle['Non-Bansos'];

                  return (
                    <tr
                      key={item.nik}
                      className="hover:bg-green-50/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedWarga(item)}
                    >
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="font-semibold text-text-primary text-sm group-hover:text-green-700 transition-colors">
                          {item.nama}
                        </p>
                        <p className="font-mono text-xs text-text-muted mt-0.5">
                          NIK: {item.nik}
                        </p>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-xs text-text-primary font-medium">{item.jk}</span>
                        <p className="text-xs text-text-muted">{item.usia} Tahun</p>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-xs font-medium text-text-primary">{item.dusun}</span>
                        <p className="text-xs text-text-muted">{item.rtRw}</p>
                      </td>

                      <td className="px-4 py-4 hidden md:table-cell whitespace-nowrap">
                        <span className="text-xs text-text-secondary font-medium">{item.pekerjaan}</span>
                      </td>

                      <td className="px-4 py-4 hidden sm:table-cell whitespace-nowrap">
                        <span className="inline-block text-xs bg-surface-muted text-text-secondary font-medium px-2 py-0.5 rounded-md">
                          {item.statusKeluarga}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border"
                          style={{
                            backgroundColor: bStyle.bg,
                            color: bStyle.color,
                            borderColor: bStyle.border,
                          }}
                        >
                          {item.statusBansos}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedWarga(item)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Lihat Biodata"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-border bg-surface-soft text-xs text-text-muted gap-2">
          <span>Menampilkan {filtered.length} dari {wargaList.length} data warga terdaftar</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg bg-white border border-border text-text-secondary hover:bg-surface-muted transition-colors cursor-pointer">
              Sebelumnya
            </button>
            <button className="w-8 h-8 rounded-lg bg-green-600 text-white font-medium flex items-center justify-center">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-border text-text-secondary hover:bg-surface-muted transition-colors cursor-pointer">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Modal Detail Biodata Warga */}
      {selectedWarga && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-700 to-blue-700 text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-green-200 font-semibold">Biodata Kependudukan</p>
                <h3 className="font-display text-xl font-bold mt-0.5">{selectedWarga.nama}</h3>
                <p className="text-xs text-blue-100 font-mono mt-0.5">NIK: {selectedWarga.nik}</p>
              </div>
              <button
                onClick={() => setSelectedWarga(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-surface-soft p-4 rounded-xl border border-border text-xs">
                <div>
                  <span className="text-text-muted block">Nomor Kartu Keluarga (KK):</span>
                  <span className="font-mono font-bold text-text-primary text-sm">{selectedWarga.noKK}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Hubungan Keluarga:</span>
                  <span className="font-semibold text-text-primary text-sm">{selectedWarga.statusKeluarga}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Jenis Kelamin:</span>
                  <span className="font-semibold text-text-primary">{selectedWarga.jk}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Usia / Gol. Darah:</span>
                  <span className="font-semibold text-text-primary">{selectedWarga.usia} Tahun / Gol. {selectedWarga.golDarah}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Tempat, Tanggal Lahir:</span>
                  <span className="font-semibold text-text-primary">{selectedWarga.tempatLahir}, {selectedWarga.tglLahir}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Pekerjaan:</span>
                  <span className="font-semibold text-text-primary">{selectedWarga.pekerjaan}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Wilayah Tempat Tinggal:</span>
                  <span className="font-semibold text-text-primary">{selectedWarga.dusun} ({selectedWarga.rtRw})</span>
                </div>
                <div>
                  <span className="text-text-muted block">No. Telepon / WhatsApp:</span>
                  <span className="font-semibold text-text-primary">{selectedWarga.noHp || '-'}</span>
                </div>
              </div>

              {/* Status Bansos Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-700 font-semibold">Status Program Bantuan Sosial:</p>
                  <p className="text-sm font-bold text-blue-900 mt-0.5">{selectedWarga.statusBansos}</p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full border"
                  style={{
                    backgroundColor: bansosBadgeStyle[selectedWarga.statusBansos]?.bg,
                    color: bansosBadgeStyle[selectedWarga.statusBansos]?.color,
                    borderColor: bansosBadgeStyle[selectedWarga.statusBansos]?.border,
                  }}
                >
                  Terverifikasi Desa
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-surface-soft border-t border-border px-6 py-4 flex items-center justify-end">
              <button
                onClick={() => setSelectedWarga(null)}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors cursor-pointer"
              >
                Tutup Biodata
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Warga Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl animate-scale-in">
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-display text-lg font-bold text-text-primary">Tambah Data Warga Baru</h3>
                <p className="text-xs text-text-muted">Masukkan data kependudukan sesuai KTP & Kartu Keluarga resmi.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-muted flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateWarga} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    NIK (16 Digit) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="Contoh: 352101..."
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm font-mono focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Nomor Kartu Keluarga (KK)
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="Contoh: 352101..."
                    value={formData.noKK}
                    onChange={(e) => setFormData({ ...formData, noKK: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm font-mono focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Nama Lengkap Sesuai KTP <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={formData.jk}
                    onChange={(e) => setFormData({ ...formData, jk: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={formData.tglLahir}
                    onChange={(e) => setFormData({ ...formData, tglLahir: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Dusun
                  </label>
                  <select
                    value={formData.dusun}
                    onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value="Dusun Krajan">Dusun Krajan</option>
                    <option value="Dusun Mulyo">Dusun Mulyo</option>
                    <option value="Dusun Rejo">Dusun Rejo</option>
                    <option value="Dusun Makmur">Dusun Makmur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    RT / RW
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: RT 02 / RW 01"
                    value={formData.rtRw}
                    onChange={(e) => setFormData({ ...formData, rtRw: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Petani / Wiraswasta"
                    value={formData.pekerjaan}
                    onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Status Bantuan Sosial
                  </label>
                  <select
                    value={formData.statusBansos}
                    onChange={(e) => setFormData({ ...formData, statusBansos: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value="Non-Bansos">Non-Bansos</option>
                    <option value="PKH">PKH</option>
                    <option value="BLT Desa">BLT Desa</option>
                    <option value="BPNT">BPNT</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-muted transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors cursor-pointer shadow-sm"
                >
                  Simpan Data Warga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
