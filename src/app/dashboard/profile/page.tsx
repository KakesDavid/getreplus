'use client';

import React from 'react';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  Landmark, 
  ShieldCheck, 
  LogOut, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

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

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <DashboardShell>
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-white/5 rounded-2xl" />
          <div className="h-64 bg-white/5 rounded-2xl" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <header>
          <h1 className="font-headline font-bold text-2xl text-ivory">Your Profile</h1>
          <p className="text-ivory/40 text-sm mt-1">Manage your identity and payout account.</p>
        </header>

        {/* Identity Card */}
        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 flex items-center gap-4 bg-white/[0.02] border-b border-white/5">
            <div className="w-16 h-16 rounded-2xl border-2 border-gold/30 flex items-center justify-center bg-gold/10 shadow-lg">
              {user?.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt="" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <span className="font-headline font-bold text-2xl text-gold">{getInitials(user?.fullName)}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-ivory">{user?.fullName}</h2>
              <p className="text-gold font-bold text-sm tracking-wide">@{user?.username}</p>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ivory/20 uppercase tracking-widest flex items-center gap-1.5">
                <Mail size={10} /> Email Address
              </label>
              <p className="text-ivory/80 font-medium">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-ivory/20 uppercase tracking-widest flex items-center gap-1.5">
                <Phone size={10} /> Phone Number
              </label>
              <p className="text-ivory/80 font-medium">{user?.phone}</p>
            </div>
          </div>
        </div>

        {/* Bank Account */}
        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <h3 className="text-[11px] font-bold text-ivory/40 uppercase tracking-widest flex items-center gap-2">
              <Landmark size={14} className="text-gold" /> Payout Account
            </h3>
            <div className="flex items-center gap-1.5 text-emerald bg-emerald/10 px-2 py-0.5 rounded-md">
              <ShieldCheck size={12} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Verified</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Landmark size={60} className="text-gold" />
              </div>
              <div className="relative z-10">
                <p className="text-gold font-headline font-bold text-lg leading-none mb-1 uppercase">{user?.bankName}</p>
                <p className="text-ivory font-code text-xl tracking-[0.2em] mb-4">
                  ****{user?.bankAccountNumber?.slice(-4)}
                </p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[9px] text-ivory/20 uppercase font-bold mb-0.5">Beneficiary Name</p>
                  <p className="text-ivory/80 font-bold text-sm uppercase">{user?.bankAccountName}</p>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-ivory/30 mt-4 leading-relaxed italic">
              * For security, bank details cannot be changed manually. Contact support if you need to update your payout channel.
            </p>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#111] border border-white/5 p-5 rounded-2xl text-center">
            <p className="text-[10px] text-ivory/30 uppercase font-bold mb-1">Weekly Referrals</p>
            <p className="text-2xl font-bold text-ivory">{user?.weeklyReferrals || 0}</p>
          </div>
          <div className="bg-[#111] border border-white/5 p-5 rounded-2xl text-center">
            <p className="text-[10px] text-ivory/30 uppercase font-bold mb-1">Total Cycles</p>
            <p className="text-2xl font-bold text-ivory">{Math.floor((user?.totalReferrals || 0) / 5)}</p>
          </div>
        </div>

        {/* Security & Support */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gold/10 rounded-lg flex items-center justify-center text-gold">
                <ShieldCheck size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-ivory">Security Settings</p>
                <p className="text-[11px] text-ivory/40">Password and authentication</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-ivory/20 group-hover:text-gold" />
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-error/5 border border-error/10 rounded-xl hover:bg-error/10 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-error/10 rounded-lg flex items-center justify-center text-error">
                <LogOut size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-error">Sign Out</p>
                <p className="text-[11px] text-error/40">End current session</p>
              </div>
            </div>
            <ShieldAlert size={16} className="text-error/20" />
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
