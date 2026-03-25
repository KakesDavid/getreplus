'use client';
import React from 'react';
import { BrandPanel } from './BrandPanel';
import { MobileBrandHeader } from './MobileBrandHeader';

export function AuthPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-obsidian flex flex-col lg:flex-row overflow-x-hidden relative">
      {/* Dynamic Glow Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Desktop Brand Panel */}
      <div className="hidden lg:block lg:w-[450px] xl:w-[520px] 2xl:w-[600px] h-svh sticky top-0 left-0 border-r border-border-subtle overflow-hidden flex-shrink-0">
        <BrandPanel />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden shrink-0">
        <MobileBrandHeader />
      </div>

      {/* Auth Content Area */}
      <main className="flex-1 min-h-svh lg:h-svh overflow-y-auto px-16 sm:px-24 py-32 lg:py-0 flex items-center justify-center relative z-10">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
