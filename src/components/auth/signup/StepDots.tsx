'use client';
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StepDots({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-10 mb-32" aria-label="Signup steps">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div 
            key={i} 
            className="relative flex items-center justify-center"
            aria-current={isActive ? 'step' : undefined}
          >
            <div
              className={cn(
                "rounded-full transition-all duration-300 flex items-center justify-center",
                isActive ? "w-12 h-12 bg-gold shadow-dot-active-glow" : "w-8 h-8",
                isCompleted ? "bg-emerald" : (isActive ? "" : "bg-white-15")
              )}
            >
              {isCompleted && <Check size={5} className="text-white" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}