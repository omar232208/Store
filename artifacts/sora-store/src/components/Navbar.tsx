import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Heart, ShoppingBag, User, Moon, ShoppingBasket, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const handleSearchClick = () => {
    setLocation('/search');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <ShoppingBasket size={20} className="md:w-6 md:h-6" />
            </div>
            <span className="font-black text-lg md:text-xl tracking-tight text-white">Sora Store</span>
          </Link>

          {/* Desktop Search */}
          <div className="flex-1 max-w-xl hidden lg:flex items-center relative mx-8" onClick={handleSearchClick}>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="ابحث عن بطاقات، اشتراكات، ألعاب..."
              readOnly
              className="w-full bg-muted/50 border border-border rounded-full h-12 pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground text-foreground cursor-pointer"
            />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm">
            <Link href="/" className="text-primary hover:text-primary transition-colors">الرئيسية</Link>
            <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">الأقسام</Link>
            <Link href="/offers" className="text-muted-foreground hover:text-foreground transition-colors">العروض</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">المدونة</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">تواصل</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="hidden sm:flex w-10 h-10 rounded-full hover:bg-muted items-center justify-center text-muted-foreground transition-colors">
              <Moon size={20} />
            </button>
            <button className="lg:hidden flex w-10 h-10 rounded-full hover:bg-muted items-center justify-center text-muted-foreground transition-colors" onClick={handleSearchClick}>
              <Search size={20} />
            </button>
            <Link href="/wishlist" className="relative flex w-10 h-10 rounded-full hover:bg-muted items-center justify-center text-muted-foreground transition-colors">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>}
            </Link>
            <Link href="/cart" className="relative flex w-10 h-10 rounded-full hover:bg-muted items-center justify-center text-muted-foreground transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
            </Link>
            
            <Link href="/contact" className="hidden sm:flex items-center gap-2 border-r border-border pr-4 mr-2">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <User size={20} className="text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">مرحباً بك</span>
                <span className="text-sm font-bold">حسابي</span>
              </div>
            </Link>

            <Button variant="ghost" size="icon" className="lg:hidden ml-1 text-foreground" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full bg-card w-full max-w-md shadow-2xl border-l border-border">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white">
                <ShoppingBasket size={18} />
              </div>
              <span className="font-black text-lg text-white">Sora Store</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </Button>
          </div>

          <div className="p-4">
            <div className="relative mb-6" onClick={() => { setIsMobileMenuOpen(false); handleSearchClick(); }}>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن بطاقات، اشتراكات، ألعاب..."
                readOnly
                className="w-full bg-muted/50 border border-border rounded-full h-12 pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground text-foreground cursor-pointer"
              />
            </div>

            <nav className="flex flex-col gap-4 text-lg font-bold">
              <Link href="/" className="text-primary p-2 hover:bg-muted rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>الرئيسية</Link>
              <Link href="/categories" className="text-foreground p-2 hover:bg-muted rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>الأقسام</Link>
              <Link href="/offers" className="text-foreground p-2 hover:bg-muted rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>العروض</Link>
              <Link href="/blog" className="text-foreground p-2 hover:bg-muted rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>المدونة</Link>
              <Link href="/contact" className="text-foreground p-2 hover:bg-muted rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>تواصل معنا</Link>
            </nav>
          </div>
          
          <div className="mt-auto p-4 border-t border-border">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                 <User size={24} className="text-muted-foreground" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm text-muted-foreground">تسجيل الدخول</span>
                 <span className="text-base font-bold">إدارة حسابك</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
