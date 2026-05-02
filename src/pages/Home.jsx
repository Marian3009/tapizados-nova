import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Gallery from '../components/home/Gallery';
import CTABanner from '../components/home/CTABanner';
import Contact from '../components/home/Contact';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <CTABanner />
      <Contact />
      <Footer />
    </div>
  );
}