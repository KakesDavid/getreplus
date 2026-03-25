"use client";

import React from "react";

const TICKER_DATA = [
  "⭐ Adaeze from Lagos earned ₦7,500",
  "⭐ Chukwuemeka completed cycle 3",
  "⭐ Fatimah withdrew ₦15,000",
  "⭐ Tunde from Abuja referred 5 friends in 3 days",
  "⭐ Ngozi just unlocked her withdrawal",
  "⭐ Blessing completed cycle 2 this week",
];

export function Ticker() {
  return (
    <div className="w-full h-9 lg:h-10 bg-emerald/45 backdrop-blur-md border-y border-gold/18 overflow-hidden relative z-20 flex items-center">
      <div className="flex whitespace-nowrap animate-marquee-mobile lg:animate-marquee">
        {[...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
          <div key={i} className="flex items-center px-6 lg:px-8">
            <span className="text-ivory/75 text-[12px] lg:text-[13px] font-body font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}