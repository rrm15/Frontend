import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessStories from '@/components/home/SuccessStories';
import Benefits from '@/components/home/Benefits';
import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import Faqs from '@/components/home/Faqs';
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
      <Footer />
    </main>
  );
}