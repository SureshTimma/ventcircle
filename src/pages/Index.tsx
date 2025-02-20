
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ResourcesSection from "@/components/ResourcesSection";
import HowItWorks from "@/components/HowItWorks";
import SupportSection from "@/components/SupportSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 via-background to-secondary/30">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ResourcesSection />
        <SupportSection />
      </main>
    </div>
  );
};

export default Index;
