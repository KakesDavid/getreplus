'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { PartyPopper, ChevronRight, LayoutDashboard, Rocket } from 'lucide-react';
import { GoldButton } from '../shared/GoldButton';
import { SignupData } from '@/hooks/useSignupState';
import { cn } from '@/lib/utils';

interface StepProps {
  data: SignupData;
}

export function Step5Success({ data }: StepProps) {
  useEffect(() => {
    // Simulated background onboarding email
    console.log(`[EmailJS] Sending onboarding email to ${data.email}...`);
  }, [data.email]);

  return (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
      {/* Animated Success Circle */}
      <div className="relative mb-32">
        <svg className="w-[72px] h-[72px]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-gold draw-circle"
          />
          <path
            d="M30 50 L45 65 L70 35"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold draw-check"
          />
        </svg>
        <div className="absolute inset-0 rounded-full bg-gold/10 animate-pulse-glow" />
      </div>

      <h2 className="font-headline font-bold text-ivory text-[28px] lg:text-[32px] mb-8">
        Account created! 🎉
      </h2>
      <p className="text-ivory-60 text-16 leading-relaxed mb-32">
        Welcome to GetrePlus, <span className="text-gold font-bold">@{data.username}</span>
      </p>

      {/* Account Summary Card */}
      <div className="w-full bg-white/5 backdrop-blur-md border border-gold-border rounded-2xl p-24 mb-40 text-left">
        <div className="flex justify-between items-start mb-16">
          <div>
            <span className="text-[10px] font-bold text-ivory-40 uppercase tracking-widest block mb-4">Username</span>
            <div className="text-18 font-headline font-bold text-ivory">@{data.username}</div>
          </div>
          <div className="bg-gold/10 border border-gold/20 px-10 py-4 rounded-full">
            <span className="text-[10px] font-bold text-gold uppercase tracking-tighter">Standard Account</span>
          </div>
        </div>
        <div className="pt-16 border-t border-white/5 flex items-center gap-12 text-ivory-50">
          <PartyPopper size={18} className="text-gold" />
          <p className="text-[13px] leading-snug">
            Your referral code is active. Start sharing to earn!
          </p>
        </div>
      </div>

      <div className="w-full space-y-16">
        <Link href="/dashboard?prompt=activate" className="block w-full">
          <GoldButton className="w-full">
            <Rocket className="mr-8" size={18} />
            Activate Now — ₦2,050
          </GoldButton>
        </Link>

        <Link href="/dashboard" className="block w-full">
          <button className="w-full h-[54px] rounded-xl font-headline font-bold text-[15px] text-ivory-60 hover:text-ivory hover:bg-white/5 transition-all flex items-center justify-center gap-8 group">
            <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform" />
            Explore Dashboard First
            <ChevronRight size={16} />
          </button>
        </Link>
      </div>

      <p className="mt-32 text-ivory-30 text-[12px] leading-relaxed">
        You can activate your account anytime from your dashboard.<br />
        Weekly payouts are processed every Friday for active members.
      </p>
    </div>
  );
}