"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "GetrePlus Members 🇳🇬",
    messages: [
      { type: "in", text: "Guys I just received my ₦7,500 alert now!! 🎉 This GetrePlus thing is real o, I no lie", time: "1:42 PM" },
      { type: "out", text: "Which bank? Same day?", time: "1:44 PM" },
      { type: "in", text: "GTBank. Requested Friday morning. Alert came before 2pm same day. I'm already sharing my link for cycle 2", time: "1:48 PM" },
    ]
  },
  {
    name: "GetrePlus Members 🇳🇬",
    messages: [
      { type: "in", text: "I was sceptical before joining but my sister convinced me. Just completed my second cycle. ₦15,000 withdrawn total so far", time: "9:15 AM" },
      { type: "out", text: "How many referrals?", time: "9:17 AM" },
      { type: "in", text: "Just 5 per cycle. My market WhatsApp group was easy. Premium plan pays ₦7,500 so it's worth it abeg", time: "9:22 AM" },
    ]
  },
  {
    name: "GetrePlus Members 🇳🇬",
    messages: [
      { type: "in", text: "The spin wheel gave me extra ₦120 yesterday on top of my referral money 😂 even the small things add up", time: "11:02 AM" },
      { type: "out", text: "How often do you spin?", time: "11:05 AM" },
      { type: "in", text: "Whenever my wallet balance allows. ₦100 per session, sometimes win back ₦200. Sometimes ₦60. Still better than nothing", time: "11:10 AM" },
    ]
  },
  {
    name: "GetrePlus Members 🇳🇬",
    messages: [
      { type: "in", text: "Abeg I'm upgrading to Premium next cycle. Standard ₦2,500 is good but Premium ₦7,500 is better math. ₦5,100 activation, earn ₦7,500, that's ₦2,400 profit in one week", time: "3:30 PM" },
      { type: "out", text: "Exactly. I'm already on cycle 3 Premium. Best decision", time: "3:32 PM" },
    ]
  },
  {
    name: "GetrePlus Members 🇳🇬",
    messages: [
      { type: "in", text: "Just calculated my totals. ₦7,500 from referrals + ₦680 from spin wheel + tap earn this month. Withdrawn twice already. GetrePlus is consistent", time: "7:20 PM" },
      { type: "out", text: "How fast was the withdrawal?", time: "7:22 PM" },
      { type: "in", text: "Same Friday I requested. Money in my Opay before evening. No stories", time: "7:25 PM" },
    ]
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth > 1024 ? (360 + 20) : (310 + 20);
      carouselRef.current.scrollTo({
        left: activeIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <section id="testimonials" className="py-24 bg-obsidian border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-gold/30 rounded-full px-4 py-2 mb-6">
          <span className="text-xs font-medium text-gold tracking-widest uppercase">Real Member Results</span>
        </div>
        
        <h2 className="font-headline font-bold text-30 lg:text-[42px] leading-tight text-ivory">
          Nigerians Are Already Earning.
        </h2>
        
        <p className="mt-4 text-ivory/85 text-base lg:text-lg max-w-[540px] mx-auto">
          Real results from real members. Every Friday, more payouts go out.
        </p>

        <div className="mt-16 relative">
          <div 
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto px-5 lg:px-0 hide-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {TESTIMONIALS.map((chat, i) => (
              <div 
                key={i}
                className="w-[310px] lg:w-[360px] shrink-0 rounded-[18px] overflow-hidden border border-white/10 flex flex-col snap-start"
              >
                {/* WhatsApp Header */}
                <div className="bg-[#1F2C34] h-12 flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-white text-xs">G</div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold text-white">{chat.name}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-whatsapp" />
                        <span className="text-[10px] text-white/90">online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 opacity-60">
                    <div className="w-4 h-4 rounded-full border border-white/40" />
                    <div className="w-4 h-4 rounded-full border border-white/40" />
                  </div>
                </div>

                {/* WhatsApp Body */}
                <div className="bg-[#0B141A] p-4 flex flex-col gap-2 min-h-[220px]">
                  {chat.messages.map((msg, j) => (
                    <div 
                      key={j}
                      className={cn(
                        "relative p-2.5 max-w-[85%] text-white text-[13px] leading-tight shadow-sm",
                        msg.type === "in" 
                          ? "bg-[#1E2D35] rounded-r-xl rounded-bl-xl self-start" 
                          : "bg-[#054640] rounded-l-xl rounded-br-xl self-end"
                      )}
                    >
                      {msg.text}
                      <div className="mt-1 text-right text-[9px] opacity-80 flex items-center justify-end gap-1">
                        {msg.time}
                        {msg.type === "out" && (
                          <span className="text-blue-400">✓✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-auto self-end flex items-center gap-1 text-[10px] text-emerald font-medium">
                    <ShieldCheck size={12} />
                    Verified Member
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-5 bg-gold" : "w-2 bg-ivory/25"
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="text-shimmer font-subheadline font-bold text-lg mb-2">⭐⭐⭐⭐⭐ 4.9 / 5</div>
          <div className="text-ivory/80 text-sm">Based on 2,400+ member reviews across Nigeria</div>
          <div className="mt-4 flex items-center gap-2 text-emerald text-xs font-medium bg-emerald/10 px-4 py-1.5 rounded-full border border-emerald/20">
            <ShieldCheck size={14} />
            Member results independently verified by our support team
          </div>
        </div>
      </div>
    </section>
  );
}
