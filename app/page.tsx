<<<<<<< HEAD
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import SuccessStories from '@/components/SuccessStories';
import Benefits from '@/components/Benefits';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Faqs from '@/components/Faqs';
import SupportContact from '@/components/SupportContact';
=======
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessStories from '@/components/home/SuccessStories';
import Benefits from '@/components/home/Benefits';
import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import Faqs from '@/components/home/Faqs';
>>>>>>> a65d8ad23db5eae3e046000aa1c8c7e36fe9266b
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