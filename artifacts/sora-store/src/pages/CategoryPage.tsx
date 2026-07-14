import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useListCategories, useListProducts } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
  const { slug } = useParams();
  const [sort, setSort] = useState<string>('');

  const { data: categories } = useListCategories();
  const category = categories?.find(c => c.slug === slug);
  
  const { data: products, isLoading } = useListProducts({ categorySlug: slug, sort });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        {/* Mobile Back & Breadcrumb */}
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/categories" className="lg:hidden flex items-center hover:text-foreground">
            <ChevronRight size={18} />
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-primary transition-colors">الأقسام</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category?.nameAr || slug}</span>
        </div>

        {/* Header */}
        {category && (
          <section className="container mx-auto px-4 pb-8">
            <div 
              className="rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col items-center md:items-start text-center md:text-right border border-border/50 shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${category.color}20, rgba(0,0,0,0))` }}
            >
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${category.color}, transparent 60%)` }}
              />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-4xl md:text-5xl text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${category.color}, #000000)` }}
                >
                  {category.icon}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{category.nameAr}</h1>
                  <p className="text-muted-foreground text-sm md:text-base">
                    اكتشف أفضل المنتجات في قسم {category.nameAr} بأفضل الأسعار
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Toolbar */}
        <section className="container mx-auto px-4 mb-8">
          <div className="bg-card border border-border/50 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium">
              عرض {products?.length || 0} منتج
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground ml-2">ترتيب حسب:</span>
              <Button 
                variant={sort === '' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setSort('')}
                className={sort === '' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'border-border'}
              >
                الكل
              </Button>
              <Button 
                variant={sort === 'newest' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setSort('newest')}
                className={sort === 'newest' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'border-border'}
              >
                الأحدث
              </Button>
              <Button 
                variant={sort === 'price_asc' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setSort('price_asc')}
                className={sort === 'price_asc' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'border-border'}
              >
                السعر ↑
              </Button>
              <Button 
                variant={sort === 'price_desc' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setSort('price_desc')}
                className={sort === 'price_desc' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'border-border'}
              >
                السعر ↓
              </Button>
              <Button 
                variant={sort === 'rating' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setSort('rating')}
                className={sort === 'rating' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'border-border'}
              >
                التقييم
              </Button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 pb-16">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 h-[320px] animate-pulse" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, idx) => (
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
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-6 opacity-50">🛒</div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">لا يوجد منتجات</h2>
              <p className="text-muted-foreground max-w-md">
                عذراً، لا يوجد منتجات في هذا القسم حالياً. يرجى التحقق مرة أخرى لاحقاً.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
