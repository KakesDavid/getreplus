'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationsPanel } from '../notifications/NotificationsPanel';
import { colors } from '@/styles/design-tokens';

export function DashboardHeader() {
  const router = useRouter();
  const { user, loading } = useDashboardData();
  const { unreadCount } = useNotifications();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <header className="h-16 sticky top-0 z-40 bg-obsidian/90 backdrop-blur-md border-b border-white/5 px-4 lg:px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center group lg:pointer-events-auto pointer-events-none">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-headline font-bold text-gold text-lg shadow-sm">
              G+
            </div>
            <span className="ml-2.5 font-headline font-bold text-ivory text-lg hidden sm:block">GetrePlus</span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Tier Badge */}
          {loading ? (
            <div className="w-20 h-7 rounded-full bg-white/5 animate-pulse hidden sm:block" />
          ) : (
            user && (
              <div className={`hidden sm:flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                user.tier === 'premium' 
                  ? 'bg-emerald/10 border-emerald/20 text-emerald' 
                  : 'bg-gold/10 border-gold/20 text-gold'
              }`}>
                {user.tier === 'premium' ? 'Premium ⭐' : 'Standard'}
              </div>
            )
          )}

          {/* Notifications Bell */}
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 text-ivory/60 hover:text-ivory transition-colors"
            aria-label="Notifications"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error border-2 border-obsidian" />
            )}
          </button>

          {/* User Avatar */}
          <button 
            onClick={() => router.push('/dashboard/profile')}
            className="group flex items-center"
          >
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse border border-white/10" />
            ) : (
              <div className="w-8 h-8 rounded-full border border-gold/30 overflow-hidden flex items-center justify-center bg-gold/10 transition-all group-hover:border-gold">
                {user?.profilePictureUrl ? (
                  <img 
                    src={user.profilePictureUrl} 
                    alt={user.fullName} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="font-headline font-bold text-[13px] text-gold">
                    {getInitials(user?.fullName)}
                  </span>
                )}
              </div>
            )}
          </button>
        </div>
      </header>

      <NotificationsPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </>
  );
}
