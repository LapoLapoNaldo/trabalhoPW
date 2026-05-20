import AffirmationCarousel from "@/components/AffirmationCarousel";
import EducationSection from "@/components/EducationSection";
import FlagGallery from "@/components/FlagGallery";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InteractiveMascot from "@/components/InteractiveMascot";
import Navbar from "@/components/Navbar";
import ParticlesBackground from "@/components/ParticlesBackground";
import RainbowCursor from "@/components/RainbowCursor";
import Resources from "@/components/Resources";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <a
        href="#conteudo"
        className="focus-ring fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-pride-yellow px-5 py-3 text-sm font-bold text-black shadow-yellow-glow transition-transform duration-500 ease-cinema focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <ParticlesBackground />
      <RainbowCursor />
      <Navbar />
      <div id="conteudo">
        <Hero />
        <EducationSection />
        <FlagGallery />
        <AffirmationCarousel />
        <Timeline />
        <Resources />
        <InteractiveMascot />
      </div>
      <Footer />
    </main>
  );
}
