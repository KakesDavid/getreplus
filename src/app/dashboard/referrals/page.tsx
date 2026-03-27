'use client';

import React from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { useDashboardData } from '@/hooks/useDashboardData';
import { 
  Users, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Copy, 
  Share2, 
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Send
} from 'lucide-react';

export default function ReferralsPage() {
  const { user, loading } = useDashboardData();

  if (loading) {
    return (
      <DashboardShell>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-white/5 rounded" />
          <div className="h-64 bg-white/5 rounded-2xl" />
        </div>
      </DashboardShell>
    );
  }

  const referralUrl = `https://getreplus.com/signup?ref=${user?.username?.toUpperCase()}`;
  const earnRate = user?.tier === 'premium' ? 1500 : 500;

  return (
    <DashboardShell>
      <div className="space-y-6">
        <header>
          <h1 className="font-headline font-bold text-2xl text-ivory">Referral Program</h1>
          <p className="text-ivory/40 text-sm mt-1">Grow your network and earn every Friday.</p>
        </header>

        {/* How It Works Banner */}
        <div className="bg-gold-gradient p-6 rounded-2xl text-obsidian shadow-button-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={100} />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Your Earning Rate</p>
              <h2 className="text-3xl font-headline font-bold">₦{earnRate.toLocaleString()} <span className="text-lg opacity-70">per friend</span></h2>
            </div>
            <div className="bg-obsidian/10 backdrop-blur-sm border border-black/10 px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] font-bold uppercase">Target</p>
              <p className="text-xl font-bold font-code">₦{(earnRate * 5).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Sharing Center */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-[11px] font-bold text-ivory/40 uppercase tracking-widest mb-4">Sharing Link</h3>
            <div className="flex gap-2">
              <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-code text-gold text-sm truncate">
                {referralUrl}
              </div>
              <button className="w-12 h-12 bg-white/5 text-gold border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all">
                <Copy size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 h-12 bg-[#25D366] text-white rounded-xl font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">
              <MessageCircle size={18} /> WhatsApp
            </button>
            <button className="flex items-center justify-center gap-2 h-12 bg-[#0088cc] text-white rounded-xl font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">
              <Send size={18} /> Telegram
            </button>
          </div>
        </div>

        {/* How It Works List */}
        <section className="bg-[#111] border border-white/5 rounded-2xl p-6">
          <h3 className="font-headline font-bold text-ivory mb-6">How the cycle works</h3>
          <div className="space-y-6">
            {[
              { icon: Copy, title: "Share your unique link", text: "Invite friends to join GetrePlus using your username." },
              { icon: ShieldCheck, title: "Friends activate accounts", text: "Each activation counts towards your current cycle." },
              { icon: CheckCircle2, title: "Complete 5 referrals", text: "Fill your progress bar to unlock the Friday withdrawal." },
              { icon: Zap, title: "Start a new cycle", text: "Once paid, you can start a fresh cycle immediately." },
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                  <step.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-ivory">{step.title}</p>
                  <p className="text-xs text-ivory/40 mt-0.5">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cycle History */}
        <section className="space-y-4">
          <h3 className="font-headline font-bold text-ivory">Cycle History</h3>
          <div className="bg-[#111] border border-white/5 rounded-2xl divide-y divide-white/5">
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-ivory/20" />
              </div>
              <p className="text-sm font-bold text-ivory/40">No cycles completed yet</p>
              <p className="text-xs text-ivory/20 mt-1">Complete your first 5 referrals to see history</p>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
