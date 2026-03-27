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

  // Loading State
  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-obsidian relative overflow-hidden">
      {/* Background Elements - Fixed at z-0 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[80px]" 
          style={{ background: 'rgba(6,78,59,0.12)' }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[60px]" 
          style={{ background: 'rgba(183,134,44,0.06)' }}
        />
      </div>

      {/* Main Layout Container - z-10 */}
      <div className="relative z-10">
        {!isMobile ? (
          /* Desktop Layout (≥ 1024px) */
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Fixed Width */}
            <aside className="w-60 flex-shrink-0 border-r border-white/5 bg-obsidian/50 backdrop-blur-md">
              <SidebarNav />
            </aside>
            
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-screen">
              <DashboardHeader />
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-[800px] mx-auto px-8 py-6">
                  {children}
                </div>
              </div>
            </main>
          </div>
        ) : (
          /* Mobile Layout (< 1024px) */
          <div className="flex flex-col h-screen overflow-hidden">
            <header className="flex-shrink-0">
              <DashboardHeader />
            </header>
            
            <main className="flex-1 overflow-y-auto px-4 py-4 pb-20">
              {children}
            </main>
            
            <nav className="flex-shrink-0">
              <BottomNav />
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
