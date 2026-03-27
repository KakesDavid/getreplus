'use client';

import React from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function DashboardPage() {
  const { user, loading } = useDashboardData();

  return (
    <DashboardShell>
      <div className="space-y-6">
        <header className="mb-8">
          <h1 className="font-headline font-bold text-2xl lg:text-3xl text-ivory">
            Welcome back, {loading ? '...' : user?.fullName?.split(' ')[0] || 'Member'} 👋
          </h1>
          <p className="text-ivory/50 text-sm mt-1">Here is what is happening with your account today.</p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {/* Dashboard implementation Phase 2 will fill these cards */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center border-dashed">
            <p className="text-ivory/30 font-medium">Dashboard components coming in Phase 2</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
