"use client"

import { useRef } from "react";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import SuccessStories from "@/components/home/SuccessStories";
import Benefits from "@/components/home/Benefits";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Faqs from "@/components/home/Faqs";


export default function Home() {
  const howItWorksRef = useRef<HTMLDivElement>(null); // Explicitly type the ref

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth" }); // TypeScript-safe usage
    }
  };

  return (
    <main>
      <Navbar />
      <Hero onLearnMoreClick={scrollToHowItWorks} />
      <Features />
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>
      <SuccessStories />
      <Benefits />
      <CTA />
      <Faqs />
      <Footer />
    </main>
  );
}
