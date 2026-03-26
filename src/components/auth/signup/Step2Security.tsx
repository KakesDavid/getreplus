'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Lock, ChevronLeft, Check, Info, ShieldCheck, AlertCircle } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { PasswordStrengthMeter } from '../shared/PasswordStrengthMeter';
import { SignupData } from '@/hooks/useSignupState';
import { validateEmail, validatePassword } from '@/utils/validators';
import { useFirestore, useAuth } from '@/firebase';
import { checkEmailAvailability, completeUserCreation, sendVerification } from '@/firebase/auth-service';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface StepProps {
  data: SignupData;
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<SignupData>) => void;
}

export function Step2Security({ data, onNext, onPrev, onUpdate }: StepProps) {
  const db = useFirestore();
  const auth = useAuth();
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [emailError, setEmailError] = useState<React.ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  useEffect(() => {
    if (!data.email) {
      setEmailStatus('idle');
      setEmailError(null);
      return;
    }

    const isFormatValid = validateEmail(data.email);
    if (!isFormatValid) {
      setEmailStatus('invalid');
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailStatus('loading');
    setEmailError(null);

    const timer = setTimeout(async () => {
      try {
        const result = await checkEmailAvailability(db, data.email);
        if (result.available) {
          setEmailStatus('valid');
          setEmailError(null);
        } else {
          setEmailStatus('invalid');
          setEmailError(
            <span className="flex items-center gap-4">
              Email taken. <Link href="/login" className="text-gold underline font-semibold">Sign in instead?</Link>
            </span>
          );
        }
      } catch (e) {
        setEmailStatus('idle');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [data.email, db]);

  const pDetails = validatePassword(data.password || '');
  const isMinLength = (data.password?.length || 0) >= 8;
  const hasComplexity = [pDetails.hasNumber, pDetails.hasUpper, pDetails.hasSpecial].filter(Boolean).length >= 1;
  const isStrongEnough = isMinLength && (data.password?.length || 0) > 0;
  
  const passwordsMatch = data.password === data.confirmPassword && (data.confirmPassword?.length || 0) > 0;

  const canSubmit = 
    emailStatus === 'valid' && 
    isStrongEnough && 
    passwordsMatch && 
    data.termsAccepted &&
    !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isLoading) return;

    setIsLoading(true);
    setFirebaseError(null);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setFirebaseError("Account creation is taking longer than expected. Please check your network.");
    }, 30000);

    try {
      const result = await completeUserCreation(auth, db, {
        email: data.email,
        password: data.password!,
        fullName: data.fullName,
        username: data.username,
        phone: data.phone,
        referralCode: data.referralCode || undefined,
        signupIp: null, 
        deviceFingerprint: null
      });

      clearTimeout(timeoutId);

      if (auth.currentUser) {
        await sendVerification(auth.currentUser);
      }
      
      onUpdate({ firebaseUserUid: result.uid });
      onNext();
    } catch (error: any) {
      clearTimeout(timeoutId);
      const msgMap: any = {
        email_taken: "This email is already registered.",
        username_taken: "This username is already taken.",
        invalid_referral: "The referral code is invalid or has expired."
      };
      setFirebaseError(msgMap[error.message] || "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-20">
        <button
          onClick={onPrev}
          className="w-40 h-40 flex items-center justify-center text-ivory-40 hover:text-gold transition-colors -ml-12"
          type="button"
          aria-label="Back to personal details"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-8 bg-white/5 border border-gold/20 px-12 py-4 rounded-full">
           <ShieldCheck size={14} className="text-gold" />
           <span className="text-[11px] font-bold text-gold uppercase tracking-widest">Security Step</span>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="font-headline font-bold text-ivory text-24 lg:text-26 leading-tight">Security & Access</h2>
        <p className="text-ivory-50 text-13 mt-4">Create your login credentials safely.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        <AuthInput
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="e.g. emeka@gmail.com"
          leftIcon={<Mail />}
          value={data.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          validationState={emailStatus}
          errorMessage={emailError}
          required
        />

        <div className="bg-white/5 border border-white-15 rounded-2xl p-16 space-y-16">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-ivory-40 uppercase tracking-wider">
                Password
              </label>
              <div className="group relative">
                <Info size={16} className="text-ivory-25 cursor-help hover:text-gold transition-colors" />
                <div className="absolute bottom-full right-0 mb-8 w-[220px] p-12 bg-obsidian border border-gold-border rounded-xl text-[11px] text-ivory-60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                  Min. 8 characters. For best security, use numbers or symbols.
                </div>
              </div>
            </div>
            <AuthInput
              label=""
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              leftIcon={<Lock />}
              value={data.password}
              onChange={(e) => onUpdate({ password: e.target.value })}
              className="h-[52px]"
            />
            <PasswordStrengthMeter password={data.password} />
          </div>

          <div className="space-y-8 pt-8 border-t border-white/5">
            <label className="text-[12px] font-bold text-ivory-40 uppercase tracking-wider block">
              Confirm Password
            </label>
            <AuthInput
              label=""
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              leftIcon={<Lock />}
              value={data.confirmPassword}
              onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
              validationState={data.confirmPassword ? (passwordsMatch ? 'valid' : 'invalid') : 'idle'}
              errorMessage={data.confirmPassword && !passwordsMatch ? "Passwords do not match" : null}
              className="h-[52px]"
            />
          </div>
        </div>

        <div className="py-4">
          <label className="flex items-start gap-12 cursor-pointer group select-none">
            <div className="relative mt-2">
              <input
                type="checkbox"
                className="sr-only"
                checked={data.termsAccepted}
                onChange={(e) => onUpdate({ termsAccepted: e.target.checked })}
              />
              <div className={cn(
                "w-[22px] h-[22px] rounded-md border-[1.5px] transition-all flex items-center justify-center",
                data.termsAccepted ? "bg-gold-gradient border-transparent" : "border-white/20 bg-input-bg group-hover:border-gold/50"
              )}>
                {data.termsAccepted && <Check size={14} className="text-obsidian animate-in zoom-in-50 duration-200" />}
              </div>
            </div>
            <span className="text-[13px] font-body text-ivory-40 leading-relaxed group-hover:text-ivory-70 transition-colors pt-2">
              I agree to the <Link href="/terms" className="text-gold font-medium hover:underline">Terms</Link> and <Link href="/privacy" className="text-gold font-medium hover:underline">Privacy Policy</Link>.
            </span>
          </label>
        </div>

        <div className="space-y-16 pt-4">
          {firebaseError && (
            <div className="bg-error-subtle border border-error-border rounded-xl p-12 flex items-start gap-10 text-error text-[13px] font-medium animate-in slide-in-from-top-2">
              <AlertCircle size={18} className="shrink-0 mt-1" />
              <p>{firebaseError}</p>
            </div>
          )}

          <GoldButton 
            type="submit" 
            isLoading={isLoading} 
            isDisabled={!canSubmit}
            className="h-[56px] text-16"
          >
            Create Secure Account
          </GoldButton>
        </div>
      </form>
    </div>
  );
}
