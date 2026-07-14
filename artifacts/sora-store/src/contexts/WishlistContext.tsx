import React, { createContext, useContext, useEffect, useState } from 'react';

type WishlistContextValue = {
  ids: number[];
  toggle: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('sora_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sora_wishlist', JSON.stringify(ids));
  }, [ids]);

  const toggle = (id: number) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id: number) => ids.includes(id);

  const count = ids.length;

  return (
    <WishlistContext.Provider value={{ ids, toggle, isWishlisted, count }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
