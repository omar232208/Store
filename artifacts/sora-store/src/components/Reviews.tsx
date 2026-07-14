import React from 'react';
import { useListReviews } from '@workspace/api-client-react';
import { Star } from 'lucide-react';

export default function Reviews() {
  const { data: reviews, isLoading } = useListReviews();

  const defaultReviews = [
    { id: 1, authorName: 'أحمد الشمري', rating: 5, text: 'أفضل متجر تعاملت معه! التسليم فوري والأسعار ممتازة جداً مقارنة بالسوق. خدمة العملاء متجاوبين وسريعين.', emoji: '🚀' },
    { id: 2, authorName: 'سارة القحطاني', rating: 5, text: 'شريت اشتراك نتفليكس ووصلني الكود في ثواني. الموقع مرتب وسهل الاستخدام. أكيد راح أرجع أشتري منكم.', emoji: '✨' },
    { id: 3, authorName: 'محمد العتيبي', rating: 4, text: 'أسعار خرافية وموثوقية عالية. جربت أكثر من موقع وهذا الأفضل بدون منازع في سرعة التنفيذ.', emoji: '💯' },
    { id: 4, authorName: 'نورة العبدالله', rating: 5, text: 'تجربة رائعة! الدفع آمن وكل شيء واضح. حبيت كيف المتجر منظم وتلقى اللي تبيه بسرعة.', emoji: '🤍' },
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : defaultReviews;

  return (
    <section className="py-12 md:py-16 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold relative inline-block">
            ما يقوله عملاؤنا
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-primary rounded-full"></div>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-2xl mx-auto">آراء وتجارب عملائنا الذين وثقوا بخدماتنا</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-3xl p-5 md:p-6 h-40 md:h-48 animate-pulse"></div>
            ))
          ) : (
            displayReviews.slice(0, 4).map((review: any) => (
              <div key={review.id} className="bg-card border border-border hover:border-primary/30 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl transition-all flex flex-col relative group">
                {review.emoji && (
                  <div className="absolute top-3 left-4 md:top-4 md:left-4 text-xl md:text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {review.emoji}
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border shrink-0">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${review.authorName}&backgroundColor=1a1535`} alt={review.authorName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-foreground">{review.authorName}</h4>
                    <div className="flex items-center text-warning mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} className="md:w-3 md:h-3" fill={i < review.rating ? "currentColor" : "none"} color={i < review.rating ? "currentColor" : "var(--muted-foreground)"} opacity={i < review.rating ? 1 : 0.3} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1 italic">
                  "{review.text}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
