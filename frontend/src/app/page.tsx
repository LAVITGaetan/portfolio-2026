import Navbar from "./components/Navbar";
import HeroSection from "./components/sections/HeroSection";
import ProjectSection from "./components/sections/ProjectSection";
import StackSection from "./components/sections/StacksSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="layout">
      <Navbar />
      <HeroSection />
      <StackSection />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
