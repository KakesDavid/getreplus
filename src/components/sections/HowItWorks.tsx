"use client";

import React from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Pay Once. Get Your Link.",
    body: "Activate your account for ₦2,050 (Standard) or ₦5,100 (Premium). Payment is secured by Paystack. Your link is ready immediately.",
  },
  {
    title: "Refer 5 Friends",
    body: "Share your link on WhatsApp or any group. When 5 friends click your link and activate, your cycle is complete. Most finish in 3–7 days.",
  },
  {
    title: "Withdraw to Your Bank Every Friday",
    body: "Once your cycle is complete, request your withdrawal on any Friday. We transfer directly to your verified bank account same-day.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-obsidian relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,134,44,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,78,59,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-secondary/40 backdrop-blur-sm border border-gold/20 rounded-full px-4 py-2 mb-6">
          <span className="text-[11px] font-bold text-gold tracking-[0.2em] uppercase">Simple Process</span>
        </div>
        
        <h2 className="font-headline font-bold text-32 lg:text-[48px] leading-tight text-ivory mb-6">
          Three Steps to Your <span className="text-gold">First Payout</span>
        </h2>
        
        <p className="mt-4 text-ivory/60 text-base lg:text-lg max-w-[580px] mx-auto font-body leading-relaxed">
          The fastest social earning platform in Nigeria. No experience needed. No selling. Just share your unique link.
        </p>

        <div className="mt-20 relative grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-gold/15 z-0" />
          
          {/* Vertical Connecting Line (Mobile) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[44px] w-[2px] border-l-2 border-dashed border-gold/15 z-0" />

          {STEPS.map((step, i) => (
            <div 
              key={i} 
              className="relative group z-10 text-center lg:text-left"
            >
              {/* Number Container - Midnight Green square with Gold coloration */}
              <div className="w-[88px] h-[88px] bg-secondary border border-gold/30 rounded-2xl flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-[0_0_40px_rgba(183,134,44,0.08)] transition-all duration-500 group-hover:scale-110 group-hover:border-gold/60 group-hover:shadow-[0_0_50px_rgba(183,134,44,0.15)]">
                <span className="font-code font-bold text-40 text-gold leading-none tracking-tighter">
                  0{i + 1}
                </span>
              </div>
              
              <div className="px-4 lg:px-0">
                <h3 className="font-subheadline font-bold text-xl text-ivory mb-4 group-hover:text-gold transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[15px] text-ivory/50 leading-relaxed font-body">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Calculator Card - Refined design with glassmorphism */}
        <div className="mt-24 max-w-[880px] mx-auto bg-white/[0.02] backdrop-blur-xl border border-gold/20 rounded-[32px] p-8 lg:p-14 overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 relative z-10">
              <div className="flex flex-col items-center">
                 <div className="bg-white/5 px-4 py-1.5 rounded-full mb-8 border border-white/10">
                    <span className="text-[10px] font-bold text-ivory/40 tracking-[0.2em] uppercase">Standard Plan</span>
                 </div>
                 <div className="text-sm text-ivory/30 mb-3 font-medium">5 referrals × ₦500</div>
                 <div className="text-5xl lg:text-[64px] font-code font-bold text-gold mb-6 drop-shadow-[0_0_15px_rgba(183,134,44,0.3)]">₦2,500</div>
                 <div className="text-[13px] text-ivory/60 bg-emerald/10 border border-emerald/20 px-5 py-2 rounded-xl">
                    Net profit per cycle: <span className="text-emerald font-bold">₦450</span>
                 </div>
              </div>
              
              {/* Divider */}
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-white/5" />
              <div className="md:hidden w-full h-px bg-white/5 my-6" />

              <div className="flex flex-col items-center">
                 <div className="bg-gold/10 px-4 py-1.5 rounded-full mb-8 border border-gold/20 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gold tracking-[0.2em] uppercase">Premium Plan</span>
                    <span className="text-xs">⭐</span>
                 </div>
                 <div className="text-sm text-ivory/30 mb-3 font-medium">5 referrals × ₦1,500</div>
                 <div className="text-5xl lg:text-[64px] font-code font-bold text-gold mb-6 drop-shadow-[0_0_20px_rgba(183,134,44,0.4)]">₦7,500</div>
                 <div className="text-[13px] text-ivory/60 bg-emerald/10 border border-emerald/20 px-5 py-2 rounded-xl">
                    Net profit per cycle: <span className="text-emerald font-bold">₦2,400</span>
                 </div>
              </div>
           </div>
           
           <div className="mt-14 pt-8 border-t border-white/5 text-[14px] text-ivory/40 flex items-center justify-center gap-3 font-medium">
             <span className="text-gold text-lg">🔄</span>
             <span>Complete multiple cycles per month. Most active members run 2–4 cycles monthly.</span>
           </div>
        </div>
      </div>
    </section>
  );
}
