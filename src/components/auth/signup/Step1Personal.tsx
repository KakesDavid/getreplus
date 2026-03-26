
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Tag, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { SignupData } from '@/hooks/useSignupState';
import { validateFullName, validatePhone, validateUsername, normalizePhone } from '@/utils/validators';
import { useFirestore } from '@/firebase';
import { checkUsernameAvailability, validateReferralCode } from '@/firebase/auth-service';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

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

  // Handle URL Ref Param
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref && !data.referralCode) {
      onUpdate({ referralCode: ref.toUpperCase() });
    }
  }, [searchParams, data.referralCode, onUpdate]);

  // Debounced Username Check
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
        console.error("Username check error:", e);
        setUsernameStatus('idle');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [data.username, db]);

  // Debounced Referral Code Check
  useEffect(() => {
    if (!data.referralCode) {
      setReferralStatus('idle');
      setReferralInfo(null);
      setReferralError(null);
      return;
    }

    const timer = setTimeout(async () => {
      console.log(`[UI] Triggering validation for: ${data.referralCode}`);
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
            invalid_format: "Use format: GETR-XXXXXXXX",
            not_found: "Referral code not found.",
            inactive_referrer: "This referrer is not currently active."
          };
          setReferralError(errorMap[result.reason!] || "Invalid referral code.");
          setReferralInfo(null);
        }
      } catch (e) {
        console.error("Referral validation error:", e);
        setReferralStatus('idle');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [data.referralCode, db]);

  const isPhoneValid = validatePhone(data.phone);
  const isNameValid = validateFullName(data.fullName);
  const isUsernameValid = usernameStatus === 'valid';
  const isReferralValid = !data.referralCode || referralStatus === 'valid';

  const isValid = isNameValid && isUsernameValid && isPhoneValid && isReferralValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onUpdate({ phone: normalizePhone(data.phone) });
      onNext();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-20">
        <span className="text-[11px] font-headline font-bold text-gold/60 uppercase tracking-widest">Step 1 of 4</span>
        <h2 className="font-headline font-bold text-ivory text-22 mt-4">Personal Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <AuthInput
          label="Full Name (As shown on bank)"
          placeholder="e.g. Adaeze Okonkwo"
          leftIcon={<User />}
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          helperText="Should match your bank account name exactly."
          validationState={data.fullName ? (isNameValid ? 'valid' : 'invalid') : 'idle'}
          required
          className="h-[48px]"
        />

        <AuthInput
          label="Username"
          placeholder="adaeze_24"
          leftIcon={<div className="font-headline font-bold text-16 opacity-40">@</div>}
          value={data.username}
          onChange={(e) => onUpdate({ username: e.target.value.toLowerCase() })}
          validationState={usernameStatus}
          errorMessage={usernameError}
          helperText={usernameStatus === 'loading' ? 'Checking availability...' : (usernameStatus === 'valid' ? '✓ Username available' : undefined)}
          required
          className="h-[48px]"
        />

        <AuthInput
          label="Phone Number"
          type="tel"
          placeholder="801 234 5678"
          leftPaddingClassName="pl-[92px]"
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
          validationState={data.phone.length >= 10 ? (isPhoneValid ? 'valid' : 'invalid') : 'idle'}
          helperText="Enter your mobile number (e.g. 080... or 80...)"
          required
          className="h-[48px]"
        />

        <div className="pt-8 border-t border-white-5 mt-4">
          <AuthInput
            label="Referral Code (Optional)"
            placeholder="GETR-ABC12345"
            leftIcon={<Tag />}
            value={data.referralCode}
            onChange={(e) => onUpdate({ referralCode: e.target.value.toUpperCase() })}
            validationState={referralStatus}
            errorMessage={referralError}
            className="h-[48px]"
          />
          
          {referralStatus === 'valid' && referralInfo && (
            <div className="mt-2 flex items-center gap-6 bg-emerald/10 border border-emerald/20 px-10 py-6 rounded-lg animate-in zoom-in-95 duration-200">
              <CheckCircle2 size={14} className="text-emerald" />
              <span className="text-[12px] font-bold text-emerald">{referralInfo}</span>
            </div>
          )}
        </div>

        <div className="pt-12">
          <GoldButton type="submit" isDisabled={!isValid} className="h-[52px]">
            Continue <ChevronRight className="inline-block ml-4" size={18} />
          </GoldButton>
        </div>
      </form>

      <div className="mt-20 text-center">
        <p className="text-ivory-50 text-[13px] font-body">
          Already have an account?{' '}
          <Link href="/login" className="text-gold font-body font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
