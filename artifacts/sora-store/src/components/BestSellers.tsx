import React from 'react';
import { useListBestSellers } from '@workspace/api-client-react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BestSellers() {
  const { data: products, isLoading } = useListBestSellers();

  const defaultProducts = [
    { id: 1, rank: 1, nameAr: 'اشتراك سبوتيفاي بريميوم', price: 15, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/240px-Spotify_logo_without_text.svg.png', period: 'شهر واحد', rating: 4.9, reviewCount: 1250 },
    { id: 2, rank: 2, nameAr: 'اشتراك نتفليكس 4K', price: 35, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png', period: 'شهر واحد', rating: 4.8, reviewCount: 840 },
    { id: 3, rank: 3, nameAr: 'شحن شدات ببجي (660)', price: 30, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/PUBG_Logo_white.svg/320px-PUBG_Logo_white.svg.png', period: '', rating: 4.7, reviewCount: 2300 },
    { id: 4, rank: 4, nameAr: 'اشتراك ديزني بلس', price: 20, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/320px-Disney%2B_logo.svg.png', period: 'شهر واحد', rating: 4.6, reviewCount: 420 },
  ];

  const displayProducts = products && products.length > 0 ? products : defaultProducts;
  const isUrl = (s: string) => s && s.length > 2;

  return (
    <div className="bg-transparent h-auto sm:h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          الأكثر مبيعاً <span className="text-2xl sm:text-3xl">🔥</span>
        </h2>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white text-xs sm:text-sm">
            عرض الكل
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 flex-1">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl h-20 sm:h-24 animate-pulse"></div>
          ))
        ) : (
          displayProducts.slice(0, 4).map((product: any, index: number) => (
            <div key={product.id} className="group bg-card border border-border hover:border-primary/40 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-all hover:bg-muted/30 relative">
              <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-bl from-primary/90 to-primary/40 rounded-tr-2xl rounded-bl-2xl flex items-start justify-end p-1.5 sm:p-2 z-10 shadow-sm border-l border-b border-primary/20">
                <span className="text-xs sm:text-sm font-black text-white leading-none drop-shadow-md">{product.rank || index + 1}</span>
              </div>

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-background/50 flex items-center justify-center text-2xl font-black border border-border/50 shrink-0 shadow-sm p-2 overflow-hidden">
                {isUrl(product.image) ? (
                  <img src={product.image} alt={product.nameAr} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                ) : (
                  <span className="text-xl sm:text-2xl font-black">{product.image || product.nameAr?.charAt(0)}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="font-bold text-xs sm:text-sm text-foreground mb-1 line-clamp-1">{product.nameAr}</h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-muted-foreground mb-1">
                  {product.period && <span>{product.period}</span>}
                  {product.period && <span>•</span>}
                  <div className="flex items-center text-warning">
                    <Star size={10} fill="currentColor" className="sm:w-3 sm:h-3" />
                    <span className="mr-1 text-foreground font-medium">{product.rating}</span>
                    <span className="mr-1 text-muted-foreground">({product.reviewCount})</span>
                  </div>
                </div>
                <div className="font-black text-primary text-xs sm:text-sm">
                  {product.price} <span className="text-[9px] sm:text-[10px] font-normal">ر.س</span>
                </div>
              </div>

              <Button size="icon" className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white border-none shadow-none">
                <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
