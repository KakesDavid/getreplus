'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from './DashboardHeader';
import { SidebarNav } from './SidebarNav';
import { BottomNav } from './BottomNav';
import { useUser } from '@/firebase';

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
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-obsidian relative overflow-hidden font-body">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40" 
          style={{ background: 'rgba(6,78,59,0.15)' }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30" 
          style={{ background: 'rgba(183,134,44,0.1)' }}
        />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-60 flex-shrink-0 border-r border-white/5 bg-obsidian/50 backdrop-blur-md">
            <SidebarNav />
          </aside>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-8">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        {isMobile && <BottomNav />}
      </div>
    </div>
  );
}
