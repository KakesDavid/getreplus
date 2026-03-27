'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Trophy, 
  Sparkles, 
  UserCircle 
} from 'lucide-react';

const items = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Referrals', href: '/dashboard/referrals', icon: Users },
  { name: 'Ranks', href: '/dashboard/leaderboard', icon: Trophy },
  { name: 'Spin', href: '/dashboard/spin', icon: Sparkles },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircle }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="h-16 fixed bottom-0 left-0 right-0 bg-obsidian/95 backdrop-blur-lg border-t border-white/5 grid grid-cols-5 z-40 px-1 pb-safe">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-colors"
          >
            {isActive && (
              <div className="absolute top-0 w-8 h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(183,134,44,0.5)]" />
            )}
            <Icon 
              size={22} 
              className={`transition-colors duration-300 ${isActive ? 'text-gold' : 'text-ivory/30'}`} 
            />
            <span 
              className={`text-[9px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                isActive ? 'text-gold' : 'text-ivory/25'
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
