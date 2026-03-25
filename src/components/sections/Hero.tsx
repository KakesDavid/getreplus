"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [dots, setDots] = useState<{ left: string; top: string; delay: string }[]>([]);

  useEffect(() => {
    setIsVisible(true);
    const generatedDots = Array.from({ length: 12 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
    setDots(generatedDots);
  }, []);

  return (
    <section className="relative min-h-svh hero-gradient pt-[80px] lg:pt-0 flex flex-col items-center justify-center overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Local floating dots (Desktop only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-20 animate-pulse"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 z-10 w-full">
        {/* Left Content */}
        <div className="flex flex-col items-start text-left pt-10 lg:pt-0">
          {/* Badge */}
          <div 
            className={cn(
              "inline-flex items-center gap-2 bg-emerald/55 backdrop-blur-md border border-gold/35 rounded-full px-4 py-2 transition-all duration-500",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
            )}
          >
            <span className="text-base animate-bounce">🇳🇬</span>
            <span className="text-xs lg:text-sm font-medium text-gold font-body">Trusted by 12,400+ Nigerians</span>
          </div>

          {/* Headline - Staggered lines */}
          <h1 className="mt-6 font-headline font-bold text-[38px] lg:text-[56px] leading-[1.1] lg:leading-[1.08] text-ivory">
            <span className={cn("block transition-all duration-500 delay-150", isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              Refer 5 Friends.
            </span>
            <span className={cn("block transition-all duration-500 delay-[250ms]", isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              Earn Real Money.
            </span>
            <span className={cn("block text-shimmer transition-all duration-500 delay-[350ms]", isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              Collect Every Friday.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className={cn(
            "mt-6 text-ivory/90 text-[15px] lg:text-[17px] leading-relaxed max-w-[460px] font-body transition-all duration-500 delay-[450ms]",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            Activate your account. Share your link. When 5 friends join, your money is ready. Straight to your Nigerian bank every Friday.
          </p>

          {/* Earnings Card */}
          <div className={cn(
            "mt-8 inline-flex flex-row bg-obsidian/72 backdrop-blur-md border border-gold/22 rounded-2xl p-4 lg:p-6 transition-all duration-500 delay-[550ms]",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <div className="pr-4 lg:pr-8 border-r border-gold/20">
              <span className="block text-[10px] lg:text-[11px] font-medium text-ivory/80 tracking-widest uppercase">Standard</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl lg:text-28 font-code font-bold text-gold">₦2,500</span>
                <span className="text-[10px] lg:text-[12px] text-ivory/70 font-body">/cycle</span>
              </div>
            </div>
            <div className="pl-4 lg:pl-8">
              <span className="block text-[10px] lg:text-[11px] font-medium text-ivory/80 tracking-widest uppercase">Premium</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl lg:text-34 font-code font-bold text-gold">₦7,500</span>
                <span className="text-[10px] lg:text-[12px] text-ivory/70 font-body">/cycle</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className={cn(
            "mt-10 flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto transition-all duration-500 delay-[650ms]",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <Link href="/signup" className="w-full sm:w-auto">
              <Button className="w-full gold-gradient text-obsidian font-headline font-bold h-[52px] px-8 rounded-xl text-base shadow-[0_6px_24px_rgba(183,134,44,0.4)] hover:brightness-110 active:scale-95 transition-all">
                Sign Up Free — Pay to Activate
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-ivory/28 text-ivory h-[52px] px-8 rounded-xl text-[15px] font-medium hover:border-gold hover:text-gold transition-all"
            >
              See How It Works ↓
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className={cn(
            "mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 transition-all duration-500 delay-[750ms]",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <div className="flex items-center gap-2 text-ivory/85 text-xs">
              <ShieldCheck size={14} className="text-gold" />
              <span>Paystack Secured</span>
            </div>
            <div className="flex items-center gap-2 text-ivory/85 text-xs">
              <CheckCircle size={14} className="text-gold" />
              <span>Bank Transfer Verified</span>
            </div>
            <div className="flex items-center gap-2 text-ivory/85 text-xs">
              <Landmark size={14} className="text-gold" />
              <span>Paid Every Friday</span>
            </div>
          </div>
        </div>

        {/* Right Visual (Phone) */}
        <div className={cn(
          "relative flex justify-center items-center transition-all duration-700 delay-[300ms]",
          isVisible ? "translate-x-0 opacity-100" : "lg:translate-x-10 translate-y-6 opacity-0"
        )}>
           <div className="relative z-10 animate-levitate w-[280px] lg:w-[320px]">
              <div className="relative aspect-[9/18.5] bg-black rounded-[40px] border-[8px] border-obsidian shadow-2xl overflow-hidden">
                 {/* Fake Dashboard Content */}
                 <div className="absolute inset-0 bg-obsidian flex flex-col p-4 text-ivory overflow-hidden">
                    <div className="flex justify-between items-center mb-6 pt-2">
                      <div className="text-[11px] opacity-80">Good morning, Emeka 👋</div>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center relative">
                         <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center text-[10px] text-obsidian font-bold">1</div>
                         <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22a2.98 2.98 0 002.818-2H9.182A2.98 2.98 0 0012 22zm7-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C8.64 5.36 7 7.92 7 11v5l-2 2v1h14v-1l-2-2z"/></svg>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald/40 to-obsidian border border-gold/20 rounded-2xl p-4 mb-6">
                      <div className="text-[10px] opacity-70 mb-1">Earning Wallet</div>
                      <div className="text-2xl font-code font-bold text-gold mb-2">₦7,500.00</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald font-medium">
                        <CheckCircle size={12} />
                        <span>5/5 Referrals Complete</span>
                      </div>
                    </div>

                    <div className="gold-gradient h-10 rounded-lg flex items-center justify-center text-obsidian font-headline font-bold text-xs mb-6 shadow-md">
                      Withdraw Now
                    </div>

                    <div className="space-y-3">
                       <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex items-center gap-2">
                             <div className="w-7 h-7 rounded-full bg-emerald/20 flex items-center justify-center text-[10px] font-bold">A</div>
                             <div className="text-[10px]">Ada referred Blessing</div>
                          </div>
                          <div className="text-[10px] text-emerald font-bold">+₦1,500</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Floating Toast */}
           <div className="hidden lg:block">
              <div className="absolute -left-16 top-1/4 bg-obsidian/80 backdrop-blur-md border border-gold/20 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
                <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald">₦</div>
                <div className="text-[11px] font-medium">+₦1,500 earned 💰</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}