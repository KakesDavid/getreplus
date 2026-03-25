'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Loader2, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { GoldButton } from '../shared/GoldButton';
import { SignupData } from '@/hooks/useSignupState';
import { useAuth, useFirestore } from '@/firebase';
import { deleteUnverifiedUser, sendVerification } from '@/firebase/auth-service';
import { useEmailVerificationPolling } from '@/hooks/useEmailVerificationPolling';
import { cn } from '@/lib/utils';

interface StepProps {
  data: SignupData;
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<SignupData>) => void;
}

export function Step3Verification({ data, onNext, onPrev, onUpdate }: StepProps) {
  const auth = useAuth();
  const db = useFirestore();
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onVerified = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onNext();
    }, 800);
  };

  useEmailVerificationPolling(auth.currentUser, onVerified);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || !auth.currentUser || data.resendCount >= 3) return;
    setIsResending(true);
    try {
      await sendVerification(auth.currentUser);
      setCooldown(45);
      onUpdate({ resendCount: data.resendCount + 1 });
    } catch (error) {
      console.error(error);
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeEmail = async () => {
    if (!auth.currentUser) return;
    try {
      await deleteUnverifiedUser(auth, db, auth.currentUser);
      onUpdate({ email: '', password: '', confirmPassword: '' });
      onPrev();
    } catch (error) {
      console.error(error);
    }
  };

  const truncateEmail = (email: string) => {
    if (email.length < 24) return email;
    const [user, domain] = email.split('@');
    return `${user.substring(0, 3)}...${user.slice(-2)}@${domain}`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="w-[72px] h-[72px] bg-gold-subtle rounded-full flex items-center justify-center mb-24 animate-bounce-gentle">
          <Mail className="text-gold" size={32} />
        </div>

        <h2 className="font-headline font-bold text-ivory text-24 mb-8">Verify your email</h2>
        <p className="text-ivory-60 text-15 leading-relaxed mb-24 max-w-[320px]">
          We sent a verification link to <span className="text-gold font-medium">{truncateEmail(data.email)}</span>
        </p>

        {/* Instruction Box */}
        <div className="w-full bg-white/5 border border-white-15 rounded-xl p-20 text-left space-y-16 mb-24">
          <div className="flex gap-12">
            <div className="w-20 h-20 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[11px] font-bold shrink-0">1</div>
            <p className="text-13 text-ivory-60">Check your inbox or spam folder</p>
          </div>
          <div className="flex gap-12">
            <div className="w-20 h-20 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[11px] font-bold shrink-0">2</div>
            <p className="text-13 text-ivory-60">Click the verification link in the email</p>
          </div>
          <div className="flex gap-12">
            <div className="w-20 h-20 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[11px] font-bold shrink-0">3</div>
            <p className="text-13 text-ivory-60">Wait here, we'll advance you automatically</p>
          </div>
        </div>

        {/* Polling Indicator */}
        {!showSuccess ? (
          <div className="flex items-center gap-10 mb-32">
            <div className="relative">
              <div className="w-8 h-8 bg-gold rounded-full animate-ping absolute opacity-40" />
              <div className="w-8 h-8 bg-gold rounded-full relative" />
            </div>
            <span className="text-13 font-medium text-gold">Waiting for verification...</span>
          </div>
        ) : (
          <div className="flex items-center gap-10 mb-32 animate-in zoom-in-95 duration-300">
            <CheckCircle2 className="text-emerald" size={24} />
            <span className="text-15 font-bold text-emerald">Email verified! ✓</span>
          </div>
        )}

        <div className="w-full space-y-16">
          {data.resendCount >= 3 ? (
            <div className="bg-emerald/10 border border-emerald/20 p-12 rounded-lg text-left">
              <p className="text-12 text-emerald font-medium leading-tight">
                Still no email? Reach out to us on WhatsApp for manual verification support.
              </p>
              <a 
                href="https://wa.me/2340000000000" 
                className="inline-block mt-8 text-12 font-bold text-emerald underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          ) : (
            <button
              onClick={handleResend}
              disabled={cooldown > 0 || isResending}
              className={cn(
                "w-full h-44 flex items-center justify-center gap-8 text-14 font-medium transition-all",
                cooldown > 0 ? "text-ivory-30 cursor-not-allowed" : "text-gold hover:underline"
              )}
            >
              {isResending ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Send a new verification link"}
            </button>
          )}

          <button
            onClick={handleChangeEmail}
            className="text-ivory-40 text-13 hover:text-ivory transition-colors flex items-center justify-center gap-6 w-full"
          >
            <ArrowLeft size={14} />
            Wrong email address? Change it
          </button>
        </div>
      </div>
    </div>
  );
}
