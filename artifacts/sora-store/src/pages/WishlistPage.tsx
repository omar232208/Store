import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useWishlist } from '@/contexts/WishlistContext';
import { useListProducts } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { ids, count } = useWishlist();
  const { data: allProducts, isLoading } = useListProducts();

  const wishlistProducts = allProducts?.filter(p => ids.includes(p.id)) || [];

  if (count === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 bg-secondary/5 rounded-full flex items-center justify-center mb-8 border border-secondary/10 shadow-[0_0_50px_rgba(236,72,153,0.1)]"
          >
            <Heart size={80} className="text-secondary/50" fill="currentColor" />
          </motion.div>
          <h1 className="text-3xl font-black mb-4">المفضلة فارغة</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            لم تقم بإضافة أي منتجات إلى مفضلتك بعد. احتفظ بالمنتجات التي تعجبك هنا للرجوع إليها لاحقاً.
          </p>
          <Link href="/categories">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 h-14 rounded-xl shadow-[0_8px_30px_rgba(236,72,153,0.3)]">
              اكتشف المنتجات
            </Button>
          </Link>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
          <Heart size={32} className="text-secondary" fill="currentColor" />
          قائمة المفضلة
          <span className="bg-secondary text-white text-sm px-3 py-1 rounded-full font-bold">
            {count}
          </span>
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border/50 h-[320px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistProducts.map((product, idx) => (
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
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
