"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CountdownBlock({ value, label }: { value: number; label: string }) {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
        setPrevValue(value);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-obsidian/65 backdrop-blur-xl border border-gold/30 rounded-2xl w-[84px] lg:w-[130px] h-[95px] lg:h-[140px] flex items-center justify-center relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        <span className={`font-code font-bold text-42 lg:text-[72px] text-gold tracking-tight ${isFlipping ? 'animate-flip' : ''}`}>
          {value.toString().padStart(2, '0')}
        </span>
        {/* Subtle reflection detail */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>
      <span className="text-[11px] lg:text-[13px] font-bold text-gold tracking-[0.2em] uppercase opacity-90">{label}</span>
    </div>
  );
}

export function Urgency() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      // West Africa Time (WAT) is UTC+1
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const watTime = new Date(utc + (3600000 * 1));
      
      const currentDay = watTime.getDay(); // 0 is Sunday, 5 is Friday
      
      let targetDate = new Date(watTime);
      let daysUntilFriday = (5 - currentDay + 7) % 7;
      
      // If today is Friday but past 8am WAT, target next Friday
      if (daysUntilFriday === 0 && watTime.getHours() >= 8) {
        daysUntilFriday = 7;
      }
      
      targetDate.setDate(watTime.getDate() + daysUntilFriday);
      targetDate.setHours(8, 0, 0, 0);

      const diff = targetDate.getTime() - watTime.getTime();
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }

      if (currentDay >= 1 && currentDay <= 3) {
        setMessage("Start your referral cycle today. You have time to complete 5 referrals before Friday.");
      } else if (currentDay === 4) {
        setMessage("⚡ Last full day before Friday. Activate now and share your link tonight.");
      } else if (currentDay === 5) {
        setMessage("🎉 Payouts are going out TODAY. Members are withdrawing right now. Join and start your first cycle.");
      } else {
        setMessage("Next payout Friday. Activate your account today and be ready.");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden trust-gradient">
      {/* Dynamic Background Element */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
        <span className="font-headline font-bold text-[400px] text-gold leading-none">₦</span>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center z-10 relative">
        <div className="mb-14">
          <span className="inline-block bg-obsidian/40 border border-gold/20 rounded-full px-5 py-2.5 text-[12px] lg:text-[14px] font-bold text-gold tracking-[0.25em] uppercase">
            ⏰ PAYOUT WINDOW CLOSES IN
          </span>
        </div>

        <div className="flex justify-center items-center gap-3 lg:gap-6 mb-16" aria-live="polite">
          <CountdownBlock value={timeLeft.days} label="DAYS" />
          <div className="text-gold/30 text-4xl lg:text-7xl mb-10 font-code">:</div>
          <CountdownBlock value={timeLeft.hours} label="HRS" />
          <div className="text-gold/30 text-4xl lg:text-7xl mb-10 font-code">:</div>
          <CountdownBlock value={timeLeft.minutes} label="MIN" />
          <div className="text-gold/30 text-4xl lg:text-7xl mb-10 font-code">:</div>
          <CountdownBlock value={timeLeft.seconds} label="SEC" />
        </div>

        <div className="max-w-[700px] mx-auto mb-14">
           <h3 className="font-subheadline font-bold text-22 lg:text-30 text-ivory mb-6 leading-tight">
             {message}
           </h3>
           <p className="text-ivory/70 text-base lg:text-lg">
             Don't miss out on this week's direct bank transfers. Thousands of Nigerians are already sharing links and preparing their Friday withdrawals.
           </p>
        </div>

        <Link href="/signup">
          <Button className="gold-gradient text-obsidian font-headline font-bold h-[64px] w-full max-w-[340px] text-lg rounded-2xl shadow-[0_12px_40px_rgba(183,134,44,0.45)] hover:brightness-110 active:scale-[0.98] transition-all">
            Start My Referral Cycle Now
          </Button>
        </Link>
      </div>
    </section>
  );
}