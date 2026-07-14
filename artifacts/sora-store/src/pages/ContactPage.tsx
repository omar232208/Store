import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('تم إرسال رسالتك! سنتواصل معك خلال 24 ساعة');
    e.currentTarget.reset();
  };

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
              تواصل معنا
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-4" />
            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
              نحن هنا لمساعدتك! فريق الدعم متاح على مدار الساعة للإجابة على استفساراتك وحل مشاكلك.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            
            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-3/5 bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-8">أرسل لنا رسالة</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-muted-foreground">الاسم الكامل</label>
                    <input required type="text" className="bg-background border border-border rounded-xl h-12 px-4 focus:outline-none focus:border-primary transition-colors text-foreground" placeholder="محمد أحمد" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-muted-foreground">رقم الهاتف</label>
                    <input required type="tel" dir="ltr" className="bg-background border border-border rounded-xl h-12 px-4 focus:outline-none focus:border-primary transition-colors text-foreground text-right" placeholder="+966 5X XXX XXXX" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground">البريد الإلكتروني</label>
                  <input required type="email" dir="ltr" className="bg-background border border-border rounded-xl h-12 px-4 focus:outline-none focus:border-primary transition-colors text-foreground text-right" placeholder="name@example.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground">الموضوع</label>
                  <select required className="bg-background border border-border rounded-xl h-12 px-4 focus:outline-none focus:border-primary transition-colors text-foreground appearance-none">
                    <option value="">اختر الموضوع</option>
                    <option value="استفسار عام">استفسار عام</option>
                    <option value="مشكلة في طلب">مشكلة في طلب</option>
                    <option value="اقتراح">اقتراح</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground">الرسالة</label>
                  <textarea required rows={5} className="bg-background border border-border rounded-xl p-4 focus:outline-none focus:border-primary transition-colors text-foreground resize-none" placeholder="اكتب رسالتك هنا..."></textarea>
                </div>

                <Button type="submit" size="lg" className="h-14 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-[0_8px_30px_rgba(124,58,237,0.3)] mt-2">
                  <Send size={20} className="mr-2 rotate-180" /> إرسال الرسالة
                </Button>
              </form>
            </motion.div>

            {/* Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-2/5 flex flex-col gap-6"
            >
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-lg flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">دعم واتساب</h3>
                <p className="text-muted-foreground text-sm mb-6">تحدث معنا مباشرة عبر الواتساب للحصول على استجابة فورية</p>
                <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold h-12 rounded-xl">
                  تحدث معنا الآن
                </Button>
              </div>

              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-lg flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-muted-foreground text-sm mb-1">البريد الإلكتروني</h4>
                    <a href="mailto:support@sorastore.com" className="font-bold text-lg hover:text-primary transition-colors dir-ltr block">support@sorastore.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-muted-foreground text-sm mb-1">رقم الهاتف</h4>
                    <a href="tel:+966500000000" className="font-bold text-lg hover:text-primary transition-colors dir-ltr block">+966 50 000 0000</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-muted-foreground text-sm mb-1">المقر الرئيسي</h4>
                    <p className="font-bold text-lg leading-snug">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-auto">
                <a href="#" className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm font-bold text-xl">𝕏</a>
                <a href="#" className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-foreground hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-sm font-bold text-xl">IG</a>
                <a href="#" className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-foreground hover:bg-warning hover:text-white hover:border-warning transition-all shadow-sm font-bold text-xl">SC</a>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
