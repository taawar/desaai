import { FileText, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

function ServiceCard({ id, icon: Icon, iconBg, iconColor, borderColor, title, description, tags, tagBg, tagColor, btnLabel, btnBg, btnText }) {
  return (
    <div
      id={id}
      className="group bg-white rounded-2xl p-8 border-2 card-shadow card-hover flex flex-col gap-5 cursor-pointer"
      style={{ borderColor }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={26} style={{ color: iconColor }} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-display text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: tagBg, color: tagColor }}
          >
            <CheckCircle size={10} />
            {tag}
          </span>
        ))}
      </div>

      {/* Button */}
      <button
        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
        style={{ backgroundColor: btnBg, color: btnText }}
      >
        {btnLabel}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 duration-200" />
      </button>
    </div>
  );
}

export default function LayananSection() {
  return (
    <section id="layanan" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide border border-green-200">
            🏛️ Layanan Digital Desa
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
            Layanan Warga Dalam <span className="text-green-600">Satu Sistem</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto">
            Pilih layanan administrasi atau pengaduan warga dengan mudah, cepat, dan tanpa antre.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <ServiceCard
            id="card-surat-cepat"
            icon={FileText}
            iconBg="#DCFCE7"
            iconColor="#16A34A"
            borderColor="#BBF7D0"
            title="SuratCepat"
            description="Urus surat pengantar RT/RW, domisili, atau SKTM secara online dari rumah tanpa perlu antre di kantor desa."
            tags={['Surat Domisili', 'SKTM', 'Pengantar KTP']}
            tagBg="#F0FDF4"
            tagColor="#16A34A"
            btnLabel="Ajukan Surat Sekarang"
            btnBg="#16A34A"
            btnText="#FFFFFF"
          />
          <ServiceCard
            id="card-lapor-desa"
            icon={AlertTriangle}
            iconBg="#DBEAFE"
            iconColor="#2563EB"
            borderColor="#BFDBFE"
            title="LaporDesa"
            description="Laporkan masalah jalan rusak, fasilitas publik, lampu padam, atau kendala desa secara langsung dan real-time."
            tags={['Jalan Rusak', 'Lampu Padam', 'Kebersihan']}
            tagBg="#EFF6FF"
            tagColor="#2563EB"
            btnLabel="Kirim Laporan"
            btnBg="#2563EB"
            btnText="#FFFFFF"
          />
        </div>

        {/* Info banner */}
        <div className="mt-12 max-w-5xl mx-auto bg-blue-50 border border-blue-200 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={16} className="text-blue-600" />
          </div>
          <p className="text-blue-700 text-center sm:text-left">
            <span className="font-semibold">Gratis & Mudah:</span> Semua layanan tidak dipungut biaya apapun. Layanan online tersedia 24 jam.
          </p>
        </div>
      </div>
    </section>
  );
}
