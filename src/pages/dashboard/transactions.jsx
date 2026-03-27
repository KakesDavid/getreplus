'use client';

import React from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';

export default function TransactionsPage() {
  return (
    <DashboardShell>
      <header className="mb-8">
        <h1 className="font-headline font-bold text-2xl lg:text-3xl text-ivory">Transaction History</h1>
        <p className="text-ivory/50 text-sm mt-1">Detailed log of all your earning and spending.</p>
      </header>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 flex items-center justify-center border-dashed">
        <span className="text-ivory/20 font-bold uppercase tracking-widest">Transactions Content Coming Soon</span>
      </div>
    </DashboardShell>
  );
}
