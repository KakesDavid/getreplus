"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface StatItemProps {
  number: string;
  label: string;
  isFriday?: boolean;
}

function StatItem({ number, label, isFriday }: StatItemProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const targetValue = parseInt(number.replace(/[^0-9]/g, ""));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFriday) {
          let start = 0;
          const end = targetValue;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * end);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [targetValue, isFriday]);

  return (
    <div ref={elementRef} className="flex flex-col items-center text-center">
      <div className={cn(
        "font-code font-bold text-gold leading-tight transition-all",
        isFriday 
          ? "text-[18px] lg:text-[44px] whitespace-nowrap" 
          : "text-[22px] lg:text-[44px]"
      )}>
        {isFriday ? number : (number.includes("₦") ? `₦${count.toLocaleString()}+` : `${count.toLocaleString()}+`)}
      </div>
      <div className="mt-1 font-body text-[11px] lg:text-[13px] text-ivory/60 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-obsidian border-y border-gold/12 py-10 lg:py-12 relative z-10">
      <div className="max-w-[1100px] mx-auto px-5 grid grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:items-center gap-x-4 gap-y-8 lg:gap-0">
        <StatItem number="₦48000000" label="Total Paid" />
        <div className="hidden lg:block w-px h-12 bg-gold/15" />
        <StatItem number="12400" label="Active Members" />
        <div className="hidden lg:block w-px h-12 bg-gold/15" />
        <StatItem number="7500" label="Max Per Cycle" />
        <div className="hidden lg:block w-px h-12 bg-gold/15" />
        <StatItem number="Every Friday" label="Payout Day" isFriday />
      </div>
      
      <div className="hidden lg:flex mt-10 justify-center items-center gap-4 opacity-50">
        <svg className="w-20" height="24" viewBox="0 0 80 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.91-1.27 4.85-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
        <span className="text-[13px] text-ivory">All Payments by Paystack</span>
      </div>
    </section>
  );
}
