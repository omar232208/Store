import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useGetBlogPost, useListBlogPosts } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Calendar, Eye, Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data: post, isLoading } = useGetBlogPost(slug || '');
  const { data: relatedPosts } = useListBlogPosts({ limit: 3 });

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 animate-pulse">
           <div className="h-[40vh] bg-muted w-full" />
           <div className="container mx-auto px-4 py-12 max-w-3xl">
             <div className="h-10 bg-muted rounded-xl w-3/4 mb-8" />
             <div className="h-6 bg-muted rounded-xl w-1/4 mb-12" />
             <div className="space-y-4">
               <div className="h-4 bg-muted rounded w-full" />
               <div className="h-4 bg-muted rounded w-full" />
               <div className="h-4 bg-muted rounded w-5/6" />
             </div>
           </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('تم نسخ الرابط بنجاح');
  };

  // Convert content newlines to paragraphs
  const paragraphs = post.contentAr.split('\n').filter(p => p.trim().length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        {/* Cover & Title */}
        <section className="relative h-[40vh] md:h-[50vh] min-h-[300px] flex items-end pb-12">
          {post.coverImage && (
            <div className="absolute inset-0 z-0">
              <img src={post.coverImage} alt={post.titleAr} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>
          )}
          <div className="container mx-auto px-4 relative z-10">
             {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/blog" className="lg:hidden flex items-center hover:text-foreground">
                <ChevronRight size={18} />
              </Link>
              <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">المدونة</Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{post.titleAr}</span>
            </div>

            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block shadow-lg">
              {post.tag}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl">
              {post.titleAr}
            </h1>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-4xl -mt-8 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-2xl mb-12"
          >
            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                {post.authorAvatar ? (
                  <img src={post.authorAvatar} alt={post.authorName} className="w-12 h-12 rounded-full border-2 border-primary" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg border-2 border-primary/50">
                    {post.authorName.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-bold text-foreground">{post.authorName}</span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString('ar-SA')}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readingMins} دقائق قراءة</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Share2 size={16} />
                </button>
                <button onClick={handleCopyLink} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none text-muted-foreground leading-loose text-lg font-medium">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="mb-6">{p}</p>
              ))}
            </div>
          </motion.div>

          {/* Read More */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-black text-white mb-6">مقالات أخرى</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.filter(p => p.id !== post.id).slice(0,3).map(related => (
                  <Link key={related.id} href={`/blog/${related.slug}`}>
                    <div className="bg-card hover:bg-muted border border-border/50 rounded-2xl overflow-hidden cursor-pointer transition-colors flex flex-col h-full group">
                      {related.coverImage && (
                        <div className="h-32 overflow-hidden">
                          <img src={related.coverImage} alt={related.titleAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      )}
                      <div className="p-4 flex flex-col flex-1">
                        <span className="text-[10px] text-primary font-bold mb-2">{related.tag}</span>
                        <h4 className="font-bold text-sm line-clamp-2">{related.titleAr}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
