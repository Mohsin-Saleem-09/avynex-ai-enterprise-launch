import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import ServicesSection from "@/components/sections/ServicesSection";
import IntegrationSection from "@/components/sections/IntegrationSection";
import WhySection from "@/components/sections/WhySection";
import ProcessSection from "@/components/sections/ProcessSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

const Index = () => (
  <main className="min-h-screen">
    <Navbar />
    <HeroSection />
    <TrustSection />
    <ServicesSection />
    <IntegrationSection />
    <WhySection />
    <ProcessSection />
    <ProjectsSection />
    <PricingSection />
    
    <ContactSection />
    <Footer />
  </main>
);

export default Index;
