'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Lock, ChevronLeft, Check, Info } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { PasswordStrengthMeter } from '../shared/PasswordStrengthMeter';
import { SignupData } from '@/hooks/useSignupState';
import { validateEmail, validatePassword } from '@/utils/validators';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useFirestore, useAuth } from '@/firebase';
import { cn } from '@/lib/utils';
import { getAuthErrorMessage } from '@/utils/firebaseErrors';

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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  // Email Duplicate Check
  useEffect(() => {
    if (!data.email || !validateEmail(data.email)) {
      setEmailStatus('idle');
      return;
    }

    const timer = setTimeout(async () => {
      setEmailStatus('loading');
      try {
        const q = query(collection(db, 'userProfiles'), where('email', '==', data.email.toLowerCase()), limit(1));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          setEmailStatus('valid');
          setEmailError(null);
        } else {
          setEmailStatus('invalid');
          setEmailError('Email already registered.');
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

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password!);
      await sendEmailVerification(userCredential.user);
      onUpdate({ firebaseUserUid: userCredential.user.uid });
      onNext();
    } catch (error: any) {
      setFirebaseError(getAuthErrorMessage(error.code));
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <button
        onClick={onPrev}
        className="w-44 h-44 flex items-center justify-center text-ivory-60 hover:text-ivory mb-20 -ml-12 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="mb-28">
        <span className="text-[12px] font-body font-medium text-ivory-40 uppercase tracking-widest">Step 2 of 4</span>
        <h2 className="font-headline font-bold text-ivory text-22 mt-4">Secure your account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="emeka@example.com"
          leftIcon={<Mail />}
          value={data.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          validationState={emailStatus}
          errorMessage={emailError}
        />

        <div className="space-y-8">
          <div className="flex items-center justify-between mb-8">
            <label className="text-[13px] font-body font-medium text-ivory-60 tracking-wider uppercase">
              Create Password
            </label>
            <div className="group relative">
              <Info size={14} className="text-ivory-30 cursor-help" />
              <div className="absolute bottom-full right-0 mb-8 w-200 p-12 bg-surface border border-gold-border rounded-lg text-[11px] text-ivory-60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                Use at least 8 characters with a mix of letters, numbers, and symbols.
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
            className="mt-[-12px]"
          />
          <PasswordStrengthMeter password={data.password} />
        </div>

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock />}
          value={data.confirmPassword}
          onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
          validationState={data.confirmPassword ? (passwordsMatch ? 'valid' : 'invalid') : 'idle'}
          errorMessage={data.confirmPassword && !passwordsMatch ? "Passwords don't match" : null}
        />

        {/* Terms Checkbox */}
        <label className="flex items-start gap-12 py-12 cursor-pointer group">
          <div className="relative pt-2">
            <input
              type="checkbox"
              className="sr-only"
              checked={data.termsAccepted}
              onChange={(e) => onUpdate({ termsAccepted: e.target.checked })}
              required
            />
            <div className={cn(
              "w-22 h-22 rounded-md border-1.5 transition-all flex items-center justify-center",
              data.termsAccepted ? "bg-gold-gradient border-transparent" : "border-white-20 bg-input-bg"
            )}>
              {data.termsAccepted && <Check size={14} className="text-obsidian animate-in zoom-in-50 duration-200" />}
            </div>
          </div>
          <span className="text-[13px] font-body text-ivory-60 leading-relaxed group-hover:text-ivory-80 transition-colors">
            I agree to the <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
          </span>
        </label>

        {firebaseError && (
          <div className="bg-error-subtle border border-error-border rounded-lg p-12 text-error text-[13px] animate-in slide-in-from-top-2">
            {firebaseError}
          </div>
        )}

        <div className="pt-12">
          <GoldButton type="submit" isLoading={isLoading} isDisabled={!isValid}>
            Secure My Account
          </GoldButton>
        </div>
      </form>
    </div>
  );
}
