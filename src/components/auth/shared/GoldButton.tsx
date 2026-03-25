'use client';
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function GoldButton({
  children,
  className,
  isLoading,
  isDisabled,
  ...props
}: GoldButtonProps) {
  const disabled = isDisabled || isLoading;

  return (
    <button
      className={cn(
        "w-full h-[54px] rounded-[12px] font-headline font-bold text-[15px] transition-all duration-200 flex items-center justify-center relative",
        /* Default State */
        !disabled && "bg-gold-gradient text-obsidian shadow-button-glow hover:shadow-button-glow-hover hover:-translate-y-1 active:scale-[0.97] hover:brightness-[1.05]",
        /* Disabled State */
        disabled && "bg-gold/20 text-obsidian/40 cursor-not-allowed opacity-80",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin text-obsidian" size={20} />
      ) : (
        <span className="animate-in fade-in duration-300">{children}</span>
      )}
    </button>
  );
}
