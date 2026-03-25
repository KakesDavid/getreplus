"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasBottomBar, setHasBottomBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasBottomBar(window.scrollY > 200);
    };

    const handleResize = () => {
      // Hide button if keyboard is likely open
      if (window.visualViewport && window.visualViewport.height < window.innerHeight * 0.75) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/2340000000000?text=Hi%2C%20I%20have%20a%20question%20about%20GetrePlus"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed right-5 z-[9998] w-14 h-14 bg-[var(--color-whatsapp)] rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] animate-pulse-ring active:scale-90 transition-all duration-300 lg:hidden",
        hasBottomBar 
          ? "bottom-[calc(60px+24px+env(safe-area-inset-bottom))]" 
          : "bottom-[calc(24px+env(safe-area-inset-bottom))]"
      )}
    >
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.033-.051-.716 2.614 2.679-.701.047.027c.887.521 1.778.795 2.766.796h.003c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.771-5.766zm3.385 8.165c-.144.405-.833.743-1.159.789-.324.045-.714.074-2.146-.514-1.833-.755-3.033-2.624-3.125-2.747-.093-.122-.819-.1.819-1.086s1.086 0 1.442-.093c.123-.031.205-.093.268-.217.062-.124.28-.716.342-.84.063-.124.125-.249.063-.374s-.622-1.493-.855-2.053c-.227-.543-.459-.469-.628-.478-.162-.008-.348-.01-.533-.01-.186 0-.489.07-.745.348-.256.279-1.054 1.025-1.054 2.5 0 1.474 1.07 2.898 1.218 3.091s2.103 3.208 5.093 4.504c.712.308 1.267.492 1.701.631.715.227 1.365.195 1.878.119.571-.085 1.758-.719 2.006-1.411.248-.692.248-1.284.173-1.411-.074-.123-.271-.197-.568-.344z"/></svg>
    </a>
  );
}
