import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useGetProduct, useGetRelatedProducts } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Heart, ShieldCheck, Truck, CreditCard, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const productId = Number(id);
  
  const { data: product, isLoading } = useGetProduct(productId);
  const { data: relatedProducts, isLoading: loadingRelated } = useGetRelatedProducts(productId);
  
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(productId);

  const [qty, setQty] = useState(1);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
           <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
             <div className="w-full lg:w-1/2 bg-card h-[400px] rounded-3xl" />
             <div className="w-full lg:w-1/2 flex flex-col gap-4">
               <div className="h-10 bg-muted rounded-xl w-3/4" />
               <div className="h-6 bg-muted rounded-xl w-1/4" />
               <div className="h-32 bg-muted rounded-xl w-full mt-4" />
             </div>
           </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add exact qty
    for(let i=0; i<qty; i++){
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/categories/${product.categorySlug}`} className="lg:hidden flex items-center hover:text-foreground">
            <ChevronRight size={18} />
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href={`/categories/${product.categorySlug}`} className="hover:text-primary transition-colors">{product.categorySlug}</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.nameAr}</span>
        </div>

        <section className="container mx-auto px-4 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-card p-6 md:p-8 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            {/* Left: Image */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 relative z-10">
              <div className="aspect-square bg-muted/30 rounded-3xl flex items-center justify-center p-8 border border-border/50 relative overflow-hidden">
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-black px-3 py-1 rounded-full shadow-lg z-20">
                    -{product.discount}%
                  </div>
                )}
                {product.image && product.image.length > 3 ? (
                  <img src={product.image} alt={product.nameAr} className="w-full h-full object-contain drop-shadow-2xl" />
                ) : (
                  <div className="text-9xl opacity-50">{product.nameAr.charAt(0)}</div>
                )}
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full lg:w-1/2 flex flex-col relative z-10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
                  {product.nameAr}
                </h1>
                <button
                  onClick={() => toggle(productId)}
                  className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                    wishlisted
                      ? 'bg-secondary/20 border-secondary/30 text-secondary hover:bg-secondary/30'
                      : 'bg-background/40 border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Heart size={24} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 bg-warning/10 text-warning px-3 py-1 rounded-full">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold text-sm">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground underline decoration-dashed underline-offset-4 cursor-pointer hover:text-foreground">
                  ({product.reviewCount} تقييم)
                </span>
                {product.badge && (
                  <span className="text-xs font-bold px-2 py-1 bg-primary/20 text-primary border border-primary/30 rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="mb-6 flex flex-col gap-1 border-b border-border/50 pb-6">
                {product.originalPrice > product.price && (
                  <span className="text-muted-foreground line-through text-lg">
                    {product.originalPrice.toFixed(2)} {product.currency}
                  </span>
                )}
                <div className="flex items-baseline gap-2 text-primary">
                  <span className="font-black text-4xl md:text-5xl">{product.price.toFixed(2)}</span>
                  <span className="text-xl font-bold uppercase">{product.currency}</span>
                </div>
              </div>

              {product.descriptionAr && (
                <div className="mb-8 text-muted-foreground leading-relaxed">
                  <p>{product.descriptionAr}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center justify-between bg-background border border-border rounded-xl px-4 py-2 w-full sm:w-1/3">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-lg">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_8px_30px_rgba(124,58,237,0.3)] transition-all"
                >
                  أضف للسلة
                </Button>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
                <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">ضمان الاسترداد</span>
                </div>
                <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Truck size={20} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">تسليم فوري</span>
                </div>
                <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-warning/20 text-warning flex items-center justify-center shrink-0">
                    <CreditCard size={20} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">دفع آمن</span>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* Related */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 py-12 border-t border-border/50">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              منتجات ذات صلة
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {relatedProducts.map((p) => (
                <div key={p.id} className="min-w-[260px] md:min-w-[280px] snap-center">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
