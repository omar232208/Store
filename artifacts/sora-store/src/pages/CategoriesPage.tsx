import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useListCategories } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useListCategories();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-12 md:py-20 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              جميع الأقسام
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-4" />
            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
              تصفح مجموعتنا الواسعة من المنتجات الرقمية، بطاقات الهدايا، والاشتراكات
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col items-center text-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-muted mb-4" />
                  <div className="h-4 w-20 bg-muted rounded mb-2" />
                  <div className="h-3 w-12 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categories?.map((category, idx) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-card hover:bg-card/80 border border-border/50 hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(124,58,237,0.15)] rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 cursor-pointer group h-full"
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `linear-gradient(135deg, ${category.color}, #000000)` }}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-base md:text-lg mb-1 group-hover:text-primary transition-colors">
                      {category.nameAr}
                    </h3>
                    <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                      {category.productCount} منتج
                    </span>
                  </motion.div>
                </Link>
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
