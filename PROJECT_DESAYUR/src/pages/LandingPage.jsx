import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LayananSection from '../components/LayananSection';
import StatistikSection from '../components/StatistikSection';
import PanduanSection from '../components/PanduanSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <HeroSection />
        <LayananSection />
        <StatistikSection />
        <PanduanSection />
      </main>
      <Footer />
    </div>
  );
}
