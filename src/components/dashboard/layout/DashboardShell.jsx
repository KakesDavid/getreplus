'use client';

import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { SidebarNav } from './SidebarNav';
import { BottomNav } from './BottomNav';
import { colors } from '@/styles/design-tokens';

export default function DashboardShell({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-svh bg-obsidian text-ivory relative overflow-hidden flex">
      {/* Ambient Glow Circles */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[80px] pointer-events-none opacity-20"
        style={{ backgroundColor: 'rgba(6, 78, 59, 0.6)' }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[60px] pointer-events-none opacity-10"
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
