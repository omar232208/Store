import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, updateQty, removeItem, total, count, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success('تم تأكيد طلبك! سيتم التواصل معك قريباً', { duration: 4000 });
    clearCart();
  };

  const handlePromo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('تم تطبيق الخصم بنجاح! (خصم 10%)');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-primary/10 shadow-[0_0_50px_rgba(124,58,237,0.1)]"
          >
            <ShoppingBag size={80} className="text-primary/50" />
          </motion.div>
          <h1 className="text-3xl font-black mb-4">سلتك فارغة</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            لم تقم بإضافة أي منتجات إلى سلتك بعد. تصفح أقسامنا واكتشف أفضل العروض والمنتجات الرقمية.
          </p>
          <Link href="/categories">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 rounded-xl shadow-[0_8px_30px_rgba(124,58,237,0.3)]">
              ابدأ التسوق الآن
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
          سلة المشتريات
          <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-bold">
            {count}
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="bg-card border border-border/50 rounded-2xl p-4 flex justify-between items-center text-sm font-bold text-muted-foreground">
              <span>المنتجات</span>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 size={16} className="mr-2" /> مسح السلة
              </Button>
            </div>

            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-card border border-border/50 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-sm hover:border-primary/30 transition-colors"
              >
                {/* Image */}
                <div className="w-20 h-20 bg-muted/30 rounded-xl flex items-center justify-center p-2 shrink-0">
                  {item.image && item.image.length > 3 ? (
                    <img src={item.image} alt={item.nameAr} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl opacity-50 font-bold">{item.nameAr.charAt(0)}</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col gap-1 min-w-0 w-full">
                  <h3 className="font-bold text-base truncate">{item.nameAr}</h3>
                  {item.period && <span className="text-xs text-muted-foreground">{item.period}</span>}
                  <div className="text-primary font-bold text-sm mt-1">
                    {item.price.toFixed(2)} {item.currency}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 shrink-0 mt-2 sm:mt-0">
                  <div className="flex items-center bg-background border border-border rounded-lg p-1">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="font-black text-lg">{(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-destructive hover:underline mt-1">
                      حذف
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card border border-border/50 rounded-3xl p-6 lg:sticky lg:top-24 shadow-xl">
              <h2 className="text-xl font-black mb-6 pb-4 border-b border-border/50">ملخص الطلب</h2>
              
              <div className="flex flex-col gap-4 mb-6 text-sm">
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>المجموع الفرعي</span>
                  <span>{total.toFixed(2)} ريال</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>التوصيل (فوري)</span>
                  <span className="text-success font-bold">مجاني</span>
                </div>
                <div className="flex justify-between items-center text-foreground font-black text-2xl pt-4 border-t border-border/50">
                  <span>الإجمالي</span>
                  <span className="text-primary">{total.toFixed(2)} ريال</span>
                </div>
              </div>

              <form onSubmit={handlePromo} className="flex gap-2 mb-8">
                <input 
                  type="text" 
                  placeholder="كود الخصم" 
                  className="flex-1 bg-background border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-primary/50 text-foreground uppercase" 
                />
                <Button type="submit" variant="secondary" className="rounded-xl font-bold">
                  تطبيق
                </Button>
              </form>

              <Button 
                onClick={handleCheckout}
                className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_8px_30px_rgba(124,58,237,0.3)] mb-4"
              >
                إتمام الشراء
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                <ShieldCheck size={16} className="text-success" />
                دفع آمن ومشفر 100%
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
