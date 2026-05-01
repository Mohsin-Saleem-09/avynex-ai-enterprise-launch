import { useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import WhySection from "@/components/sections/WhySection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

const DOC_TITLE = "Avynex AI | AI Automation & Chatbot Solutions";

const Index = () => {
  useEffect(() => {
    document.title = DOC_TITLE;
  }, []);

  return (
  <main className="min-h-screen">
    <Navbar />
    <HeroSection />
    <TrustSection />
    <AboutSection />
    <ServicesSection />
    <ProcessSection />
    <WhySection />
    <ProjectsSection />
    <PricingSection />
    <TestimonialsSection />
    <ContactSection />
    <Footer />
  </main>
  );
};

export default Index;
