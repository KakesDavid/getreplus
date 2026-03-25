"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BottomBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFinalCtaVisible, setIsFinalCtaVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFinalCtaVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const finalCta = document.getElementById('final-cta');
    if (finalCta) observer.observe(finalCta);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (finalCta) observer.unobserve(finalCta);
    };
  }, []);

  if (!isVisible || isFinalCtaVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 w-full z-[997] h-[60px] bg-obsidian border-t border-gold/30 px-5 flex items-center justify-between lg:hidden transition-opacity duration-300 animate-in fade-in"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="complementary"
      aria-label="Quick actions"
    >
      <span className="text-[13px] font-medium text-ivory">Start earning this Friday</span>
      <Link href="/signup">
        <Button className="gold-gradient text-obsidian font-headline font-bold h-10 w-[110px] rounded-lg text-sm shadow-lg">
          Join Free →
        </Button>
      </Link>
    </div>
  );
}