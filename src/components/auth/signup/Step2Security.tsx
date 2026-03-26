'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Lock, ChevronLeft, Check, Info, ShieldCheck } from 'lucide-react';
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

  // Debounced Email Check (600ms)
  useEffect(() => {
    if (!data.email || !validateEmail(data.email)) {
      setEmailStatus('idle');
      setEmailError(null);
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
              Email taken. <Link href="/login" className="text-gold underline font-semibold">Sign in?</Link>
            </span>
          );
        }
      } catch (e) {
        setEmailStatus('idle');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [data.email, db]);

  const pDetails = validatePassword(data.password || '');
  const isStrong = (data.password?.length || 0) >= 8 && 
    ([pDetails.hasNumber, pDetails.hasUpper, pDetails.hasSpecial].filter(Boolean).length >= 2);
  
  const passwordsMatch = data.password === data.confirmPassword && (data.confirmPassword?.length || 0) > 0;

  const isValid = 
    emailStatus === 'valid' && 
    isStrong && 
    passwordsMatch && 
    data.termsAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    setFirebaseError(null);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setFirebaseError("Creation took too long. Please check your network.");
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
        email_taken: "Email already in use.",
        username_taken: "Username taken.",
        invalid_referral: "Referral code expired."
      };
      setFirebaseError(msgMap[error.message] || "Account creation failed. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-20">
        <button
          onClick={onPrev}
          className="w-32 h-32 flex items-center justify-center text-ivory-40 hover:text-gold transition-colors -ml-8"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-6 bg-white-15 px-10 py-4 rounded-full">
           <ShieldCheck size={12} className="text-gold" />
           <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Secure Step</span>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="font-headline font-bold text-ivory text-20 lg:text-24 leading-tight">Security & Access</h2>
        <p className="text-ivory-50 text-13 lg:text-14 mt-2">Create your login credentials safely.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="e.g. emeka@gmail.com"
          leftIcon={<Mail />}
          value={data.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          validationState={emailStatus}
          errorMessage={emailError}
        />

        {/* Password Group */}
        <div className="bg-white/5 border border-white-15 rounded-2xl p-16 lg:p-20 space-y-16">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-ivory-40 uppercase tracking-wider">
                Password
              </label>
              <div className="group relative">
                <Info size={14} className="text-ivory-25 cursor-help hover:text-gold transition-colors" />
                <div className="absolute bottom-full right-0 mb-8 w-[180px] p-10 bg-obsidian border border-gold-border rounded-xl text-[10px] text-ivory-60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                  Min. 8 chars, 1 number, 1 uppercase.
                </div>
              </div>
            </div>
            <AuthInput
              label=""
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock />}
              value={data.password}
              onChange={(e) => onUpdate({ password: e.target.value })}
              className="h-48"
            />
            <PasswordStrengthMeter password={data.password} />
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <label className="text-[11px] font-bold text-ivory-40 uppercase tracking-wider block">
              Confirm Password
            </label>
            <AuthInput
              label=""
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock />}
              value={data.confirmPassword}
              onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
              validationState={data.confirmPassword ? (passwordsMatch ? 'valid' : 'invalid') : 'idle'}
              errorMessage={data.confirmPassword && !passwordsMatch ? "Does not match" : null}
              className="h-48"
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="py-8">
          <label className="flex items-start gap-10 cursor-pointer group select-none">
            <div className="relative mt-2">
              <input
                type="checkbox"
                className="sr-only"
                checked={data.termsAccepted}
                onChange={(e) => onUpdate({ termsAccepted: e.target.checked })}
                required
              />
              <div className={cn(
                "w-[20px] h-[20px] rounded-md border-[1.5px] transition-all flex items-center justify-center",
                data.termsAccepted ? "bg-gold-gradient border-transparent" : "border-white-20 bg-input-bg group-hover:border-gold/50"
              )}>
                {data.termsAccepted && <Check size={12} className="text-obsidian animate-in zoom-in-50 duration-200" />}
              </div>
            </div>
            <span className="text-[12px] font-body text-ivory-40 leading-relaxed group-hover:text-ivory-70 transition-colors pt-1">
              I agree to the <Link href="/terms" className="text-gold font-medium hover:underline">Terms</Link> and <Link href="/privacy" className="text-gold font-medium hover:underline">Privacy Policy</Link>.
            </span>
          </label>
        </div>

        {/* Action & Global Error */}
        <div className="space-y-12">
          {firebaseError && (
            <div className="bg-error-subtle border border-error-border rounded-xl p-10 flex items-center gap-8 text-error text-[12px] font-medium animate-in slide-in-from-top-2">
              <Info size={14} className="shrink-0" />
              {firebaseError}
            </div>
          )}

          <GoldButton 
            type="submit" 
            isLoading={isLoading} 
            isDisabled={!isValid}
            className="h-[52px]"
          >
            Create Secure Account
          </GoldButton>
        </div>
      </form>
    </div>
  );
}
