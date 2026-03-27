'use client';

import React from 'react';
import { 
  Bell, 
  X, 
  Users, 
  ArrowUp, 
  Sparkles, 
  Trophy, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Zap,
  Clock
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

const iconMap = {
  referral_reward: { icon: Users, bg: 'bg-gold/10', text: 'text-gold' },
  withdrawal: { icon: ArrowUp, bg: 'bg-emerald/10', text: 'text-emerald' },
  spin: { icon: Sparkles, bg: 'bg-gold/10', text: 'text-gold' },
  leaderboard_prize: { icon: Trophy, bg: 'bg-gold/10', text: 'text-gold' },
  transfer_received: { icon: ArrowDownLeft, bg: 'bg-emerald/10', text: 'text-emerald' },
  transfer_sent: { icon: ArrowUpRight, bg: 'bg-error/10', text: 'text-error' },
  entry_fee: { icon: Zap, bg: 'bg-gold/10', text: 'text-gold' }
};

export function NotificationsPanel({ isOpen, onClose }) {
  const { notifications, loading, markAsRead, markAllRead } = useNotifications();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[45] animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`
        fixed z-50 bg-obsidian border-white/5 shadow-2xl flex flex-col
        lg:top-0 lg:right-0 lg:bottom-0 lg:w-[380px] lg:border-l lg:animate-in lg:slide-in-from-right lg:duration-300
        bottom-0 left-0 right-0 rounded-t-[24px] max-h-[85vh] animate-in slide-in-from-bottom duration-350
      `}>
        {/* Mobile Drag Handle */}
        <div className="lg:hidden w-10 h-1.5 bg-white/10 rounded-full mx-auto mt-3 mb-1" />

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <h2 className="font-headline font-bold text-lg text-ivory">Notifications</h2>
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="bg-gold text-obsidian text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={markAllRead}
              className="text-xs font-bold text-gold hover:underline transition-all"
            >
              Mark all read
            </button>
            <button onClick={onClose} className="p-1.5 text-ivory/40 hover:text-ivory hover:bg-white/5 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 p-5 border-b border-white/5 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-white/5 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 bg-white/5 rounded" />
                  <div className="h-2 w-1/2 bg-white/5 rounded" />
                </div>
              </div>
            ))
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Bell size={32} className="text-ivory/20" />
              </div>
              <h3 className="text-sm font-bold text-ivory/60">No notifications yet</h3>
              <p className="text-xs text-ivory/30 mt-1 max-w-[200px]">
                Your activity notifications will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notif) => {
              const meta = iconMap[notif.type] || iconMap.entry_fee;
              const Icon = meta.icon;
              
              return (
                <div 
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`
                    p-5 border-b border-white/5 flex gap-4 transition-all cursor-pointer group
                    ${!notif.isRead ? 'bg-gold/[0.03] hover:bg-gold/[0.06]' : 'bg-transparent hover:bg-white/[0.02]'}
                  `}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.bg} ${meta.text} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] leading-relaxed ${!notif.isRead ? 'text-ivory font-medium' : 'text-ivory/60 font-normal'}`}>
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-ivory/30">
                      <Clock size={10} />
                      <span className="text-[10px] font-medium uppercase tracking-wider">
                        {notif.createdAt ? formatDistanceToNow(notif.createdAt.toDate(), { addSuffix: true }) : 'Just now'}
                      </span>
                    </div>
                  </div>

                  {!notif.isRead && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5 shadow-[0_0_8px_#B7862C]" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
