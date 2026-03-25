"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Is GetrePlus real? Can I actually withdraw money?",
    a: "Yes. GetrePlus pays real money directly to your Nigerian bank account every Friday via bank transfer. Your bank account name is verified before we ever send a payment. Last Friday alone, over 200 members withdrew funds ranging from ₦1,000 to ₦15,000.",
  },
  {
    q: "How much does it cost and how much can I earn?",
    a: "Activation costs ₦2,050 (Standard) or ₦5,100 (Premium) per cycle, processed securely through Paystack. Standard earns ₦500 per referral × 5 = ₦2,500 per cycle. Premium earns ₦1,500 per referral × 5 = ₦7,500 per cycle.",
  },
  {
    q: "When can I withdraw and how long does it take?",
    a: "Withdrawals open every Friday. You must have completed your current cycle (5 referrals) and have a minimum of ₦1,000 in your earning wallet. Most withdrawals are processed and received same-day on Fridays.",
  },
  {
    q: "Is my money and bank information safe?",
    a: "All payments are processed by Paystack, which is licensed by the CBN. Your bank name is verified before any transfer. Your data is stored in encrypted Firebase databases certified to industry security standards.",
  },
  {
    q: "What if I can't get 5 referrals quickly?",
    a: "Your account stays fully active. You can keep earning daily from Tap to Earn and Spin Wheel while building your referrals. Many members complete their 5 referrals within 3–7 days by sharing in WhatsApp groups.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-[96px] bg-ivory">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 bg-secondary text-gold rounded-full px-4 py-2 mb-6">
          <span className="text-xs font-bold tracking-widest uppercase">Frequently Asked Questions</span>
        </div>
        
        <h2 className="font-headline font-bold text-28 lg:text-[40px] leading-tight text-obsidian">
          Your Questions Answered
        </h2>
        
        <p className="mt-4 text-[#92650A] font-bold text-base lg:text-lg max-w-[540px] mx-auto">
          We know what Nigerians ask before joining. Here are the honest answers.
        </p>

        <div className="mt-16 max-w-[720px] mx-auto text-left">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-secondary/10 rounded-[14px] overflow-hidden">
                <AccordionTrigger className="px-6 h-[60px] text-left hover:no-underline hover:bg-secondary/5 font-subheadline font-bold text-[15px] lg:text-[16px] text-[#92650A]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 text-[15px] font-bold text-[#92650A] leading-relaxed border-t border-secondary/8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-[15px] text-[#92650A] font-bold">
          Have more questions? <a href="#" className="text-gold underline underline-offset-4 ml-1">Contact us on WhatsApp →</a>
        </div>
      </div>
    </section>
  );
}
