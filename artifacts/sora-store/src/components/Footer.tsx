import React from 'react';
import { Link } from 'wouter';
import { ShoppingBasket, Lock, RefreshCw, Zap } from 'lucide-react';
import { SiVisa, SiMastercard, SiApplepay, SiGooglepay, SiPaypal } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-12 md:pt-16 pb-8 mt-8 md:mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12 border-b border-border/50 pb-8 md:pb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4 md:gap-6 w-full col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white shadow-lg">
                <ShoppingBasket size={20} className="md:w-6 md:h-6" />
              </div>
              <span className="font-black text-xl md:text-2xl tracking-tight text-white">Sora Store</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              الوجهة الأولى للمنتجات الرقمية في العالم العربي. نوفر لك أفضل الاشتراكات والبطاقات بأفضل الأسعار وأسرع طرق التسليم مع ضمان الموثوقية.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12 col-span-1 md:col-span-2 lg:col-span-2">
            {/* Links Col 1 */}
            <div>
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-foreground">روابط سريعة</h4>
              <ul className="flex flex-col gap-3 md:gap-4 text-xs md:text-sm font-medium text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
                <li><Link href="/categories" className="hover:text-primary transition-colors">كل الأقسام</Link></li>
                <li><Link href="/offers" className="hover:text-primary transition-colors">عروض اليوم</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">المدونة التقنية</Link></li>
              </ul>
            </div>

            {/* Links Col 2 */}
            <div>
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-foreground">المساعدة</h4>
              <ul className="flex flex-col gap-3 md:gap-4 text-xs md:text-sm font-medium text-muted-foreground">
                <li><Link href="/faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
                <li><Link href="/track" className="hover:text-primary transition-colors">تتبع الطلب</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                <li><Link href="/refund" className="hover:text-primary transition-colors">سياسة الاسترجاع</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Col */}
          <div className="col-span-1">
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-foreground">تواصل معنا</h4>
            <ul className="flex flex-col gap-3 md:gap-4 text-xs md:text-sm font-medium text-muted-foreground">
              <li><a href="mailto:support@sorastore.com" className="hover:text-primary transition-colors dir-ltr block text-right">support@sorastore.com</a></li>
              <li><a href="tel:+966500000000" className="hover:text-primary transition-colors dir-ltr block text-right">+966 50 000 0000</a></li>
              <li className="mt-2">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:text-primary cursor-pointer transition-colors">𝕏</div>
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:text-primary cursor-pointer transition-colors">in</div>
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:text-primary cursor-pointer transition-colors">IG</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges & Payments */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-8 mb-6 md:mb-8">
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2">
              <Lock size={16} className="text-success shrink-0" />
              <span className="text-[10px] md:text-xs font-bold text-muted-foreground">تشفير آمن 100%</span>
            </div>
            <div className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2">
              <RefreshCw size={16} className="text-primary shrink-0" />
              <span className="text-[10px] md:text-xs font-bold text-muted-foreground">ضمان استرداد خلال 7 أيام</span>
            </div>
            <div className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2">
              <Zap size={16} className="text-warning shrink-0" />
              <span className="text-[10px] md:text-xs font-bold text-muted-foreground">تسليم فوري على مدار الساعة</span>
            </div>
          </div>

          <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all flex-wrap justify-center">
            <SiVisa className="w-6 h-6 md:w-8 md:h-8" />
            <SiMastercard className="w-6 h-6 md:w-8 md:h-8" />
            <SiApplepay className="w-8 h-8 md:w-10 md:h-10" />
            <SiGooglepay className="w-8 h-8 md:w-10 md:h-10" />
            <SiPaypal className="w-5 h-5 md:w-6 md:h-6" />
            <div className="font-bold text-[10px] md:text-xs border border-current px-1.5 md:px-2 py-1 rounded">mada</div>
            <div className="font-bold text-[10px] md:text-xs border border-current px-1.5 md:px-2 py-1 rounded">STC Pay</div>
            <div className="font-bold text-[8px] md:text-[10px] border border-current px-1.5 md:px-2 py-1 rounded leading-none text-center">حوالة<br/>بنكية</div>
          </div>

        </div>

        <div className="text-center text-[10px] md:text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sora Store. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
