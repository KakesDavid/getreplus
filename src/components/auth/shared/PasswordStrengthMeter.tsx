'use client';
import React from 'react';
import { validatePassword } from '@/utils/validators';
import { cn } from '@/lib/utils';

export function PasswordStrengthMeter({ password }: { password?: string }) {
  if (!password || password.length === 0) return null;

  const result = validatePassword(password);
  const typesCount = [result.hasNumber, result.hasUpper, result.hasSpecial].filter(Boolean).length;
  
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
  let litCount = 1;

  if (password.length >= 8 && typesCount >= 3) {
    strength = 'strong';
    litCount = 4;
  } else if (password.length >= 6 && typesCount >= 2) {
    strength = 'good';
    litCount = 3;
  } else if (password.length >= 6) {
    strength = 'fair';
    litCount = 2;
  }

  const strengthMap = {
    weak: { color: 'text-error', label: 'Weak' },
    fair: { color: 'text-warning-orange', label: 'Fair' },
    good: { color: 'text-warning-yellow', label: 'Good' },
    strong: { color: 'text-emerald', label: 'Strong' }
  };

  const getSegmentColor = (index: number) => {
    if (index >= litCount) return 'bg-white-15';
    if (strength === 'weak') return 'bg-error';
    if (strength === 'fair') return 'bg-warning-orange';
    if (strength === 'good') return 'bg-warning-yellow';
    return 'bg-emerald';
  };

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-top-1 duration-300">
      <div className="flex gap-4 h-4">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={cn(
              "flex-1 rounded-full transition-all duration-500",
              getSegmentColor(i)
            )} 
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <span className={cn("text-[12px] font-subheadline font-semibold", strengthMap[strength].color)}>
          Password Strength: {strengthMap[strength].label}
        </span>
      </div>
    </div>
  );
}
