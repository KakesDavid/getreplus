'use client';

import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { useDashboardData } from '@/hooks/useDashboardData';
import { 
  Sparkles, 
  RotateCcw, 
  Wallet, 
  Info, 
  History, 
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function SpinPage() {
  const { user, loading } = useDashboardData();
  const [source, setSource] = useState('main');

  if (loading) {
    return (
      <DashboardShell>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-white/5 rounded" />
          <div className="h-80 bg-white/5 rounded-2xl" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="font-headline font-bold text-2xl text-ivory">Spin Wheel</h1>
            <p className="text-ivory/40 text-sm mt-1">Win instant cash prizes up to ₦200.</p>
          </div>
          <div className="w-12 h-12 bg-emerald/10 rounded-2xl flex items-center justify-center text-emerald border border-emerald/20 shadow-[0_0_15px_rgba(6,95,70,0.2)]">
            <Sparkles size={24} />
          </div>
        </header>

        {/* Session Cost Card */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[10px] font-bold text-ivory/30 uppercase tracking-widest mb-1">Session Cost</p>
            <h2 className="text-3xl font-headline font-bold text-ivory">₦100 <span className="text-gold text-sm">for 2 Spins</span></h2>
            <p className="text-xs text-ivory/40 mt-2 flex items-center justify-center sm:justify-start gap-1">
              <Info size={12} /> Prizes are added to Earning Wallet instantly.
            </p>
          </div>
          
          <div className="w-full sm:w-auto space-y-2">
            <p className="text-[9px] font-bold text-ivory/20 uppercase text-center sm:text-left">Pay from:</p>
            <div className="flex p-1 bg-black/40 rounded-xl border border-white/10">
              <button 
                onClick={() => setSource('main')}
                className={`flex-1 px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-2 ${
                  source === 'main' ? 'bg-white/10 text-ivory' : 'text-ivory/30 hover:text-ivory/60'
                }`}
              >
                <Wallet size={12} /> Main
              </button>
              <button 
                onClick={() => setSource('earning')}
                className={`flex-1 px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-2 ${
                  source === 'earning' ? 'bg-white/10 text-ivory' : 'text-ivory/30 hover:text-ivory/60'
                }`}
              >
                <RotateCcw size={12} /> Earning
              </button>
            </div>
          </div>
        </div>

        {/* Wheel Display Placeholder */}
        <div className="relative aspect-square max-w-[320px] mx-auto group">
          {/* Wheel Graphic */}
          <div className="absolute inset-0 rounded-full border-[12px] border-white/5 bg-black/40 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="w-full h-full border-[2px] border-dashed border-gold/20 rounded-full animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gold rounded-full z-10 border-4 border-obsidian shadow-xl" />
          </div>
          
          {/* Pointer */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-gold z-20" />
          
          {/* Spin Button */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <button className="w-24 h-24 bg-gold-gradient rounded-full font-headline font-bold text-obsidian shadow-2xl hover:scale-105 active:scale-90 transition-all border-4 border-obsidian">
              SPIN
            </button>
          </div>
        </div>

        {/* Prize Legend */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 grid grid-cols-3 gap-2">
          {[
            { p: "₦200", l: "Jackpot", c: "text-gold" },
            { p: "₦50", l: "Normal", c: "text-ivory" },
            { p: "₦20", l: "Minimum", c: "text-ivory/40" },
          ].map((item, i) => (
            <div key={i} className="text-center p-2 rounded-xl bg-black/20">
              <p className={`text-sm font-bold ${item.c}`}>{item.p}</p>
              <p className="text-[9px] uppercase tracking-widest text-ivory/20 font-bold">{item.l}</p>
            </div>
          ))}
        </div>

        {/* Access Warning */}
        {!user?.isActive && (
          <div className="bg-gold/10 border border-gold/20 p-4 rounded-xl flex items-start gap-3">
            <ShieldAlert className="text-gold shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-xs font-bold text-gold uppercase tracking-wider">Account Not Active</p>
              <p className="text-[11px] text-ivory/60 mt-1 leading-relaxed">
                You can play the wheel now, but you must activate your account to withdraw your winnings.
              </p>
              <button className="mt-3 text-[11px] font-bold text-ivory flex items-center gap-1 hover:underline">
                Activate Now <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}

        {/* History */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-headline font-bold text-ivory flex items-center gap-2">
              <History size={16} className="text-gold" /> Spin History
            </h3>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl divide-y divide-white/5">
            <div className="p-12 text-center text-ivory/20">
              <RotateCcw size={32} className="mx-auto mb-2 opacity-10" />
              <p className="text-xs font-bold uppercase tracking-widest">No history yet</p>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
