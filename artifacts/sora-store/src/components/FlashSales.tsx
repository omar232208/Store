import React, { useState, useEffect } from 'react';
import { useListFlashSaleProducts } from '@workspace/api-client-react';
import { ShoppingCart, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FlashSales() {
  const { data, isLoading } = useListFlashSaleProducts();
  const products = data?.products || [];
  const endsAt = data?.endsAt || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(endsAt).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  const pad = (num: number) => String(num).padStart(2, '0');

  // Fallback data if API returns empty
  const defaultProducts = [
    { id: 1, nameAr: 'اشتراك سبوتيفاي بريميوم', price: 15, originalPrice: 30, discount: 50, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/240px-Spotify_logo_without_text.svg.png', period: 'شهر واحد', rating: 4.9 },
    { id: 2, nameAr: 'اشتراك نتفليكس 4K', price: 35, originalPrice: 60, discount: 41, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png', period: 'شهر واحد', rating: 4.8 },
    { id: 3, nameAr: 'شحن شدات ببجي (660)', price: 30, originalPrice: 45, discount: 33, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/PUBG_Logo_white.svg/320px-PUBG_Logo_white.svg.png', period: '', rating: 4.7 },
    { id: 4, nameAr: 'يوتيوب بريميوم', price: 12, originalPrice: 24, discount: 50, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/320px-YouTube_Logo_2017.svg.png', period: 'شهر واحد', rating: 4.9 },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;
  const isUrl = (s: string) => s && s.length > 2;

  return (
    <div className="bg-card border border-border rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden h-auto sm:h-full flex flex-col">
      {/* Decorative gradient */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            عروض سريعة <span className="text-2xl sm:text-3xl">⚡</span>
          </h2>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold dir-ltr">
          <div className="flex flex-col items-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background border border-border flex items-center justify-center text-primary shadow-inner">
              {pad(timeLeft.seconds)}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-1">ثواني</span>
          </div>
          <span className="text-muted-foreground pb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background border border-border flex items-center justify-center text-primary shadow-inner">
              {pad(timeLeft.minutes)}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-1">دقائق</span>
          </div>
          <span className="text-muted-foreground pb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background border border-border flex items-center justify-center text-primary shadow-inner">
              {pad(timeLeft.hours)}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-1">ساعات</span>
          </div>
          <span className="text-muted-foreground pb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background border border-border flex items-center justify-center text-primary shadow-inner">
              {pad(timeLeft.days)}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-1">أيام</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-background rounded-2xl h-40 sm:h-48 animate-pulse"></div>
          ))
        ) : (
          displayProducts.slice(0, 4).map((product: any) => (
            <div key={product.id} className="group bg-background rounded-2xl p-3 sm:p-4 border border-border hover:border-primary/50 transition-all flex flex-col relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-lg">
                -{product.discount}%
              </div>
              
              <div className="flex justify-center mb-2 sm:mb-3 h-14 sm:h-16 relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-muted/50 flex items-center justify-center text-2xl font-black border border-border/50 shadow-sm overflow-hidden p-2">
                   {isUrl(product.image) ? (
                     <img src={product.image} alt={product.nameAr} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                   ) : (
                     <span className="text-xl sm:text-2xl font-black">{product.image || product.nameAr?.charAt(0)}</span>
                   )}
                </div>
              </div>
              
              <h3 className="font-bold text-xs sm:text-sm text-center mb-1 line-clamp-1 group-hover:text-primary transition-colors">{product.nameAr}</h3>
              {product.period && <p className="text-[9px] sm:text-[10px] text-center text-muted-foreground mb-2">{product.period}</p>}
              
              <div className="mt-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span className="font-black text-base sm:text-lg text-primary">{product.price} <span className="text-[10px] sm:text-xs font-normal">ر.س</span></span>
                <span className="text-[10px] sm:text-xs text-muted-foreground line-through">{product.originalPrice}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 border-t border-border relative z-10">
        <Button variant="outline" className="w-full h-10 sm:h-12 rounded-xl text-primary border-primary/20 hover:bg-primary hover:text-white transition-all text-sm sm:text-base">
          عرض كل العروض
        </Button>
      </div>
    </div>
  );
}
