"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Star, Info } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-[96px] lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 bg-secondary text-gold rounded-full px-4 py-2 mb-6">
          <span className="text-xs font-bold tracking-widest uppercase">CHOOSE YOUR PLAN</span>
        </div>
        
        <h2 className="font-headline font-bold text-32 lg:text-[48px] leading-tight text-obsidian">
          One Activation. Real Money Back.
        </h2>
        
        <p className="mt-4 text-[#92650A] font-medium text-lg max-w-[540px] mx-auto">
          Both plans are profitable. Premium earns 3× more per cycle.
        </p>

        <div className="mt-20 flex flex-col md:flex-row justify-center items-stretch gap-8 lg:gap-10 max-w-[920px] mx-auto">
          {/* Standard Plan */}
          <div className="flex-1 bg-white border-[1.5px] border-secondary/12 rounded-[32px] p-8 lg:p-14 flex flex-col text-left shadow-sm transition-transform hover:shadow-md">
            <span className="text-[12px] font-bold text-secondary tracking-widest uppercase mb-4 opacity-70">Standard</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl lg:text-[56px] font-code font-bold text-[#92650A]">₦2,000</span>
              <span className="text-sm text-[#92650A] font-medium">/activation</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#92650A] font-medium mb-10">
              <span>+ ₦50 Paystack fee</span>
              <span title="Paystack charges a small processing fee." className="cursor-help inline-flex">
                <Info size={14} />
              </span>
            </div>

            <div className="w-full h-px bg-secondary/10 mb-10" />

            <ul className="space-y-4 mb-12 flex-1">
              {[
                "₦500 per successful referral",
                "5 referrals per cycle = ₦2,500",
                "100 taps per day at ₦0.01",
                "2 spins per session",
                "Friday withdrawals",
                "Send money to members",
                "Full platform access",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={10} className="text-white" />
                  </div>
                  <span className="text-[15px] font-bold text-[#92650A]">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/signup" className="block">
              <Button className="w-full h-[60px] gold-gradient text-obsidian font-headline font-bold text-base rounded-xl transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_20px_rgba(183,134,44,0.2)]">
                Activate Standard — ₦2,050
              </Button>
            </Link>
            <div className="mt-6 text-[12px] text-[#92650A] font-bold text-center opacity-60">
              ✅ Secured by Paystack · 🏦 Bank verified
            </div>
          </div>

          {/* Premium Plan */}
          <div className="flex-1 bg-gradient-to-br from-obsidian to-[#111] border-[1.5px] border-gold/50 rounded-[32px] p-8 lg:p-14 flex flex-col text-left relative scale-100 lg:scale-[1.05] shadow-[0_32px_64px_rgba(183,134,44,0.12)] z-10">
            <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 gold-gradient text-obsidian font-headline font-bold text-[12px] px-6 py-2 rounded-full whitespace-nowrap shadow-lg tracking-wider">
              MOST POPULAR
            </div>
            
            <span className="text-[12px] font-bold text-gold tracking-widest uppercase mb-4">Premium ⭐</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl lg:text-[56px] font-code font-bold text-gold">₦5,000</span>
              <span className="text-sm text-ivory/75">/activation</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-ivory/75 mb-10">
              <span>+ ₦100 Paystack fee</span>
              <span title="Paystack charges a small processing fee." className="cursor-help inline-flex">
                <Info size={14} />
              </span>
            </div>

            <div className="w-full h-px bg-gold/20 mb-10" />

            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold/30">
                  <Star size={10} className="text-gold" />
                </div>
                <span className="text-[15px] text-gold font-bold">₦1,500 per referral — 3× Standard</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold/30">
                  <Star size={10} className="text-gold" />
                </div>
                <span className="text-[15px] text-gold font-bold">5 referrals = ₦7,500 per cycle</span>
              </li>
              {[
                "200 taps per day at ₦0.05",
                "3 spins per session (15% off)",
                "Priority withdrawal processing",
                "Premium leaderboard badge",
                "Exclusive Premium weekly prizes",
                "All Standard features included",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star size={10} className="text-gold opacity-70" />
                  </div>
                  <span className="text-[15px] text-ivory/95 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/signup" className="block">
              <Button className="w-full h-[60px] gold-gradient text-obsidian font-headline font-bold text-base rounded-xl shadow-[0_8px_32px_rgba(183,134,44,0.3)] transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95">
                Go Premium — ₦5,100
              </Button>
            </Link>
            <div className="mt-6 text-[12px] text-ivory/50 text-center font-medium">
              ✅ Secured by Paystack · 🏦 Bank verified
            </div>
          </div>
        </div>

        {/* Objection Handler */}
        <div className="mt-20 max-w-[740px] mx-auto bg-emerald/10 border border-emerald/20 rounded-[24px] p-8 lg:p-10 text-left">
           <h4 className="font-subheadline font-bold text-[18px] text-[#92650A] mb-3">💬 What if I can&apos;t find 5 referrals quickly?</h4>
           <p className="text-[15px] text-[#92650A] font-bold leading-relaxed opacity-90">
             Your account stays fully active. While you build your referrals, you continue earning from Tap to Earn daily and Spin Wheel. Most members complete their 5 referrals within 3–7 days using WhatsApp groups, church groups, or work colleagues. You are not locked out — you are simply working at your pace.
           </p>
        </div>
      </div>
    </section>
  );
}