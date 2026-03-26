
'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { PartyPopper, ChevronRight, LayoutDashboard, Rocket } from 'lucide-react';
import { GoldButton } from '../shared/GoldButton';
import { SignupData } from '@/hooks/useSignupState';
import emailjs from '@emailjs/browser';
import { cn } from '@/lib/utils';

interface StepProps {
  data: SignupData;
}

export function Step5Success({ data }: StepProps) {
  useEffect(() => {
    // Primary Welcome Email via EmailJS
    const sendWelcomeEmail = async () => {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id_here') {
        console.warn('EmailJS keys missing or placeholder used. Welcome email skipped.');
        return;
      }

      try {
        await emailjs.send(
          serviceId, 
          templateId, 
          {
            to_email: data.email,
            to_name: data.fullName,
            username: data.username,
            platform_url: window.location.origin,
          },
          publicKey
        );
      } catch (err) {
        // Silent fail for background process
        console.warn('Welcome email background process failed.', err);
      }
    };
    
    sendWelcomeEmail();
  }, [data.email, data.fullName, data.username]);

  return (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="relative mb-24">
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
        Success! 🎉
      </h2>
      <p className="text-ivory-60 text-16 leading-relaxed mb-32">
        Welcome to the family, <span className="text-gold font-bold">@{data.username}</span>
      </p>

      <div className="w-full bg-white/5 backdrop-blur-md border border-gold-border rounded-2xl p-24 mb-32 text-left">
        <div className="flex justify-between items-start mb-16">
          <div>
            <span className="text-[10px] font-bold text-ivory-40 uppercase tracking-widest block mb-4">Member ID</span>
            <div className="text-18 font-headline font-bold text-ivory">@{data.username}</div>
          </div>
          <div className="bg-gold/10 border border-gold/20 px-10 py-4 rounded-full">
            <span className="text-[10px] font-bold text-gold uppercase tracking-tighter">Standard</span>
          </div>
        </div>
        <div className="pt-16 border-t border-white/5 flex items-center gap-12 text-ivory-50">
          <PartyPopper size={18} className="text-gold" />
          <p className="text-[13px] leading-snug">
            Your referral link is now active. Start sharing to earn!
          </p>
        </div>
      </div>

      <div className="w-full space-y-16">
        <Link href="/dashboard?prompt=activate" className="block w-full">
          <GoldButton className="w-full h-[56px]">
            <Rocket className="mr-8" size={18} />
            Activate & Earn Now
          </GoldButton>
        </Link>

        <Link href="/dashboard" className="block w-full">
          <button className="w-full h-[54px] rounded-xl font-headline font-bold text-[15px] text-ivory-40 hover:text-ivory hover:bg-white/5 transition-all flex items-center justify-center gap-8 group">
            <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform" />
            Go to Dashboard
            <ChevronRight size={16} />
          </button>
        </Link>
      </div>

      <p className="mt-32 text-ivory-30 text-[11px] leading-relaxed">
        Payouts are processed every Friday for active cycles.<br />
        Bank verification complete for account: <span className="text-gold opacity-80">{data.accountNumber}</span>
      </p>
    </div>
  );
}
