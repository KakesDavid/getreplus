'use client';

import React, { Suspense } from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { useDashboardData } from '@/hooks/useDashboardData';

function ProfileContent() {
  const { user, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="space-y-6">
        <header className="mb-8">
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-white/10 rounded mt-2 animate-pulse"></div>
        </header>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-5 w-full bg-white/10 rounded animate-pulse"></div>
            <div className="h-5 w-full bg-white/10 rounded animate-pulse"></div>
            <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Safely mask bank account number
  const maskAccountNumber = (accountNumber: string) => {
    if (!accountNumber) return 'Not added';
    if (accountNumber.length <= 4) return '****';
    return `****${accountNumber.slice(-4)}`;
  };

  // Format date
  const formatDate = (date: any) => {
    if (!date) return 'Not available';
    try {
      if (date.toDate) {
        return date.toDate().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
      }
      return new Date(date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'Not available';
    }
  };

  // Get tier display
  const getTierDisplay = () => {
    if (!user) return 'Standard';
    return user.tier === 'premium' ? 'Premium ⭐' : 'Standard';
  };

  // Get account status
  const isAccountActive = () => {
    return user?.isActive === true;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="font-headline font-bold text-2xl lg:text-3xl text-ivory">Profile & Settings</h1>
        <p className="text-ivory/50 text-sm mt-1">Manage your account information</p>
      </header>

      {/* Profile Header Card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center border-2 border-gold/30">
              <span className="text-3xl font-bold text-gold">
                {user?.fullName?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-ivory">{user?.fullName || 'Member'}</h2>
              <p className="text-ivory/40 text-sm">@{user?.username || 'username'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierDisplay() === 'Premium ⭐' ? 'bg-emerald/20 text-emerald' : 'bg-gold/20 text-gold'}`}>
                  {getTierDisplay()}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isAccountActive() ? 'bg-emerald/20 text-emerald' : 'bg-gold/20 text-gold'}`}>
                  {isAccountActive() ? 'Active ✅' : 'Not Activated'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-ivory/60 uppercase tracking-wider mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-3 rounded-xl">
              <p className="text-ivory/40 text-xs">Full Name</p>
              <p className="text-ivory font-medium">{user?.fullName || 'Not set'}</p>
            </div>
            <div className="bg-black/20 p-3 rounded-xl">
              <p className="text-ivory/40 text-xs">Username</p>
              <p className="text-ivory font-medium">@{user?.username || 'Not set'}</p>
            </div>
            <div className="bg-black/20 p-3 rounded-xl">
              <p className="text-ivory/40 text-xs">Email</p>
              <p className="text-ivory font-medium">{user?.email || 'Not set'}</p>
            </div>
            <div className="bg-black/20 p-3 rounded-xl">
              <p className="text-ivory/40 text-xs">Phone</p>
              <p className="text-ivory font-medium">{user?.phone || 'Not set'}</p>
            </div>
            <div className="bg-black/20 p-3 rounded-xl">
              <p className="text-ivory/40 text-xs">Member Since</p>
              <p className="text-ivory font-medium">{formatDate(user?.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Bank Account Section */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-sm font-semibold text-ivory/60 uppercase tracking-wider mb-4">Bank Account</h3>
          {user?.bankName && user?.bankAccountNumber ? (
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="text-ivory/40 text-xs">Bank Name</p>
                  <p className="text-ivory font-medium">{user.bankName}</p>
                </div>
                <div>
                  <p className="text-ivory/40 text-xs">Account Number</p>
                  <p className="text-ivory font-mono">{maskAccountNumber(user.bankAccountNumber)}</p>
                </div>
                <div>
                  <p className="text-ivory/40 text-xs">Account Name</p>
                  <p className="text-ivory text-sm">{user.bankAccountName || 'Not verified'}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-[10px] text-emerald flex items-center gap-1">
                  <span>✓</span> Verified by Paystack
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 text-center">
              <p className="text-ivory/60 text-sm">No bank account linked</p>
              <p className="text-ivory/40 text-xs mt-1">Bank details are collected during signup</p>
            </div>
          )}
        </div>

        {/* Referral Statistics */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-sm font-semibold text-ivory/60 uppercase tracking-wider mb-4">Referral Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/20 p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-gold">{user?.totalReferrals || 0}</p>
              <p className="text-ivory/40 text-xs">Total Referrals</p>
            </div>
            <div className="bg-black/20 p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-gold">{user?.weeklyReferrals || 0}</p>
              <p className="text-ivory/40 text-xs">This Week</p>
            </div>
            <div className="bg-black/20 p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-gold">₦{(user?.totalReferrals || 0) * (user?.tier === 'premium' ? 1500 : 500)}</p>
              <p className="text-ivory/40 text-xs">Total Earned</p>
            </div>
            <div className="bg-black/20 p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-gold">{user?.referralCountCycle || 0}/5</p>
              <p className="text-ivory/40 text-xs">Current Cycle</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-sm font-semibold text-error uppercase tracking-wider mb-4">Danger Zone</h3>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to sign out?')) {
                // Sign out logic will be added later
                console.log('Sign out clicked');
              }
            }}
            className="bg-error/10 border border-error/20 text-error px-4 py-2 rounded-xl text-sm font-medium hover:bg-error/20 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <DashboardShell>
      <Suspense fallback={<div className="text-ivory/20">Loading profile...</div>}>
        <ProfileContent />
      </Suspense>
    </DashboardShell>
  );
}