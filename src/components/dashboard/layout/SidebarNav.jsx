'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  Sparkles, 
  Receipt, 
  UserCircle,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Referrals', href: '/dashboard/referrals', icon: Users },
  { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
  { name: 'Spin Wheel', icon: Sparkles, href: '/dashboard/spin' },
  { name: 'Transactions', icon: Receipt, href: '/dashboard/transactions' },
  { name: 'Profile', icon: UserCircle, href: '/dashboard/profile' }
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, loading } = useDashboardData();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      await signOut(auth);
      router.push('/login');
    }
  };

  return (
    <aside className="w-60 h-screen fixed left-0 top-0 bg-obsidian border-r border-white/5 flex flex-col py-5 z-30">
      {/* Logo Block */}
      <div className="px-5 pb-5 border-b border-white/5 mb-4">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-headline font-bold text-gold text-lg shadow-lg">
            G+
          </div>
          <span className="font-headline font-bold text-ivory text-lg tracking-tight">GetrePlus</span>
        </Link>
      </div>

      {/* User Block */}
      <div className="px-5 py-4 border-b border-white/5 mb-4 flex items-center gap-3">
        {loading ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-24 bg-white/5 animate-pulse rounded" />
              <div className="h-2 w-16 bg-white/5 animate-pulse rounded" />
            </div>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full border border-gold/30 overflow-hidden flex items-center justify-center bg-gold/10 shrink-0">
              {user?.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="font-headline font-bold text-sm text-gold">{getInitials(user?.fullName)}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm text-ivory truncate">{user?.fullName || 'User'}</span>
              <span className="text-[11px] text-ivory/40 font-medium">@{user?.username || 'username'}</span>
            </div>
          </>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`w-full h-11 rounded-xl flex items-center gap-3 px-3 transition-all relative group ${
                isActive 
                  ? 'bg-gold/8 border border-gold/15 text-gold' 
                  : 'text-ivory/50 hover:text-ivory hover:bg-white/5'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 w-1 h-5 bg-gold rounded-r-full shadow-[0_0_8px_rgba(183,134,44,0.5)]" />
              )}
              <Icon size={18} className={isActive ? 'text-gold' : 'text-ivory/40 group-hover:text-ivory/70'} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto px-3 space-y-2">
        <button 
          onClick={handleLogout}
          className="w-full h-11 rounded-xl flex items-center gap-3 px-3 text-error/60 hover:text-error hover:bg-error/5 transition-all group"
        >
          <LogOut size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>

        <div className="py-3 border-t border-white/5">
          {loading ? (
            <div className="h-16 w-full bg-white/5 animate-pulse rounded-xl" />
          ) : (
            !user?.isActive ? (
              <div className="bg-gold/5 border border-gold/15 rounded-xl p-3">
                <p className="text-[10px] font-bold text-gold/60 uppercase tracking-widest mb-2">Account Status</p>
                <button 
                  onClick={() => router.push('/dashboard?prompt=activate')}
                  className="w-full h-9 bg-gold-gradient text-obsidian rounded-lg text-[11px] font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  Activate Now <ChevronRight size={12} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald/5 rounded-xl border border-emerald/10">
                <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald">Account Active</span>
              </div>
            )
          )}
        </div>
      </div>
    </aside>
  );
}
