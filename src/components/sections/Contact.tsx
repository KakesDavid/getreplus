"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Info Column */}
        <div className="flex flex-col">
          <h2 className="font-headline font-bold text-32 lg:text-[40px] text-ivory mb-10 leading-tight">
            We&apos;re Here to Help
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-secondary rounded-full flex items-center justify-center text-gold shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <div className="font-semibold text-ivory mb-1">support@getreplus.com</div>
                <p className="text-sm text-ivory/95">Email support — we respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-secondary rounded-full flex items-center justify-center text-gold shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <div className="font-semibold text-ivory mb-1">WhatsApp Direct Support</div>
                <p className="text-sm text-ivory/95">Fastest response · Mon – Sat, 8am – 8pm WAT</p>
                <a 
                  href="https://wa.me/2340000000000" 
                  className="inline-flex items-center mt-3 h-10 px-5 bg-secondary text-ivory text-sm font-medium rounded-lg hover:brightness-110 transition-all"
                >
                  Open WhatsApp Chat →
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-emerald/10 border border-emerald/25 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-emerald" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.033-.051-.716 2.614 2.679-.701.047.027c.887.521 1.778.795 2.766.796h.003c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.771-5.766zm3.385 8.165c-.144.405-.833.743-1.159.789-.324.045-.714.074-2.146-.514-1.833-.755-3.033-2.624-3.125-2.747-.093-.122-.819-.1.819-1.086s1.086 0 1.442-.093c.123-.031.205-.093.268-.217.062-.124.28-.716.342-.84.063-.124.125-.249.063-.374s-.622-1.493-.855-2.053c-.227-.543-.459-.469-.628-.478-.162-.008-.348-.01-.533-.01-.186 0-.489.07-.745.348-.256.279-1.054 1.025-1.054 2.5 0 1.474 1.07 2.898 1.218 3.091s2.103 3.208 5.093 4.504c.712.308 1.267.492 1.701.631.715.227 1.365.195 1.878.119.571-.085 1.758-.719 2.006-1.411.248-.692.248-1.284.173-1.411-.074-.123-.271-.197-.568-.344z"/></svg>
              <h4 className="font-subheadline font-semibold text-ivory">GetrePlus Member Community</h4>
            </div>
            <p className="text-sm text-ivory/95 leading-relaxed mb-6">
              5,000+ Nigerians sharing tips, referral strategies, and Friday payout screenshots. Join to see real results.
            </p>
            <Button className="w-full h-[52px] bg-emerald hover:bg-emerald/90 text-white font-headline font-bold rounded-xl shadow-lg">
              Join WhatsApp Community
            </Button>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white/5 border border-white/10 rounded-[20px] p-8 lg:p-10 relative overflow-hidden group">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-ivory/95">Full Name</label>
              <Input 
                required 
                placeholder="Emeka Obi" 
                className="bg-white/5 border-white/10 h-14 rounded-xl focus-visible:ring-gold/30 focus-visible:border-gold text-ivory" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-ivory/95">Email Address</label>
              <Input 
                required 
                type="email" 
                placeholder="emeka@example.com" 
                className="bg-white/5 border-white/10 h-14 rounded-xl focus-visible:ring-gold/30 focus-visible:border-gold text-ivory" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-ivory/95">Message</label>
              <Textarea 
                required 
                rows={4} 
                placeholder="How can we help you?" 
                className="bg-white/5 border-white/10 rounded-xl focus-visible:ring-gold/30 focus-visible:border-gold text-ivory min-h-[120px]" 
              />
            </div>
            
            <Button 
              disabled={isSending || isSent}
              className={cn(
                "w-full h-[56px] font-headline font-bold rounded-xl transition-all",
                isSent ? "bg-emerald text-white" : "gold-gradient text-obsidian"
              )}
            >
              {isSending ? "Sending..." : isSent ? "Message Sent ✓" : "Send Message"}
            </Button>
            
            <p className="text-center text-[13px] text-ivory/85">
              Or reach us directly on <span className="text-emerald font-medium">WhatsApp</span> for the fastest response.
            </p>
          </form>
          
          {isSent && (
            <div role="status" className="sr-only">Message sent successfully</div>
          )}
        </div>
      </div>
    </section>
  );
}
