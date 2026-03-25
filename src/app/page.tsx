import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Stats } from "@/components/sections/Stats";
import { Trust } from "@/components/sections/Trust";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Urgency } from "@/components/sections/Urgency";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BottomBar } from "@/components/ui/BottomBar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Ticker />
      <Stats />
      <Trust />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <Urgency />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
      
      {/* Floating Elements */}
      <WhatsAppButton />
      <BottomBar />
    </main>
  );
}