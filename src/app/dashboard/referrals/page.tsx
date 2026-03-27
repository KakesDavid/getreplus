'use client';

import React from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';

export default function ReferralsPage() {
  return (
    <DashboardShell>
      <header className="mb-8">
        <h1 className="font-headline font-bold text-2xl lg:text-3xl text-ivory">Your Referrals</h1>
        <p className="text-ivory/50 text-sm mt-1">Track your cycles and referral rewards.</p>
      </header>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 flex items-center justify-center border-dashed">
        <span className="text-ivory/20 font-bold uppercase tracking-widest">Referrals Content Coming Soon</span>
      </div>
    </DashboardShell>
  );
}
