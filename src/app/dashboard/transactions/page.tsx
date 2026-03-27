'use client';

import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Filter, 
  Clock,
  ChevronDown,
  Calendar
} from 'lucide-react';

const FILTERS = ['All', 'Earnings', 'Withdrawals', 'Transfers'];

export default function TransactionsPage() {
  const [activeFilter, setActiveTab] = useState('All');

  return (
    <DashboardShell>
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="font-headline font-bold text-2xl text-ivory">Transactions</h1>
            <p className="text-ivory/40 text-sm mt-1">Full history of your account activity.</p>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-ivory/20 border border-white/10">
            <Receipt size={24} />
          </div>
        </header>

        {/* Summary Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-[10px] font-bold text-ivory/20 uppercase tracking-widest mb-1">Total Inflow</p>
            <p className="text-xl font-bold text-emerald">₦0.00</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-[10px] font-bold text-ivory/20 uppercase tracking-widest mb-1">Total Outflow</p>
            <p className="text-xl font-bold text-error">₦0.00</p>
          </div>
        </div>

        {/* Filters and Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto hide-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveTab(f)}
                className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeFilter === f ? 'bg-gold text-obsidian shadow-sm' : 'text-ivory/40 hover:text-ivory'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-ivory/60 hover:text-ivory transition-all">
            <Calendar size={14} /> This Month <ChevronDown size={14} />
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-6">
          {/* Day Group */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-bold text-ivory/20 uppercase tracking-[0.2em]">Recent Activity</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
              {/* Empty State */}
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                  <Clock size={32} className="text-ivory/10" />
                </div>
                <h3 className="text-sm font-bold text-ivory/40">No transactions found</h3>
                <p className="text-xs text-ivory/20 mt-1 max-w-[200px] mx-auto">
                  When you refer friends or withdraw funds, they will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Load More */}
        <button className="w-full py-4 text-[11px] font-bold text-gold uppercase tracking-[0.25em] hover:bg-gold/5 rounded-xl transition-all border border-dashed border-gold/20">
          Load Full History
        </button>
      </div>
    </DashboardShell>
  );
}
