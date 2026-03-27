'use client';

import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp, 
  Target,
  Search
} from 'lucide-react';

const TABS = ['Global', 'This Week', 'Premium'];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Global');

  return (
    <DashboardShell>
      <div className="space-y-6">
        <header className="flex justify-between items-start">
          <div>
            <h1 className="font-headline font-bold text-2xl text-ivory">Leaderboard</h1>
            <p className="text-ivory/40 text-sm mt-1">Top earners this week across Nigeria.</p>
          </div>
          <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20 shadow-button-glow">
            <Trophy size={24} />
          </div>
        </header>

        {/* Tab Selector */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                activeTab === tab ? 'bg-gold text-obsidian' : 'text-ivory/40 hover:text-ivory'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Prize Pool Banner */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Target size={100} className="text-gold" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 bg-gold-gradient rounded-2xl flex items-center justify-center text-obsidian shadow-lg shadow-gold/20">
              <Crown size={32} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Weekly Grand Prize</p>
              <h2 className="text-2xl font-headline font-bold text-ivory">₦10,000 Cash <span className="text-gold text-sm font-body">+ Badge</span></h2>
            </div>
          </div>
        </div>

        {/* Top 3 Podiums (Visual) */}
        <div className="grid grid-cols-3 gap-3 items-end pt-4 pb-2">
          {/* 2nd Place */}
          <div className="space-y-3">
            <div className="mx-auto w-14 h-14 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center relative">
              <span className="font-headline font-bold text-ivory/20">#2</span>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center text-[10px] font-bold text-obsidian">2</div>
            </div>
            <div className="bg-white/5 h-20 rounded-t-xl border-x border-t border-white/5 text-center p-2">
              <p className="text-[9px] font-bold text-ivory/40 truncate">@user_2</p>
              <p className="text-xs font-bold text-ivory">₦12,500</p>
            </div>
          </div>
          {/* 1st Place */}
          <div className="space-y-3">
            <div className="mx-auto w-18 h-18 rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center relative scale-110 shadow-[0_0_20px_rgba(183,134,44,0.3)]">
              <span className="font-headline font-bold text-gold">#1</span>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gold-gradient rounded-full flex items-center justify-center text-xs font-bold text-obsidian border-2 border-obsidian">1</div>
            </div>
            <div className="bg-gold/10 h-28 rounded-t-xl border-x border-t border-gold/20 text-center p-2 shadow-lg">
              <p className="text-[10px] font-bold text-gold truncate">@champion</p>
              <p className="text-sm font-bold text-ivory">₦22,500</p>
            </div>
          </div>
          {/* 3rd Place */}
          <div className="space-y-3">
            <div className="mx-auto w-14 h-14 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center relative">
              <span className="font-headline font-bold text-ivory/20">#3</span>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-700 rounded-full flex items-center justify-center text-[10px] font-bold text-obsidian">3</div>
            </div>
            <div className="bg-white/5 h-16 rounded-t-xl border-x border-t border-white/5 text-center p-2">
              <p className="text-[9px] font-bold text-ivory/40 truncate">@user_3</p>
              <p className="text-xs font-bold text-ivory">₦10,000</p>
            </div>
          </div>
        </div>

        {/* List */}
        <section className="bg-[#111] border border-white/5 rounded-2xl divide-y divide-white/5">
          <div className="p-4 bg-white/[0.02] flex justify-between text-[10px] font-bold text-ivory/30 uppercase tracking-widest">
            <span>Member</span>
            <span>Total Earned</span>
          </div>
          
          <div className="p-12 text-center">
            <p className="text-sm font-bold text-ivory/40">Leaderboard resetting...</p>
            <p className="text-xs text-ivory/20 mt-1">New rankings will appear shortly</p>
          </div>
        </section>

        {/* My Rank (Sticky equivalent) */}
        <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold border border-gold/20">
              <Star size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-ivory">Your Rank: --</p>
              <p className="text-[11px] text-ivory/40">Refer more to climb the ranks!</p>
            </div>
          </div>
          <TrendingUp size={20} className="text-gold opacity-40" />
        </div>
      </div>
    </DashboardShell>
  );
}
