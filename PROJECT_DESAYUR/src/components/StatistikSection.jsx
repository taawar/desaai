import { useEffect, useRef, useState } from 'react';
import { Users, MapPin, FileCheck, Clock } from 'lucide-react';

const stats = [
  {
    id: 'stat-penduduk',
    icon: Users,
    iconColor: '#16A34A',
    iconBg: '#DCFCE7',
    border: '#BBF7D0',
    value: '3.718',
    label: 'Total Penduduk',
    desc: 'Jiwa terdaftar',
  },
  {
    id: 'stat-dusun',
    icon: MapPin,
    iconColor: '#2563EB',
    iconBg: '#DBEAFE',
    border: '#BFDBFE',
    value: '4',
    label: 'Jumlah Dusun',
    desc: 'Wilayah aktif',
  },
  {
    id: 'stat-surat',
    icon: FileCheck,
    iconColor: '#16A34A',
    iconBg: '#DCFCE7',
    border: '#BBF7D0',
    value: '98%',
    label: 'Surat Selesai',
    desc: 'Tingkat keberhasilan',
  },
  {
    id: 'stat-kecepatan',
    icon: Clock,
    iconColor: '#D97706',
    iconBg: '#FEF3C7',
    border: '#FDE68A',
    value: '< 24 Jam',
    label: 'Proses Cepat',
    desc: 'Rata-rata selesai',
  },
];

function StatCard({ id, icon: Icon, iconColor, iconBg, border, value, label, desc, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`bg-white rounded-2xl p-7 border-2 card-shadow card-hover flex flex-col items-center text-center gap-4 ${
        visible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ borderColor: border, animationDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: iconBg }}>
        <Icon size={26} style={{ color: iconColor }} />
      </div>
      <div>
        <p className="font-display text-3xl font-extrabold text-text-primary leading-tight">{value}</p>
        <p className="text-sm font-semibold text-text-secondary mt-1">{label}</p>
        <p className="text-xs text-text-muted mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default function StatistikSection() {
  return (
    <section id="statistik" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide border border-blue-200">
            📊 Data &amp; Statistik Desa
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
            Desa Joesayur dalam <span className="text-blue-600">Angka</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto">
            Pelayanan desa kini lebih cepat, transparan, dan dapat diakses oleh seluruh warga.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
