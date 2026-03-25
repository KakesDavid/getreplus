'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';

export function LoginErrorBlock({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="bg-error-subtle border border-error-border rounded-[10px] p-12 lg:p-16 flex items-start gap-12 animate-in fade-in slide-in-from-top-2 duration-300 mb-24">
      <AlertCircle className="text-error shrink-0 mt-2" size={18} />
      <p className="text-error text-[14px] font-body font-medium leading-relaxed">
        {message}
      </p>
    </div>
  );
}
