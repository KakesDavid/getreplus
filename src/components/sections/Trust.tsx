"use client";

import React from "react";
import { ShieldCheck, Landmark, ShieldAlert, MessageCircle, CheckCircle } from "lucide-react";

const PILLARS = [
  {
    icon: <ShieldCheck size={26} />,
    title: "Payments via Paystack",
    body: "Every activation fee and wallet top-up is processed by Paystack — Nigeria's most trusted payment platform. We never see or store your card details.",
    footer: "✅ Paystack is licensed by the CBN",
  },
  {
    icon: <Landmark size={26} />,
    title: "Bank Account Verified",
    body: "Before we send money, your bank account name is verified against your registered full name via Paystack Bank API. Mismatched accounts are rejected.",
    footer: "✅ Account name verification active",
  },
  {
    icon: <ShieldAlert size={26} />,
    title: "Manual Withdrawal Review",
    body: "No automated disbursements. Every withdrawal request is reviewed by our team before the transfer is sent. This eliminates errors and protects you.",
    footer: "✅ Average processing: same day",
  },
  {
    icon: <MessageCircle size={26} />,
    title: "Live Support on WhatsApp",
    body: "Have a question? Our support team is reachable directly on WhatsApp. Real people, not bots. Monday to Saturday, 8am–8pm WAT.",
    footer: "✅ Response within 24 hours",
  },
];

export function Trust() {
  return (
    <section className="py-[72px] lg:py-24 trust-gradient">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 bg-obsidian/40 backdrop-blur-md border border-gold/30 rounded-full px-4 py-2 mb-6">
          <span className="text-xs font-medium text-gold tracking-widest uppercase">🔐 Your Security is our priority</span>
        </div>
        
        <h2 className="font-headline font-bold text-28 lg:text-[42px] leading-[1.15] text-ivory max-w-[680px] mx-auto">
          Is GetrePlus Safe? Yes. Here&apos;s Proof.
        </h2>
        
        <p className="mt-4 text-ivory/85 text-base lg:text-lg max-w-[580px] mx-auto leading-relaxed">
          We know Nigerians have been burned by fake platforms. GetrePlus is built on verified infrastructure that you can check yourself.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PILLARS.map((pillar, i) => (
            <div 
              key={i}
              className="group bg-white/5 border border-gold/15 rounded-[18px] p-6 lg:p-8 flex flex-col items-start text-left min-h-[200px] transition-all hover:border-gold/40 hover:bg-secondary/20 hover:-translate-y-1"
            >
              <div className="w-[52px] h-[52px] bg-secondary rounded-[14px] flex items-center justify-center text-gold mb-6 transition-transform group-hover:scale-110">
                {pillar.icon}
              </div>
              <h3 className="font-subheadline font-semibold text-[17px] text-ivory mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-ivory/85 leading-relaxed mb-6 flex-1">
                {pillar.body}
              </p>
              <div className="text-[13px] text-emerald font-medium">
                {pillar.footer}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
           <div className="flex items-center gap-2 text-xs font-medium">
             <Landmark size={18} /> <span>Encrypted Database</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-medium">
             <ShieldCheck size={18} /> <span>Payment Processing</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-medium">
             <ShieldAlert size={18} /> <span>256-bit SSL</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-medium">
             <CheckCircle size={18} /> <span>CBN Licensed</span>
           </div>
        </div>
      </div>
    </section>
  );
}
