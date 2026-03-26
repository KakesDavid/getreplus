
'use client';
import React, { useState, useEffect, useMemo } from 'react';
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
      if (data.email.includes('@') && data.email.split('@')[1]?.includes('.')) {
        setEmailStatus('invalid');
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailStatus('idle');
        setEmailError(null);
      }
      return;
    }

    const timer = setTimeout(async () => {
      setEmailStatus('loading');
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

  const strength = useMemo(() => validatePassword(data.password || ''), [data.password]);
  const isMinLength = strength.length;
  const passwordsMatch = data.password === data.confirmPassword && (data.confirmPassword?.length || 0) > 0;

  const canSubmit = useMemo(() => {
    return (
      emailStatus === 'valid' && 
      isMinLength && 
      passwordsMatch && 
      data.termsAccepted &&
      !isLoading
    );
  }, [emailStatus, isMinLength, passwordsMatch, data.termsAccepted, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isLoading) return;

    setIsLoading(true);
    setFirebaseError(null);

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

      if (auth.currentUser) {
        await sendVerification(auth.currentUser);
      }
      
      onUpdate({ firebaseUserUid: result.uid });
      onNext();
    } catch (error: any) {
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
      <div className="flex items-center justify-between mb-16">
        <button
          onClick={onPrev}
          className="w-36 h-36 flex items-center justify-center text-ivory-40 hover:text-gold transition-colors -ml-10"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-6 bg-gold/5 border border-gold/20 px-10 py-2.5 rounded-full">
           <ShieldCheck size={12} className="text-gold" />
           <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Security</span>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="font-headline font-bold text-ivory text-22 lg:text-24 leading-tight">Access Credentials</h2>
        <p className="text-ivory-50 text-[13px] mt-1">Protect your earnings with a strong password.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
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

        <div className="bg-white/5 border border-white-15 rounded-2xl p-16 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-ivory-40 uppercase tracking-wider">Password</label>
              <Info size={14} className="text-ivory-25 hover:text-gold transition-colors cursor-help" />
            </div>
            <AuthInput
              label=""
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock />}
              value={data.password}
              onChange={(e) => onUpdate({ password: e.target.value })}
              className="h-[48px]"
            />
            <PasswordStrengthMeter password={data.password} />
          </div>

          <div className="space-y-6 pt-12 border-t border-white/5">
            <label className="text-[11px] font-bold text-ivory-40 uppercase tracking-wider block">Confirm Password</label>
            <AuthInput
              label=""
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock />}
              value={data.confirmPassword}
              onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
              validationState={data.confirmPassword ? (passwordsMatch ? 'valid' : 'invalid') : 'idle'}
              className="h-[48px]"
            />
          </div>
        </div>

        <div className="py-2">
          <label className="flex items-start gap-10 cursor-pointer group select-none">
            <div className="relative mt-1">
              <input
                type="checkbox"
                className="sr-only"
                checked={data.termsAccepted}
                onChange={(e) => onUpdate({ termsAccepted: e.target.checked })}
              />
              <div className={cn(
                "w-18 h-18 rounded border transition-all flex items-center justify-center",
                data.termsAccepted ? "bg-gold border-transparent" : "border-white/20 bg-input-bg group-hover:border-gold/50"
              )}>
                {data.termsAccepted && <Check size={12} className="text-obsidian" />}
              </div>
            </div>
            <span className="text-[12px] text-ivory-40 leading-snug group-hover:text-ivory-70 pt-1">
              I agree to the <Link href="/terms" className="text-gold font-medium">Terms</Link> and <Link href="/privacy" className="text-gold font-medium">Privacy Policy</Link>.
            </span>
          </label>
        </div>

        <div className="space-y-12 pt-4">
          {firebaseError && (
            <div className="bg-error-subtle border border-error-border rounded-xl p-10 flex items-start gap-8 text-error text-[12px] font-medium">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>{firebaseError}</p>
            </div>
          )}

          <GoldButton 
            type="submit" 
            isLoading={isLoading} 
            isDisabled={!canSubmit}
            className="h-[52px]"
          >
            Create Secure Account
          </GoldButton>
        </div>
      </form>
    </div>
  );
}
