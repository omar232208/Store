import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useListFlashSaleProducts, useListProducts } from '@workspace/api-client-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { Timer, Zap, ThumbsUp, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OffersPage() {
  const { data: flashSales, isLoading: loadingFlash } = useListFlashSaleProducts();
  const { data: bestPrices, isLoading: loadingBest } = useListProducts({ sort: 'price_asc', limit: 8 });
  const { data: topRated, isLoading: loadingTop } = useListProducts({ sort: 'rating', limit: 8 });

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!flashSales?.endsAt) return;
    
    const calculateTimeLeft = () => {
      const difference = +new Date(flashSales.endsAt) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [flashSales?.endsAt]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-12 md:py-20 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 via-background to-background pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-destructive/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
              <Percent size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              عروض حصرية
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-destructive to-orange-500 rounded-full mb-4" />
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mb-8">
              اكتشف أقوى العروض والتخفيضات على المنتجات الرقمية والاشتراكات. فرصتك للتوفير!
            </p>
            
            {/* Countdown */}
            <div className="flex items-center gap-4 bg-card border border-destructive/30 px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.15)]">
              <Timer className="text-destructive w-6 h-6 animate-pulse" />
              <div className="flex gap-2 text-center" dir="ltr">
                <div className="bg-destructive/10 text-destructive rounded-lg w-12 h-12 flex flex-col items-center justify-center font-bold text-lg border border-destructive/20">
                  {timeLeft.hours.toString().padStart(2, '0')}
                  <span className="text-[8px] text-destructive/80 font-normal">HR</span>
                </div>
                <span className="text-destructive font-bold self-center">:</span>
                <div className="bg-destructive/10 text-destructive rounded-lg w-12 h-12 flex flex-col items-center justify-center font-bold text-lg border border-destructive/20">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                  <span className="text-[8px] text-destructive/80 font-normal">MIN</span>
                </div>
                <span className="text-destructive font-bold self-center">:</span>
                <div className="bg-destructive/10 text-destructive rounded-lg w-12 h-12 flex flex-col items-center justify-center font-bold text-lg border border-destructive/20">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                  <span className="text-[8px] text-destructive/80 font-normal">SEC</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sales Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <Zap size={20} className="fill-current" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">عروض سريعة</h2>
                <div className="w-8 h-1 bg-destructive rounded-full mt-2" />
              </div>
            </div>
          </div>

          {loadingFlash ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 h-[320px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {flashSales?.products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Best Prices Section */}
        <section className="container mx-auto px-4 py-12 border-t border-border/50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                <Percent size={20} className="fill-current" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">أفضل الأسعار</h2>
                <div className="w-8 h-1 bg-success rounded-full mt-2" />
              </div>
            </div>
            <Button variant="outline" className="text-xs">عرض الكل</Button>
          </div>

          {loadingBest ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 h-[320px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {bestPrices?.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Top Rated Section */}
        <section className="container mx-auto px-4 py-12 border-t border-border/50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                <ThumbsUp size={20} className="fill-current" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">الأعلى تقييماً</h2>
                <div className="w-8 h-1 bg-warning rounded-full mt-2" />
              </div>
            </div>
            <Button variant="outline" className="text-xs">عرض الكل</Button>
          </div>

          {loadingTop ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 h-[320px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {topRated?.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
