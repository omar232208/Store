import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useListBlogPosts } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye } from 'lucide-react';

const TAGS = ['الكل', 'ألعاب', 'موسيقى', 'تطبيقات', 'توفير', 'بطاقات'];

export default function BlogPage() {
  const { data: posts, isLoading } = useListBlogPosts();
  const [activeTag, setActiveTag] = useState('الكل');

  const filteredPosts = posts?.filter(p => activeTag === 'الكل' ? true : p.tag === activeTag);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-12 md:py-20 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-background to-background pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              مدونة سورا
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4" />
            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
              أحدث الأخبار، المراجعات، والنصائح حول المنتجات الرقمية والاشتراكات
            </p>
          </div>
        </section>

        {/* Tags */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTag === tag 
                    ? 'bg-primary text-white shadow-[0_4px_20px_rgba(124,58,237,0.3)]' 
                    : 'bg-card border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container mx-auto px-4 pb-16">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-3xl border border-border/50 h-[400px] animate-pulse" />
              ))}
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-card hover:bg-card/80 border border-border/50 hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(124,58,237,0.15)] rounded-3xl overflow-hidden group cursor-pointer h-full flex flex-col transition-all duration-300"
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      {post.coverImage && post.coverImage.length > 3 ? (
                        <img 
                          src={post.coverImage} 
                          alt={post.titleAr} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">📝</div>
                      )}
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-border/50 text-foreground">
                        {post.tag}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {post.titleAr}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                        {post.excerptAr}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          {post.authorAvatar ? (
                            <img src={post.authorAvatar} alt={post.authorName} className="w-8 h-8 rounded-full border border-border" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                              {post.authorName.charAt(0)}
                            </div>
                          )}
                          <span className="text-xs font-bold text-muted-foreground">{post.authorName}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{post.readingMins} د</span>
                          </div>
                          {post.views !== null && post.views !== undefined && (
                            <div className="flex items-center gap-1">
                              <Eye size={12} />
                              <span>{post.views}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-6 opacity-50">📰</div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">لا يوجد مقالات</h2>
              <p className="text-muted-foreground max-w-md">
                لا توجد مقالات تطابق هذا التصنيف حالياً.
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
