import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Zap, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-20 lg:pb-32">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-secondary/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none -z-10 -translate-x-1/3 translate-y-1/4"></div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* Right Content / Text */}
        <div className="w-full lg:flex-1 text-center lg:text-right z-10 flex flex-col items-center lg:items-start order-1 lg:order-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-muted/50 border border-border rounded-full px-4 py-1.5 mb-4 lg:mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            <span className="text-xs lg:text-sm font-medium text-muted-foreground">متجر موثوق 100%</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 lg:mb-6"
          >
            كل ما تحتاجه رقمياً <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">في مكان واحد</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-2xl leading-relaxed font-medium"
          >
            باقات الأغاني، اشتراكات التطبيقات، شحن الألعاب، بطاقات رقمية كلها بأفضل الأسعار وأسرع تسليم.
          </motion.p>

          {/* Badges - Mobile Horizontal Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-center lg:hidden gap-2 mb-6"
          >
            <div className="bg-card border border-border shadow-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-md">
              <Zap size={14} className="text-primary" />
              <span className="font-bold text-[10px] whitespace-nowrap">تسليم فوري</span>
            </div>
            <div className="bg-card border border-border shadow-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-md">
              <DollarSign size={14} className="text-secondary" />
              <span className="font-bold text-[10px] whitespace-nowrap">أسعار تنافسية</span>
            </div>
            <div className="bg-card border border-border shadow-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-md">
              <ShieldCheck size={14} className="text-success" />
              <span className="font-bold text-[10px] whitespace-nowrap">دفع آمن</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4 mb-8 lg:mb-10 w-full sm:w-auto"
          >
            <Button size="lg" className="h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all flex-1 sm:flex-none">
              تسوق الآن
            </Button>
            <Button size="lg" variant="outline" className="h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg rounded-xl border-border hover:bg-muted flex-1 sm:flex-none">
              اكتشف العروض
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-between sm:justify-start gap-4 bg-card/40 border border-border/50 rounded-2xl p-4 backdrop-blur-sm w-full lg:w-auto"
          >
            <div className="flex -space-x-3 space-x-reverse">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden`}>
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=1a1535`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] lg:text-xs font-bold">
                +50K
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-warning mb-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="lg:w-3.5 lg:h-3.5" fill="currentColor" />)}
                <span className="text-foreground font-bold text-xs lg:text-sm mr-2">4.9</span>
              </div>
              <p className="text-[10px] lg:text-xs text-muted-foreground font-medium">+50K عميل راضٍ</p>
            </div>
          </motion.div>
        </div>

        {/* Left Content / Visual */}
        <div className="w-full lg:flex-1 relative h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] perspective-1000 order-2 lg:order-none mt-4 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Central glowing bag placeholder (simplified 3D representation) */}
            <div className="relative w-48 h-56 lg:w-64 lg:h-72 bg-gradient-to-b from-primary/80 to-purple-900/80 rounded-3xl border border-white/20 shadow-[0_0_60px_rgba(124,58,237,0.5)] flex flex-col items-center justify-center transform rotate-y-[-10deg] rotate-x-[5deg] preserve-3d">
              <div className="absolute -top-6 lg:-top-8 w-24 h-12 lg:w-32 lg:h-16 border-4 border-white/30 rounded-t-3xl border-b-0"></div>
              <div className="text-white/80 font-black text-3xl lg:text-4xl tracking-widest drop-shadow-md">SORA</div>
              <div className="w-full h-2 bg-black/20 absolute bottom-4 lg:bottom-6 rounded-full blur-sm"></div>
            </div>

            {/* Floating icons */}
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-4 right-4 lg:top-10 lg:right-10 w-12 h-12 lg:w-16 lg:h-16 bg-[#1DB954] rounded-xl lg:rounded-2xl shadow-lg flex items-center justify-center border border-white/10 rotate-12">
               <span className="text-white font-bold text-lg lg:text-xl">S</span>
            </motion.div>
            <motion.div animate={{ y: [15, -15, 15] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 right-2 lg:bottom-20 lg:right-4 w-14 h-14 lg:w-20 lg:h-20 bg-[#E50914] rounded-xl lg:rounded-2xl shadow-lg flex items-center justify-center border border-white/10 -rotate-6">
               <span className="text-white font-bold text-xl lg:text-2xl">N</span>
            </motion.div>
            <motion.div animate={{ y: [-12, 12, -12] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }} className="absolute top-12 left-2 lg:top-20 lg:left-4 w-10 h-10 lg:w-14 lg:h-14 bg-[#5865F2] rounded-xl lg:rounded-2xl shadow-lg flex items-center justify-center border border-white/10 -rotate-12">
               <span className="text-white font-bold text-lg lg:text-xl">D</span>
            </motion.div>
            <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }} className="absolute bottom-24 left-6 lg:bottom-32 lg:left-10 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-xl lg:rounded-2xl shadow-lg flex items-center justify-center border border-white/10 rotate-12">
               <span className="text-white font-bold text-lg lg:text-xl">I</span>
            </motion.div>
            
          </motion.div>

          {/* Badges - Desktop Sidebar */}
          <div className="hidden lg:flex absolute top-1/4 right-0 lg:-right-10 flex-col gap-4">
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="bg-card border border-border shadow-lg rounded-2xl p-3 flex items-center gap-3 backdrop-blur-md">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Zap size={20} />
              </div>
              <span className="font-bold text-sm">تسليم فوري</span>
            </motion.div>
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="bg-card border border-border shadow-lg rounded-2xl p-3 flex items-center gap-3 backdrop-blur-md translate-x-4">
              <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <span className="font-bold text-sm">أسعار تنافسية</span>
            </motion.div>
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="bg-card border border-border shadow-lg rounded-2xl p-3 flex items-center gap-3 backdrop-blur-md">
              <div className="w-10 h-10 rounded-full bg-success/20 text-success flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <span className="font-bold text-sm">طرق دفع آمنة</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
