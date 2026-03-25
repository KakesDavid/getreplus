'use client';
import React from 'react';

export function ProgressBar({ step, total }: { step: number; total: number }) {
  const progress = (step / total) * 100;

  return (
    <div 
      className="w-full h-3 bg-white-15 rounded-full overflow-hidden mb-16"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Step ${step} of ${total}`}
    >
      <div 
        className="h-full bg-gold-gradient transition-all duration-500 ease-out shadow-[0_0_8px_rgba(183,134,44,0.3)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}