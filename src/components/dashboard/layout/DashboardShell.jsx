'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from './DashboardHeader';
import { SidebarNav } from './SidebarNav';
import { BottomNav } from './BottomNav';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

export default function DashboardShell({ children }) {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auth Protection
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="min-h-svh bg-obsidian flex flex-col items-center justify-center gap-16">
        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center animate-pulse shadow-button-glow">
          <span className="font-headline font-bold text-gold text-20">G+</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-gold/40" size={24} />
          <span className="text-ivory/30 text-xs font-medium uppercase tracking-[0.2em]">Securing Session</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-svh bg-obsidian text-ivory relative overflow-hidden flex font-body">
      {/* Ambient Glow Circles */}
      <div 
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full blur-[80px] pointer-events-none opacity-20 z-0"
        style={{ backgroundColor: 'rgba(6, 78, 59, 0.6)' }}
      />
      <div 
        className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[60px] pointer-events-none opacity-10 z-0"
        style={{ backgroundColor: 'rgba(183, 134, 44, 0.6)' }}
      />

      {/* Desktop Sidebar */}
      {!isMobile && <SidebarNav />}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-svh relative z-10 ${!isMobile ? 'ml-60' : ''}`}>
        <DashboardHeader />
        
        <main className={`flex-1 overflow-y-auto ${isMobile ? 'pb-24' : ''}`}>
          <div className={`${isMobile ? 'p-4' : 'max-w-[800px] mx-auto p-6 lg:px-8'}`}>
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        {isMobile && <BottomNav />}
      </div>
    </div>
  );
}
