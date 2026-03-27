'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, ShieldAlert, User, Mail, Phone, Landmark } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useDashboardData();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      await signOut(auth);
      router.push('/login');
    }
  };

  return (
    <DashboardShell>
      <header className="mb-8">
        <h1 className="font-headline font-bold text-2xl lg:text-3xl text-ivory">Your Profile</h1>
        <p className="text-ivory/50 text-sm mt-1">Manage your account and bank details.</p>
      </header>

      <div className="space-y-6">
        {/* Personal Info Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
            <User size={18} className="text-gold" />
            <h2 className="font-headline font-bold text-sm text-ivory uppercase tracking-wider">Identity Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ivory/30 uppercase tracking-widest">Full Name</label>
              <p className="text-ivory font-medium">{loading ? '...' : user?.fullName}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ivory/30 uppercase tracking-widest">Username</label>
              <p className="text-gold font-bold">@{loading ? '...' : user?.username}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ivory/30 uppercase tracking-widest">Email Address</label>
              <p className="text-ivory/70">{loading ? '...' : user?.email}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ivory/30 uppercase tracking-widest">Phone Number</label>
              <p className="text-ivory/70">{loading ? '...' : user?.phone}</p>
            </div>
          </div>
        </div>

        {/* Bank Account Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
            <Landmark size={18} className="text-gold" />
            <h2 className="font-headline font-bold text-sm text-ivory uppercase tracking-wider">Payout Account</h2>
          </div>
          <div className="p-6">
            {user?.bankAccount ? (
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-xl font-headline font-bold text-gold">{user.bankAccount.bankName}</p>
                    <p className="text-ivory/40 text-xs uppercase tracking-tighter">Verified Withdrawal Channel</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center text-emerald">✓</div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <label className="text-[9px] font-bold text-ivory/30 uppercase">Account Number</label>
                    <p className="text-ivory font-mono tracking-wider">{user.bankAccount.accountNumber}</p>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-ivory/30 uppercase">Beneficiary Name</label>
                    <p className="text-ivory truncate">{user.bankAccount.accountName}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-ivory/40 text-sm">No bank account linked yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Security / Danger Zone */}
        <div className="bg-error/5 border border-error/20 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-error/10 bg-error/[0.02] flex items-center gap-3">
            <ShieldAlert size={18} className="text-error" />
            <h2 className="font-headline font-bold text-sm text-error uppercase tracking-wider">Danger Zone</h2>
          </div>
          <div className="p-6">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-error font-bold hover:underline"
            >
              <LogOut size={18} />
              Sign Out of Account
            </button>
            <p className="mt-2 text-error/40 text-xs">
              This will end your current session. You will need your credentials to log back in.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
