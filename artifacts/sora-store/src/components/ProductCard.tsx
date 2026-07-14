import React from 'react';
import { useLocation } from 'wouter';
import { Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@workspace/api-client-react/src/generated/api.schemas';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  const handleCardClick = () => {
    setLocation(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-card rounded-2xl border border-border/50 hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(124,58,237,0.15)] transition-all duration-300 overflow-hidden cursor-pointer h-full"
    >
      {/* Top Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
        <div className="flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-warning text-warning-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              الأكثر مبيعاً
            </span>
          )}
          {product.isFlashSale && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
              عرض محدود
            </span>
          )}
          {product.badge && !product.isBestSeller && !product.isFlashSale && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              -{product.discount}%
            </span>
          )}
        </div>
        <button
          onClick={handleToggleWishlist}
          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            wishlisted
              ? 'bg-secondary/20 text-secondary hover:bg-secondary/30'
              : 'bg-background/40 text-muted-foreground hover:bg-background/60 hover:text-foreground'
          }`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Image Area */}
      <div className="w-full pt-8 pb-4 flex justify-center items-center relative overflow-hidden bg-gradient-to-b from-transparent to-card/50">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl mix-blend-overlay"></div>
        {product.image && product.image.length > 3 ? (
          <img
            src={product.image}
            alt={product.nameAr}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
          />
        ) : (
          <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center bg-muted rounded-2xl text-4xl font-bold text-muted-foreground group-hover:scale-110 transition-transform duration-500">
            {product.nameAr.charAt(0)}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-md border border-primary/20">
            {product.categorySlug}
          </span>
          <div className="flex items-center gap-1 text-warning bg-warning/10 px-1.5 py-0.5 rounded-md">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold mt-0.5">{product.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug mt-1 min-h-[2.5rem]">
          {product.nameAr}
        </h3>
        
        {product.period && (
          <p className="text-xs text-muted-foreground font-medium">
            {product.period}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through decoration-destructive/50">
                {product.originalPrice.toFixed(2)} {product.currency}
              </span>
            )}
            <div className="flex items-baseline gap-1 text-primary">
              <span className="font-black text-lg sm:text-xl leading-none">
                {product.price.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold uppercase">{product.currency}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 transition-all font-bold text-xs sm:text-sm group-hover:shadow-[0_4px_15px_rgba(124,58,237,0.3)]"
        >
          أضف للسلة
        </Button>
      </div>
    </div>
  );
}
