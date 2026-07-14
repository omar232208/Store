import React, { useRef } from 'react';
import { useListCategories } from '@workspace/api-client-react';
import { ChevronRight, ChevronLeft, Music, MonitorPlay, Gamepad2, CreditCard, Smartphone } from 'lucide-react';

export default function Categories() {
  const { data: categories, isLoading } = useListCategories();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'music': return <Music size={28} className="text-white" />;
      case 'apps': return <MonitorPlay size={28} className="text-white" />;
      case 'games': return <Gamepad2 size={28} className="text-white" />;
      case 'cards': return <CreditCard size={28} className="text-white" />;
      case 'mobile': return <Smartphone size={28} className="text-white" />;
      default: return <CreditCard size={28} className="text-white" />;
    }
  };

  const getBrandIcons = (slug: string) => {
    switch (slug) {
      case 'music':
        return (
          <>
            <div className="w-6 h-6 rounded-full bg-[#1DB954] flex items-center justify-center text-[10px] font-bold text-white border border-border">S</div>
            <div className="w-6 h-6 rounded-full bg-[#E50050] flex items-center justify-center text-[10px] font-bold text-white border border-border">A</div>
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-black border border-border">♪</div>
          </>
        );
      case 'apps':
        return (
          <>
            <div className="w-6 h-6 rounded-full bg-[#E50914] flex items-center justify-center text-[10px] font-bold text-white border border-border">N</div>
            <div className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center text-[10px] font-bold text-white border border-border">Y</div>
            <div className="w-6 h-6 rounded-full bg-[#00C4CC] flex items-center justify-center text-[10px] font-bold text-white border border-border">C</div>
          </>
        );
      case 'games':
        return (
          <>
            <div className="w-6 h-6 rounded-full bg-[#F4A81E] flex items-center justify-center text-[10px] font-bold text-white border border-border">P</div>
            <div className="w-6 h-6 rounded-full bg-[#003791] flex items-center justify-center text-[10px] font-bold text-white border border-border">P</div>
            <div className="w-6 h-6 rounded-full bg-[#171A21] flex items-center justify-center text-[10px] font-bold text-white border border-border">S</div>
          </>
        );
      case 'cards':
        return (
          <>
            <div className="w-6 h-6 rounded-full bg-[#FF9900] flex items-center justify-center text-[10px] font-bold text-white border border-border">A</div>
            <div className="w-6 h-6 rounded-full bg-[#34A853] flex items-center justify-center text-[10px] font-bold text-white border border-border">G</div>
            <div className="w-6 h-6 rounded-full bg-[#A2AAAD] flex items-center justify-center text-[10px] font-bold text-white border border-border">A</div>
          </>
        );
      case 'mobile':
        return (
          <>
            <div className="w-6 h-6 rounded-full bg-[#4F008C] flex items-center justify-center text-[10px] font-bold text-white border border-border">S</div>
            <div className="w-6 h-6 rounded-full bg-[#E3000F] flex items-center justify-center text-[10px] font-bold text-white border border-border">Z</div>
            <div className="w-6 h-6 rounded-full bg-[#00893A] flex items-center justify-center text-[10px] font-bold text-white border border-border">M</div>
          </>
        );
      default:
        return null;
    }
  };

  const defaultCategories = [
    { slug: 'music', nameAr: 'باقات الأغاني', color: 'from-purple-600 to-pink-500' },
    { slug: 'apps', nameAr: 'اشتراكات التطبيقات', color: 'from-blue-600 to-teal-400' },
    { slug: 'games', nameAr: 'شحن الألعاب', color: 'from-blue-700 to-indigo-500' },
    { slug: 'cards', nameAr: 'بطاقات رقمية', color: 'from-orange-500 to-yellow-400' },
    { slug: 'mobile', nameAr: 'شحن الجوال', color: 'from-emerald-500 to-teal-400' },
  ];

  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-muted/20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold relative inline-block">
              الأقسام الرئيسية
              <div className="absolute -bottom-2 right-0 w-12 md:w-16 h-1 bg-warning rounded-full"></div>
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => scroll('right')} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors text-foreground">
              <ChevronRight size={18} className="md:w-5 md:h-5" />
            </button>
            <button onClick={() => scroll('left')} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors text-foreground">
              <ChevronLeft size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Scroll fade masks */}
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar relative"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {isLoading ? (
              // Skeletons
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] h-32 md:h-36 rounded-2xl bg-card border border-border animate-pulse snap-start shrink-0"></div>
              ))
            ) : (
              displayCategories.map((category: any, i) => (
                <div 
                  key={category.slug || i} 
                  className="group min-w-[200px] sm:min-w-[240px] md:min-w-[280px] rounded-2xl bg-card border border-border overflow-hidden cursor-pointer hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] transition-all snap-start shrink-0 flex flex-col p-4 md:p-5 relative"
                >
                  <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-r ${category.color || 'from-primary to-purple-400'}`}></div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.color || 'from-primary to-purple-400'} shadow-lg`}>
                      {getIcon(category.slug)}
                    </div>
                    {/* Brand icons */}
                    <div className="flex -space-x-2 space-x-reverse opacity-70 group-hover:opacity-100 transition-opacity">
                      {getBrandIcons(category.slug)}
                    </div>
                  </div>

                  <h3 className="font-bold text-base md:text-lg mb-1">{category.nameAr}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">المزيد +</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
}
