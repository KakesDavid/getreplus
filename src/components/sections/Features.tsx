"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  Users, 
  RotateCcw, 
  Hand, 
  Send, 
  Trophy 
} from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Refer & Earn",
    body: "Earn ₦500 or ₦1,500 for every friend who activates. Complete 5 referrals to unlock your Friday withdrawal. Run multiple cycles every month.",
    stat: "Up to ₦7,500 per cycle",
    icon: <Users size={24} />,
    badge: "CORE",
  },
  {
    title: "Spin Wheel",
    body: "Pay ₦100 for 2 spins. Win between ₦20 and ₦200 per spin. Premium members get 3 spins. All prizes credited to your wallet immediately.",
    stat: "Win up to ₦200 per spin",
    icon: <RotateCcw size={24} />,
    badge: "BONUS",
  },
  {
    title: "Tap to Earn",
    body: "Tap daily while your referral cycle is in progress. Standard: 100 taps at ₦0.01. Premium: 200 taps at ₦0.05 — that's ₦10 every single day just from tapping.",
    stat: "Up to ₦10 daily for Premium",
    icon: <Hand size={24} />,
    badge: "BONUS",
  },
  {
    title: "Send Money",
    body: "Transfer money to any GetrePlus member instantly using their username. Funds arrive in their wallet immediately. Just a 5% fee.",
    stat: "Only 5% transfer fee",
    icon: <Send size={24} />,
    badge: "CORE",
  },
  {
    title: "Weekly Leaderboard",
    body: "Top 3 referrers each week win bonus prizes. Standard: up to ₦5,000 bonus. Premium: up to ₦10,000 bonus. Compete with members nationwide.",
    stat: "Up to ₦10,000 weekly bonus",
    icon: <Trophy size={24} />,
    badge: "BONUS",
  },
];

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 280 + 16; // width + gap
      carouselRef.current.scrollTo({
        left: activeIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <section id="features" className="py-24 bg-obsidian relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center z-10 relative">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-gold/30 rounded-full px-4 py-2 mb-6">
          <span className="text-xs font-medium text-gold tracking-widest uppercase">Platform Features</span>
        </div>
        
        <h2 className="font-headline font-bold text-30 lg:text-[42px] leading-tight text-ivory">
          More Ways to Earn Every Day
        </h2>
        
        <p className="mt-4 text-ivory/85 text-base lg:text-lg max-w-[540px] mx-auto">
          Referrals are your main income. These keep you earning between cycles.
        </p>

        {/* Desktop Grid */}
        <div className="hidden lg:grid mt-20 grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {FEATURES.map((feature, i) => (
            <div 
              key={i}
              className="group bg-white/5 border border-white/10 rounded-[18px] p-8 text-left flex flex-col relative transition-all duration-300 hover:bg-secondary/20 hover:border-gold/40 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(183,134,44,0.1)]"
            >
              <div className={cn(
                "absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest",
                feature.badge === "CORE" ? "bg-secondary text-gold" : "bg-gold text-obsidian"
              )}>
                {feature.badge}
              </div>
              <div className="w-[52px] h-[52px] bg-secondary rounded-[14px] flex items-center justify-center text-gold mb-6">
                {feature.icon}
              </div>
              <h3 className="font-subheadline font-semibold text-18 text-ivory mb-2.5">
                {feature.title}
              </h3>
              <p className="text-sm text-ivory/85 leading-relaxed mb-6 flex-1">
                {feature.body}
              </p>
              <div className="pt-4 border-t border-white/5 font-code font-bold text-[15px] text-gold">
                {feature.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mt-12">
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto px-5 hide-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {FEATURES.map((feature, i) => (
              <div 
                key={i}
                className="w-[280px] shrink-0 bg-white/5 border border-white/10 rounded-[18px] p-7 text-left flex flex-col relative snap-start"
              >
                <div className={cn(
                  "absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest",
                  feature.badge === "CORE" ? "bg-secondary text-gold" : "bg-gold text-obsidian"
                )}>
                  {feature.badge}
                </div>
                <div className="w-[52px] h-[52px] bg-secondary rounded-[14px] flex items-center justify-center text-gold mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-subheadline font-semibold text-17 text-ivory mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-ivory/85 leading-relaxed mb-6 flex-1">
                  {feature.body}
                </p>
                <div className="pt-4 border-t border-white/5 font-code font-bold text-[15px] text-gold">
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center gap-2.5">
            {FEATURES.map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-5 bg-gold" : "w-2 bg-ivory/25"
                )}
              />
            ))}
          </div>
          <p className="mt-6 text-[12px] text-ivory/70 animate-pulse">← Swipe to explore →</p>
        </div>
      </div>
    </section>
  );
}
