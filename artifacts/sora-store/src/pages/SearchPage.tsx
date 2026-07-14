import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useSearchProducts, useListCategories } from '@workspace/api-client-react';
import { useSearch, useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialQ = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQ);
  const [debouncedQ, setDebouncedQ] = useState(initialQ);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQ(query);
      if (query) {
        setLocation(`/search?q=${encodeURIComponent(query)}`);
      } else {
        setLocation('/search');
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, setLocation]);

  const { data: results, isLoading: loadingResults } = useSearchProducts(
    { q: debouncedQ },
    { query: { enabled: debouncedQ.length > 0 } }
  );

  const { data: categories } = useListCategories({ query: { enabled: debouncedQ.length === 0 } });

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        
        {/* Search Input Section */}
        <section className="bg-card border-b border-border/50 py-8 md:py-12 sticky top-[64px] md:top-[80px] z-40 shadow-sm">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="relative">
              <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                <SearchIcon className="h-6 w-6 text-primary" />
              </div>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن بطاقات، اشتراكات، ألعاب..."
                className="w-full bg-background border-2 border-border/50 rounded-full h-16 md:h-20 pr-16 pl-16 text-lg md:text-xl font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-muted-foreground placeholder:font-normal text-foreground shadow-inner"
              />
              {query && (
                <button 
                  onClick={handleClear}
                  className="absolute inset-y-0 left-6 flex items-center justify-center w-8 h-8 self-center rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          {!debouncedQ ? (
            // No Query: Suggested Categories
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-muted-foreground mb-6">الأقسام المقترحة</h3>
              <div className="flex flex-wrap gap-3">
                {categories?.map((cat) => (
                  <Link key={cat.id} href={`/categories/${cat.slug}`}>
                    <div className="bg-card hover:bg-primary/10 border border-border/50 hover:border-primary/30 px-6 py-3 rounded-2xl flex items-center gap-3 cursor-pointer transition-colors group">
                      <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="font-bold">{cat.nameAr}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : loadingResults ? (
            // Loading
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 h-[320px] animate-pulse" />
              ))}
            </div>
          ) : results && results.length > 0 ? (
            // Results found
            <div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-2 text-foreground">
                نتائج البحث عن "<span className="text-primary">{debouncedQ}</span>"
                <span className="text-sm font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full mr-auto">
                  {results.length} نتيجة
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {results.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            // No results
            <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
              <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center mb-6">
                <SearchIcon size={48} className="text-muted-foreground opacity-50" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">لا توجد نتائج</h2>
              <p className="text-muted-foreground text-lg">
                لم نتمكن من العثور على أية منتجات تطابق "{debouncedQ}". يرجى التحقق من الإملاء أو تجربة كلمات مختلفة.
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
