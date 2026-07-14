import React from 'react';
import { useGetStoreStats } from '@workspace/api-client-react';
import { Users, ShoppingBag, Package, HeadphonesIcon } from 'lucide-react';

export default function StatsBar() {
  const { data: stats, isLoading } = useGetStoreStats();

  const defaultStats = [
    { id: 1, value: '+50K', label: 'عميل سعيد', icon: <Users className="text-primary w-6 h-6 md:w-7 md:h-7" /> },
    { id: 2, value: '+10K', label: 'طلب مكتمل', icon: <ShoppingBag className="text-secondary w-6 h-6 md:w-7 md:h-7" /> },
    { id: 3, value: '+200', label: 'منتج وخدمة', icon: <Package className="text-warning w-6 h-6 md:w-7 md:h-7" /> },
    { id: 4, value: '24/7', label: 'دعم فني', icon: <HeadphonesIcon className="text-success w-6 h-6 md:w-7 md:h-7" /> },
  ];

  // Try to use API data if available, mapping to our format
  const displayStats = stats ? [
    { id: 1, value: stats.customers, label: 'عميل سعيد', icon: <Users className="text-primary w-6 h-6 md:w-7 md:h-7" /> },
    { id: 2, value: stats.orders, label: 'طلب مكتمل', icon: <ShoppingBag className="text-secondary w-6 h-6 md:w-7 md:h-7" /> },
    { id: 3, value: stats.products, label: 'منتج وخدمة', icon: <Package className="text-warning w-6 h-6 md:w-7 md:h-7" /> },
    { id: 4, value: stats.supportHours, label: 'دعم فني', icon: <HeadphonesIcon className="text-success w-6 h-6 md:w-7 md:h-7" /> },
  ] : defaultStats;

  return (
    <div className="container mx-auto px-4 py-8 md:-mt-8 relative z-20">
      <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl md:shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative overflow-hidden backdrop-blur-xl">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>

        {displayStats.map((stat, i) => (
          <div key={stat.id} className="flex flex-col md:flex-row items-center justify-center text-center md:text-right gap-3 md:gap-4 relative">
            {/* Divider for larger screens */}
            {i !== 0 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border/50"></div>
            )}
            
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center shadow-inner shrink-0">
              {stat.icon}
            </div>
            <div>
              <div className="text-xl md:text-2xl lg:text-3xl font-black text-foreground">{stat.value}</div>
              <div className="text-xs md:text-sm font-medium text-muted-foreground mt-1 md:mt-0">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
