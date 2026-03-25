"use client";

import React from "react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Top Right Curve */}
      <svg
        className="absolute -top-[10%] -right-[10%] w-[80%] h-[80%] text-gold/5 animate-float-bg"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          className="animate-drift-slow"
          d="M0,50 Q25,0 50,50 T100,50"
          stroke="currentColor"
          strokeWidth="0.05"
        />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.03" strokeDasharray="1 4" />
      </svg>

      {/* Bottom Left Curve */}
      <svg
        className="absolute -bottom-[15%] -left-[15%] w-[90%] h-[90%] text-secondary/10 animate-float-bg"
        style={{ animationDirection: "reverse", animationDuration: "25s" }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          className="animate-drift-slow"
          d="M100,50 Q75,100 50,50 T0,50"
          stroke="currentColor"
          strokeWidth="0.08"
        />
        <path
          d="M20,20 Q50,80 80,20"
          stroke="currentColor"
          strokeWidth="0.04"
          strokeDasharray="2 6"
        />
      </svg>

      {/* Middle Floating Lines */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-gold/3 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <line x1="0" y1="20" x2="100" y2="80" stroke="currentColor" strokeWidth="0.02" strokeDasharray="0.5 5" />
        <line x1="0" y1="80" x2="100" y2="20" stroke="currentColor" strokeWidth="0.02" strokeDasharray="0.5 5" />
      </svg>
      
      {/* Radial Blooms */}
      <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-gold/3 rounded-full blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[140px]" />
    </div>
  );
}