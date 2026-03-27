'use client';

import React from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { useDashboardData } from '@/hooks/useDashboardData';
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  Copy, 
  Share2, 
  ArrowUpRight, 
  Send, 
  Sparkles, 
  PlusCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useDashboardData();

  if (loading) {
    return (
      <DashboardShell>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-white/5 rounded" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-white/5 rounded-2xl" />
            <div className="h-32 bg-white/5 rounded-2xl" />
          </div>
          <div className="h-40 bg-white/5 rounded-2xl" />
        </div>
      </DashboardShell>
    );
  }

  const referralUrl = `https://getreplus.com/signup?ref=${user?.username?.toUpperCase()}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    alert('Referral link copied!');
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="font-headline font-bold text-2xl text-ivory">Welcome back, {user?.fullName?.split(' ')[0]} 👋</h1>
            <p className="text-ivory/40 text-sm mt-1">Here is what is happening with your earnings.</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
            user?.tier === 'premium' ? 'bg-emerald/10 border-emerald/20 text-emerald' : 'bg-gold/10 border-gold/20 text-gold'
          }`}>
            {user?.tier === 'premium' ? 'Premium ⭐' : 'Standard Member'}
          </div>
        </header>

        {/* Wallets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#111] border border-white/5 p-5 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                <TrendingUp size={20} />
              </div>
              <span className="text-[10px] font-bold text-ivory/20 uppercase tracking-widest">Earning Wallet</span>
            </div>
            <p className="font-code font-bold text-3xl text-ivory">₦{(user?.earningWallet || 0).toLocaleString()}</p>
            <p className="text-[11px] text-ivory/40 mt-2">Profits from referrals and tasks</p>
          </div>

          <div className="bg-[#111] border border-white/5 p-5 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-emerald/10 rounded-xl flex items-center justify-center text-emerald">
                <Wallet size={20} />
              </div>
              <span className="text-[10px] font-bold text-ivory/20 uppercase tracking-widest">Main Wallet</span>
            </div>
            <p className="font-code font-bold text-3xl text-ivory">₦{(user?.mainWallet || 0).toLocaleString()}</p>
            <p className="text-[11px] text-ivory/40 mt-2">Available for spins and transfers</p>
          </div>
        </div>

        {/* Referral Progress */}
        <div className="bg-[#111] border border-gold/10 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={80} className="text-gold" />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-bold text-ivory flex items-center gap-2">
                Current Cycle <span className="text-gold text-xs px-2 py-0.5 bg-gold/10 rounded-full">{(user?.referralCountCycle || 0)}/5</span>
              </h3>
              <Link href="/dashboard/referrals" className="text-xs text-gold hover:underline">View History</Link>
            </div>
            
            <div className="space-y-4">
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold-gradient shadow-[0_0_12px_rgba(183,134,44,0.3)] transition-all duration-1000"
                  style={{ width: `${((user?.referralCountCycle || 0) / 5) * 100}%` }}
                />
              </div>
              <p className="text-[13px] text-ivory/60">
                {user?.referralCountCycle === 0 
                  ? "Refer your first friend to start earning!" 
                  : `You need ${5 - (user?.referralCountCycle || 0)} more referrals to unlock your Friday withdrawal.`}
              </p>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-sm font-bold text-ivory uppercase tracking-widest mb-4">Your Referral Link</h3>
            <div className="flex gap-2">
              <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-code text-gold text-sm truncate">
                {referralUrl}
              </div>
              <button 
                onClick={copyToClipboard}
                className="w-12 h-12 bg-gold text-obsidian rounded-xl flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/5 bg-white/[0.02]">
            <div className="p-4 text-center">
              <p className="text-[10px] text-ivory/30 uppercase font-bold">Total Ref</p>
              <p className="text-ivory font-bold">{user?.totalReferrals || 0}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] text-ivory/30 uppercase font-bold">This Week</p>
              <p className="text-gold font-bold">{user?.weeklyReferrals || 0}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] text-ivory/30 uppercase font-bold">Total Earned</p>
              <p className="text-emerald font-bold">₦{((user?.totalReferrals || 0) * (user?.tier === 'premium' ? 1500 : 500)).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all gap-2 group">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-[11px] font-bold text-ivory/60 uppercase tracking-tighter">Withdraw</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all gap-2 group">
            <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center text-emerald group-hover:scale-110 transition-transform">
              <Send size={20} />
            </div>
            <span className="text-[11px] font-bold text-ivory/60 uppercase tracking-tighter">Transfer</span>
          </button>
          <Link href="/dashboard/spin" className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all gap-2 group">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className="text-[11px] font-bold text-ivory/60 uppercase tracking-tighter">Spin & Win</span>
          </Link>
          <button className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all gap-2 group">
            <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center text-emerald group-hover:scale-110 transition-transform">
              <PlusCircle size={20} />
            </div>
            <span className="text-[11px] font-bold text-ivory/60 uppercase tracking-tighter">Add Funds</span>
          </button>
        </div>

        {/* Recent Transactions */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline font-bold text-ivory">Recent Transactions</h3>
            <Link href="/dashboard/transactions" className="text-xs text-ivory/40 hover:text-gold flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="bg-[#111] border border-white/5 rounded-2xl divide-y divide-white/5">
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-ivory/20" />
              </div>
              <p className="text-sm font-bold text-ivory/40">No transactions yet</p>
              <p className="text-xs text-ivory/20 mt-1">Your activities will appear here</p>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
