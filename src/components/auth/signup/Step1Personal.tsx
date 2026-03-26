'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Tag, ChevronRight, Loader2 } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { SignupData } from '@/hooks/useSignupState';
import { validateFullName, validatePhone, validateUsername, normalizePhone } from '@/utils/validators';
import { useFirestore } from '@/firebase';
import { checkUsernameAvailability, validateReferralCode } from '@/firebase/auth-service';
import { useSearchParams } from 'next/navigation';

interface StepProps {
  data: SignupData;
  onNext: () => void;
  onUpdate: (data: Partial<SignupData>) => void;
}

export function Step1Personal({ data, onNext, onUpdate }: StepProps) {
  const db = useFirestore();
  const searchParams = useSearchParams();
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [referralStatus, setReferralStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [referralInfo, setReferralInfo] = useState<string | null>(null);
  const [referralError, setReferralError] = useState<string | null>(null);

  // Check for URL ref parameter on mount
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref && !data.referralCode) {
      onUpdate({ referralCode: ref.toUpperCase() });
    }
  }, [searchParams, data.referralCode, onUpdate]);

  // Debounced Username Check (600ms)
  useEffect(() => {
    if (!data.username) {
      setUsernameStatus('idle');
      setUsernameError(null);
      return;
    }

    if (!validateUsername(data.username)) {
      setUsernameStatus('invalid');
      setUsernameError("3-20 chars, lowercase, numbers, underscores only.");
      return;
    }

    const timer = setTimeout(async () => {
      setUsernameStatus('loading');
      try {
        const result = await checkUsernameAvailability(db, data.username);
        if (result.available) {
          setUsernameStatus('valid');
          setUsernameError(null);
        } else {
          setUsernameStatus('invalid');
          setUsernameError(result.reason === "taken" ? "Username taken. Please choose another." : "Invalid format.");
        }
      } catch (e) {
        setUsernameStatus('idle');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [data.username, db]);

  // Debounced Referral Code Check (600ms)
  useEffect(() => {
    if (!data.referralCode) {
      setReferralStatus('idle');
      setReferralInfo(null);
      setReferralError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setReferralStatus('loading');
      try {
        const result = await validateReferralCode(db, data.referralCode);
        if (result.valid) {
          setReferralStatus('valid');
          setReferralInfo(`Referred by ${result.referrerFullName}`);
          setReferralError(null);
        } else {
          setReferralStatus('invalid');
          const errorMap: any = {
            invalid_format: "Format: GETR-XXXXXXXX",
            not_found: "Referral code not found.",
            inactive_referrer: "This referrer is not currently active."
          };
          setReferralError(errorMap[result.reason!] || "Invalid referral code.");
          setReferralInfo(null);
        }
      } catch (e) {
        setReferralStatus('idle');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [data.referralCode, db]);

  const isValid = 
    validateFullName(data.fullName) && 
    usernameStatus === 'valid' && 
    validatePhone(data.phone) &&
    (data.referralCode === '' || referralStatus === 'valid');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // Normalize phone number before moving to next step
      onUpdate({ phone: normalizePhone(data.phone) });
      onNext();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-32">
        <span className="text-[12px] font-body font-medium text-ivory-40 uppercase tracking-widest">Step 1 of 4</span>
        <h2 className="font-headline font-bold text-ivory text-22 mt-4">Let's get to know you</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        <AuthInput
          label="Full Name (Bank Name)"
          placeholder="e.g. Adaeze Okonkwo"
          leftIcon={<User />}
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          helperText="Should match your bank account name."
          validationState={data.fullName ? (validateFullName(data.fullName) ? 'valid' : 'invalid') : 'idle'}
          required
        />

        <AuthInput
          label="Username"
          placeholder="adaeze_24"
          leftIcon={<div className="font-headline font-bold text-16">@</div>}
          value={data.username}
          onChange={(e) => onUpdate({ username: e.target.value.toLowerCase() })}
          validationState={usernameStatus}
          errorMessage={usernameError}
          helperText={usernameStatus === 'loading' ? 'Checking availability...' : (usernameStatus === 'valid' ? '✓ Username available' : undefined)}
          required
        />

        <AuthInput
          label="Phone Number"
          type="tel"
          placeholder="801 234 5678"
          leftPaddingClassName="pl-[92px] lg:pl-[104px]"
          leftIcon={
            <div className="flex items-center gap-4">
              <span className="text-16">🇳🇬</span>
              <span className="text-14 font-medium text-ivory-40">+234</span>
              <div className="w-px h-16 bg-white-15 mx-2" />
            </div>
          }
          value={data.phone}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 11);
            onUpdate({ phone: val });
          }}
          validationState={data.phone.length >= 10 ? (validatePhone(data.phone) ? 'valid' : 'invalid') : 'idle'}
          helperText="Enter your mobile number (e.g., 080... or 80...)"
          required
        />

        <div className="pt-8 border-t border-border-subtle mt-8">
          <AuthInput
            label="Referral Code (Optional)"
            placeholder="GETR-ABC12345"
            leftIcon={<Tag />}
            value={data.referralCode}
            onChange={(e) => onUpdate({ referralCode: e.target.value.toUpperCase() })}
            validationState={referralStatus}
            errorMessage={referralError}
            helperText={referralInfo}
          />
        </div>

        <div className="pt-8">
          <GoldButton type="submit" isDisabled={!isValid}>
            Continue <ChevronRight className="inline-block ml-4" size={18} />
          </GoldButton>
        </div>
      </form>

      <div className="mt-24 text-center">
        <p className="text-ivory-50 text-[14px] font-body">
          Already have an account?{' '}
          <Link href="/login" className="text-gold font-body font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
