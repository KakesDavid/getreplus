'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { useDashboardData } from '@/hooks/useDashboardData';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useDashboardData();
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);

  // Handle Activation Prompt from URL
  useEffect(() => {
    if (searchParams.get('prompt') === 'activate') {
      setIsActivationModalOpen(true);
      // Clean URL after modal is triggered to prevent re-opening on refresh
      router.replace('/dashboard');
    }
  }, [searchParams, router]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-3 py-1 rounded-full mb-4">
          <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
            {user?.tier === 'premium' ? 'Premium Member ⭐' : 'Standard Member'}
          </span>
        </div>
        <h1 className="font-headline font-bold text-2xl lg:text-3xl text-ivory">
          Welcome back, {loading ? '...' : user?.fullName?.split(' ')[0] || 'Member'} 👋
        </h1>
        <p className="text-ivory/50 text-sm mt-1">Here is what is happening with your account today.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Dashboard Grid */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center border-dashed">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-24">🚀</span>
          </div>
          <h2 className="font-headline font-bold text-xl text-ivory mb-2">Platform Launching Phase 2</h2>
          <p className="text-ivory/40 text-sm max-w-[320px] mx-auto">
            Your dashboard components (Wallet, Progress, and Recent Activity) are being connected to the new payout engine.
          </p>
        </div>
      </div>

      {/* Activation Modal Placeholder - Will be implemented in Phase 2 */}
      {isActivationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface border border-gold/20 p-8 rounded-3xl max-w-md w-full text-center">
            <div className="text-40 mb-4">💰</div>
            <h3 className="font-headline font-bold text-2xl text-ivory mb-2">Activate Your Account</h3>
            <p className="text-ivory/60 text-sm mb-8 leading-relaxed">
              To start sharing your link and earning every Friday, you need to choose an activation plan.
            </p>
            <div className="space-y-3">
              <button className="w-full h-14 bg-gold-gradient text-obsidian font-bold rounded-xl shadow-lg">Choose Plan & Pay</button>
              <button 
                onClick={() => setIsActivationModalOpen(false)}
                className="w-full h-12 text-ivory/40 text-sm font-medium"
              >
                I'll do it later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<div className="text-ivory/20">Loading dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </DashboardShell>
  );
}
