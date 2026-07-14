import React from 'react';
import { Link } from 'wouter';
import { Home, Grid, Tag, Heart, User } from 'lucide-react';

export default function MobileBottomNav() {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden pb-safe"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
    >
      <div className="flex items-center justify-between px-2 h-16">
        <Link href="/" className="flex flex-col items-center justify-center w-1/5 h-full gap-1 group">
          <div className="relative flex flex-col items-center text-primary">
            <Home size={22} className="mb-1" />
            <span className="text-[10px] font-bold">الرئيسية</span>
            <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary" />
          </div>
        </Link>
        <Link href="/categories" className="flex flex-col items-center justify-center w-1/5 h-full gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <Grid size={22} className="mb-1" />
          <span className="text-[10px] font-medium">الأقسام</span>
        </Link>
        <Link href="/offers" className="flex flex-col items-center justify-center w-1/5 h-full gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <Tag size={22} className="mb-1" />
          <span className="text-[10px] font-medium">العروض</span>
        </Link>
        <Link href="/wishlist" className="flex flex-col items-center justify-center w-1/5 h-full gap-1 text-muted-foreground hover:text-foreground transition-colors relative">
          <div className="relative">
            <Heart size={22} className="mb-1" />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-secondary text-white text-[8px] font-bold rounded-full flex items-center justify-center">0</span>
          </div>
          <span className="text-[10px] font-medium">المفضلة</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center justify-center w-1/5 h-full gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <User size={22} className="mb-1" />
          <span className="text-[10px] font-medium">حسابي</span>
        </Link>
      </div>
    </div>
  );
}
