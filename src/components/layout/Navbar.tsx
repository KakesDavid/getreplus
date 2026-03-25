"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[1000] transition-all duration-300 h-[60px] lg:h-[72px] flex items-center px-5 lg:px-10",
          scrolled && !mobileMenuOpen
            ? "bg-obsidian/95 backdrop-blur-md border-b border-gold/20"
            : (mobileMenuOpen ? "bg-obsidian" : "bg-transparent")
        )}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center font-headline font-bold text-gold text-lg">
              G+
            </div>
            <div className="ml-2.5">
              <span className="block font-headline font-bold text-ivory text-xl leading-none">GetrePlus</span>
              <span className="block text-[10px] text-gold uppercase tracking-widest font-medium">Get Reward Plus</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-ivory/95 hover:text-gold transition-colors duration-200 py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="bg-transparent border-ivory/30 text-ivory hover:border-gold hover:text-gold h-10 px-6 rounded-lg text-sm transition-all"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                className="gold-gradient text-obsidian font-headline font-bold h-10 px-6 rounded-lg text-sm shadow-[0_4px_20px_rgba(183,134,44,0.35)] hover:brightness-110 hover:-translate-y-0.5 transition-all"
              >
                Sign Up Free
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            <Link href="/signup">
              <Button
                size="sm"
                className="gold-gradient text-obsidian font-headline font-bold h-9 px-4 rounded-lg text-xs"
              >
                Sign Up
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-[52px] h-[52px] flex items-center justify-center text-gold"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-obsidian z-[2001] lg:hidden transition-transform duration-500 flex flex-col h-svh w-screen",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-[60px] flex items-center justify-between px-5 border-b border-gold/10 shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-headline font-bold text-gold">G+</div>
            <span className="ml-2 font-headline font-bold text-ivory text-lg">GetrePlus</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-[52px] h-[52px] flex items-center justify-center text-gold"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-5">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-headline font-bold text-2xl text-ivory py-4 border-b border-gold/5 active:bg-secondary/15 active:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <Link href="/login" className="w-full">
              <Button
                variant="outline"
                className="w-full h-[52px] border-ivory text-ivory font-medium rounded-lg"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button
                className="w-full h-[52px] gold-gradient text-obsidian font-headline font-bold rounded-lg shadow-lg"
              >
                Sign Up Free
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 pb-10">
             <div className="w-9 h-9 rounded-full bg-whatsapp/20 flex items-center justify-center text-whatsapp">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.033-.051-.716 2.614 2.679-.701.047.027c.887.521 1.778.795 2.766.796h.003c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.771-5.766zm3.385 8.165c-.144.405-.833.743-1.159.789-.324.045-.714.074-2.146-.514-1.833-.755-3.033-2.624-3.125-2.747-.093-.122-.819-.1.819-1.086s1.086 0 1.442-.093c.123-.031.205-.093.268-.217.062-.124.28-.716.342-.84.063-.124.125-.249.063-.374s-.622-1.493-.855-2.053c-.227-.543-.459-.469-.628-.478-.162-.008-.348-.01-.533-.01-.186 0-.489.07-.745.348-.256.279-1.054 1.025-1.054 2.5 0 1.474 1.07 2.898 1.218 3.091s2.103 3.208 5.093 4.504c.712.308 1.267.492 1.701.631.715.227 1.365.195 1.878.119.571-.085 1.758-.719 2.006-1.411.248-.692.248-1.284.173-1.411-.074-.123-.271-.197-.568-.344z"/></svg>
             </div>
             <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.91-1.27 4.85-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
             </div>
          </div>
        </nav>
      </div>
    </>
  );
}