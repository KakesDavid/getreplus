"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Landmark, CheckCircle } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="final-cta" className="py-24 hero-gradient relative overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <span className="font-headline font-bold text-[380px] text-gold leading-none">₦</span>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center z-10 relative">
        {/* Referral Link Preview Card */}
        <div className="inline-flex items-center gap-3 bg-obsidian/65 backdrop-blur-xl border border-gold/30 rounded-xl px-5 py-3.5 mb-10">
          <span className="text-[14px] lg:text-[15px] text-ivory/80">getreplus.com/ref/</span>
          <div className="flex items-center">
             <span className="font-code font-bold text-[14px] lg:text-[15px] text-gold">yourname</span>
             <span className="w-[1.5px] h-[18px] bg-gold ml-0.5 animate-cursor-blink" />
          </div>
          <div className="w-px h-5 bg-gold/20 mx-1" />
          <Link href="/signup">
            <span className="text-[12px] lg:text-[13px] font-medium text-gold cursor-pointer hover:underline underline-offset-4 transition-all">Claim Your Link →</span>
          </Link>
        </div>

        <h2 className="font-headline font-bold text-34 lg:text-[52px] leading-tight text-ivory max-w-[700px] mx-auto">
          Your First Friday Payout <span className="wavy-underline">Starts Today.</span>
        </h2>
        
        <p className="mt-8 text-ivory/85 text-16 lg:text-[18px] leading-relaxed max-w-[500px] mx-auto">
          Join GetrePlus. Activate your account. Share your link with 5 friends. Collect your money on Friday. That is the whole plan.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button className="w-full gold-gradient text-obsidian font-headline font-bold h-[56px] sm:w-[300px] rounded-xl shadow-[0_8px_32px_rgba(183,134,44,0.4)] hover:brightness-110 active:scale-95 transition-all">
              Create My Account — Sign Up Free
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="bg-transparent border-white/20 text-ivory h-[56px] w-full sm:w-[200px] rounded-xl hover:border-gold hover:text-gold transition-all"
            onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
          >
            I Have Questions
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 lg:gap-8">
           <div className="flex items-center gap-2 text-ivory/80 text-[13px]">
             <ShieldCheck size={16} className="text-gold" /> <span>Paystack Secured</span>
           </div>
           <div className="flex items-center gap-2 text-ivory/80 text-[13px]">
             <Landmark size={16} className="text-gold" /> <span>CBN Licensed Payments</span>
           </div>
           <div className="flex items-center gap-2 text-ivory/80 text-[13px]">
             <CheckCircle size={16} className="text-gold" /> <span>Friday Payouts Guaranteed</span>
           </div>
        </div>
      </div>
    </section>
  );
}