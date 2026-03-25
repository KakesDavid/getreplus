'use client';
import React from 'react';
import Link from 'next/link';

export function MobileBrandHeader() {
  return (
    <header className="sticky top-0 z-50 h-[80px] bg-obsidian/92 backdrop-blur-md border-b border-border-subtle px-20 flex items-center justify-between">
      <Link href="/" className="flex items-center group">
        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-headline font-bold text-gold text-sm">
          G+
        </div>
        <div className="ml-8">
          <span className="block font-headline font-bold text-ivory text-lg leading-none">GetrePlus</span>
          <span className="block text-[8px] text-gold uppercase tracking-widest font-medium">Get Reward Plus</span>
        </div>
      </Link>
    </header>
  );
}
