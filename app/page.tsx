import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import SuccessStories from '@/components/SuccessStories';
import Benefits from '@/components/Benefits';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Faqs from '@/components/Faqs';
import SupportContact from '@/components/SupportContact';
export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <SuccessStories />
      <Benefits />
      <CTA />
      <Faqs />
      <SupportContact />
      <Footer />
    </main>
  );
}