"use client";

import React from "react";
import Link from "next/link";

const SECTIONS = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Leaderboard", href: "/#leaderboard" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign Up", href: "/signup" },
      { label: "Log In", href: "/login" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Refer a Friend", href: "/#refer" },
      { label: "Withdraw Earnings", href: "/#withdraw" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Contact Us", href: "/#contact" },
      { label: "WhatsApp Support", href: "#whatsapp" },
      { label: "Withdrawal Policy", href: "#policy" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t-2 border-gold/25 pt-20 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
        {/* Brand Column */}
        <div className="flex flex-col items-start lg:pr-12">
          <Link href="/" className="flex items-center mb-6">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center font-headline font-bold text-gold">G+</div>
            <div className="ml-2.5 text-left">
              <span className="block font-headline font-bold text-ivory text-xl leading-none">GetrePlus</span>
              <span className="block text-[10px] text-gold uppercase tracking-widest font-medium">Get Reward Plus</span>
            </div>
          </Link>
          <p className="text-sm text-ivory/80 leading-relaxed mb-8 max-w-xs">
            Nigeria&apos;s most trusted referral earning platform. Thousands of members earning real money every Friday via direct bank transfer.
          </p>
          <div className="flex gap-3">
             <div className="w-9 h-9 rounded-full bg-whatsapp flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.033-.051-.716 2.614 2.679-.701.047.027c.887.521 1.778.795 2.766.796h.003c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.771-5.766zm3.385 8.165c-.144.405-.833.743-1.159.789-.324.045-.714.074-2.146-.514-1.833-.755-3.033-2.624-3.125-2.747-.093-.122-.819-.1.819-1.086s1.086 0 1.442-.093c.123-.031.205-.093.268-.217.062-.124.28-.716.342-.84.063-.124.125-.249.063-.374s-.622-1.493-.855-2.053c-.227-.543-.459-.469-.628-.478-.162-.008-.348-.01-.533-.01-.186 0-.489.07-.745.348-.256.279-1.054 1.025-1.054 2.5 0 1.474 1.07 2.898 1.218 3.091s2.103 3.208 5.093 4.504c.712.308 1.267.492 1.701.631.715.227 1.365.195 1.878.119.571-.085 1.758-.719 2.006-1.411.248-.692.248-1.284.173-1.411-.074-.123-.271-.197-.568-.344z"/></svg>
             </div>
             <div className="w-9 h-9 rounded-full bg-[#2AABEE] flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.91-1.27 4.85-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
             </div>
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             </div>
          </div>
        </div>

        {/* Links Columns */}
        {SECTIONS.map((section, idx) => (
          <div key={idx} className="flex flex-col">
            <h4 className="font-subheadline font-semibold text-[12px] text-gold tracking-widest uppercase mb-6">
              {section.title}
            </h4>
            <nav className="flex flex-col gap-4">
              {section.links.map((link, lIdx) => (
                <Link 
                  key={lIdx} 
                  href={link.href}
                  className="text-sm text-ivory/85 hover:text-gold hover:pl-1 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <div className="text-[13px] text-ivory/75">
          © 2025 GetrePlus — Get Reward Plus. All rights reserved.
        </div>
        <div className="flex items-center gap-3 text-[13px] text-ivory/75">
          <span>🇳🇬 Made for Nigerians</span>
          <span className="opacity-20">|</span>
          <span>Powered by Paystack</span>
        </div>
      </div>
    </footer>
  );
}