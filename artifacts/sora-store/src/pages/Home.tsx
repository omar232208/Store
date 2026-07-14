import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FlashSales from '../components/FlashSales';
import BestSellers from '../components/BestSellers';
import Reviews from '../components/Reviews';
import StatsBar from '../components/StatsBar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              <FlashSales />
            </div>
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <BestSellers />
            </div>
          </div>
        </section>

        <Reviews />
        <StatsBar />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
