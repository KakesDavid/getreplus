'use client';
import React from 'react';
import Link from 'next/link';
import { Shield, Landmark, CheckCircle, Wallet } from 'lucide-react';

export function BrandPanel() {
  return (
    <div className="w-full h-full bg-brand-panel-bg flex flex-col justify-center p-40 xl:p-48 relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Naira Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-headline font-bold text-[280px] text-gold opacity-[0.04] leading-none translate-y-12">₦</span>
      </div>
      
      {/* Top: Logo */}
      <Link href="/" className="absolute top-40 left-40 xl:left-48 flex items-center group z-20">
        <div className="w-36 h-36 bg-secondary rounded-lg flex items-center justify-center font-headline font-bold text-gold text-lg">
          G+
        </div>
        <div className="ml-10">
          <span className="block font-headline font-bold text-ivory text-xl leading-none">GetrePlus</span>
          <span className="block text-[10px] text-gold uppercase tracking-widest font-medium">Get Reward Plus</span>
        </div>
      </Link>

      {/* Center Content */}
      <div className="z-10 mt-24">
        <div className="inline-flex items-center gap-8 bg-obsidian/40 backdrop-blur-md border border-gold-border rounded-full px-16 py-8 mb-28">
          <span className="text-14 animate-bounce">🇳🇬</span>
          <span className="text-[12px] font-subheadline font-medium text-gold tracking-wide">Trusted by 12,400+ Nigerians</span>
        </div>

        <h1 className="font-headline font-bold text-ivory text-[32px] xl:text-[36px] leading-[1.15] mb-16">
          Earn real money<br />every <span className="text-gold">Friday</span>.
        </h1>
        
        <p className="text-ivory-55 text-[16px] leading-relaxed max-w-[320px] mb-40">
          Join the most transparent social earning platform in Nigeria. Built for trust. Paid in Naira.
        </p>

        {/* Trust Rows */}
        <div className="space-y-16 xl:space-y-20">
          <div className="flex items-center gap-16 text-ivory-60">
            <Shield size={18} className="text-gold" />
            <span className="text-[14px] font-medium">Paystack Secured Payments</span>
          </div>
          <div className="flex items-center gap-16 text-ivory-60">
            <Landmark size={18} className="text-gold" />
            <span className="text-[14px] font-medium">CBN Licensed Bank Partners</span>
          </div>
          <div className="flex items-center gap-16 text-ivory-60">
            <CheckCircle size={18} className="text-gold" />
            <span className="text-[14px] font-medium">Verified Friday Disbursements</span>
          </div>
        </div>
      </div>

      {/* Floating Earnings Card */}
      <div className="absolute bottom-40 xl:bottom-48 left-40 xl:left-48 z-10 animate-levitate hidden xl:block">
        <div className="bg-obsidian/70 backdrop-blur-xl border border-gold-border rounded-[16px] p-24 shadow-card-shadow w-[280px]">
          <div className="flex justify-between items-start mb-12">
            <span className="text-[10px] font-bold text-ivory-40 tracking-widest uppercase">Earning Wallet</span>
            <div className="bg-gold/10 px-8 py-2 rounded-full border border-gold/20">
              <span className="text-[9px] font-bold text-gold uppercase">Standard</span>
            </div>
          </div>
          
          <div className="font-code font-bold text-28 text-gold mb-4">₦7,500.00</div>
          
          <div className="flex items-center gap-8 text-[11px] text-emerald font-semibold mb-12">
            <CheckCircle size={12} />
            <span>5/5 Referrals Complete</span>
          </div>

          <div className="pt-12 border-t border-white/5 flex items-center gap-8 text-ivory-50">
            <Wallet size={14} className="opacity-50" />
            <span className="text-[11px]">Next payout: Friday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
