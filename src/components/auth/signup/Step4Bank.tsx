'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, ChevronLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { BankSelector } from './BankSelector';
import { SignupData } from '@/hooks/useSignupState';
import { useFirestore } from '@/firebase';
import { updateUserBankAccount } from '@/firebase/auth-service';

interface StepProps {
  data: SignupData;
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<SignupData>) => void;
}

export function Step4Bank({ data, onNext, onPrev, onUpdate }: StepProps) {
  const db = useFirestore();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore verification state if user navigated away and back
  useEffect(() => {
    if (data.bankVerificationPersisted && !data.bankVerified) {
      onUpdate({ ...data.bankVerificationPersisted });
    }
  }, []);

  const verifyAccount = useCallback(async (account: string, bank: string) => {
    setIsVerifying(true);
    setError(null);
    // Mock delay for Paystack simulation
    setTimeout(() => {
      const mockVerifiedName = data.fullName.toUpperCase();
      const nameMatch = true;

      const verificationResult = {
        bankVerified: true,
        verifiedAccountName: mockVerifiedName,
        nameMatchPassed: nameMatch
      };

      onUpdate(verificationResult);
      setIsVerifying(false);
    }, 1500);
  }, [data.fullName, onUpdate]);

  useEffect(() => {
    if (data.accountNumber.length === 10 && data.selectedBank && !data.bankVerified) {
      verifyAccount(data.accountNumber, data.selectedBank);
    }
    
    if (data.bankVerified && (data.accountNumber.length !== 10 || !data.selectedBank)) {
      onUpdate({ bankVerified: false, verifiedAccountName: '', nameMatchPassed: false });
    }
  }, [data.accountNumber, data.selectedBank, data.bankVerified, verifyAccount, onUpdate]);

  const handleFinish = async () => {
    if (!data.bankVerified || !data.nameMatchPassed || isFinishing) return;
    
    setIsFinishing(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      if (isFinishing) {
        setIsFinishing(false);
        setError("Update took too long. Please check your network and try again.");
      }
    }, 30000);

    try {
      if (!data.firebaseUserUid) throw new Error('Auth state missing');

      await updateUserBankAccount(db, data.firebaseUserUid, {
        bankName: data.selectedBank,
        bankCode: "000", // Actual code would be from bank list in production
        accountNumber: data.accountNumber,
        accountName: data.verifiedAccountName
      });

      clearTimeout(timeoutId);
      onNext();
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error(err);
      setError("Failed to save bank details. Please try again.");
      setIsFinishing(false);
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
        <div className="flex items-center gap-8 mb-4">
          <ShieldCheck className="text-gold animate-pulse-glow" size={18} />
          <span className="text-[12px] font-body font-medium text-ivory-40 uppercase tracking-widest">Step 4 of 4</span>
        </div>
        <h2 className="font-headline font-bold text-ivory text-22">Link your bank account</h2>
        <p className="text-ivory-50 text-13 mt-4 leading-relaxed">Required to receive your weekly payouts.</p>
      </div>

      <div className="bg-emerald/10 border border-emerald/20 rounded-xl p-12 flex items-center gap-12 mb-24">
        <div className="w-32 h-32 bg-emerald/20 rounded-full flex items-center justify-center shrink-0">
          <ShieldCheck className="text-emerald" size={16} />
        </div>
        <p className="text-12 text-emerald font-medium leading-tight">
          Secured by Paystack. Your details are never stored locally and are only used for payouts.
        </p>
      </div>

      <div className="space-y-24">
        <BankSelector 
          selectedBank={data.selectedBank}
          onSelect={(bank) => onUpdate({ selectedBank: bank })}
          disabled={isVerifying || isFinishing}
        />

        <div className="relative">
          <AuthInput
            label="Account Number"
            placeholder="0123456789"
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={data.accountNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
              onUpdate({ accountNumber: val });
            }}
            disabled={isVerifying || isFinishing}
            helperText={`${data.accountNumber.length} / 10 digits`}
            validationState={isVerifying ? 'loading' : (data.bankVerified ? 'valid' : 'idle')}
          />
        </div>

        {isVerifying && (
          <div className="flex items-center gap-8 text-gold animate-pulse">
            <Loader2 className="animate-spin" size={14} />
            <span className="text-13 font-medium">Verifying with Paystack...</span>
          </div>
        )}

        {data.bankVerified && (
          <div className="space-y-12 animate-in fade-in slide-in-from-top-2">
            <div className="bg-white/5 border border-white-15 rounded-xl p-16">
              <span className="text-[11px] font-bold text-ivory-40 uppercase tracking-wider block mb-4">Verified Account Name</span>
              <div className="text-16 font-headline font-bold text-gold">{data.verifiedAccountName}</div>
            </div>

            {data.nameMatchPassed ? (
              <div className="flex items-center gap-8 text-emerald bg-emerald/10 border border-emerald/20 p-12 rounded-lg">
                <CheckCircle2 size={16} />
                <span className="text-13 font-bold">Name matches legal profile ✓</span>
              </div>
            ) : (
              <div className="bg-error-subtle border border-error-border p-12 rounded-lg space-y-8">
                <div className="flex items-center gap-8 text-error">
                  <AlertCircle size={16} />
                  <span className="text-13 font-bold">Account Name Mismatch</span>
                </div>
                <p className="text-12 text-error/80 leading-relaxed">
                  The name on this bank account doesn't match the Full Name you provided in Step 1. Weekly payouts will be rejected if names don't match.
                </p>
                <div className="flex gap-12 pt-4">
                  <button onClick={onPrev} className="text-12 font-bold text-error underline">Try Another Account</button>
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="bg-error-subtle border border-error-border rounded-lg p-12 text-error text-[13px] animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <div className="pt-12">
          <GoldButton 
            onClick={handleFinish}
            isLoading={isFinishing}
            isDisabled={!data.bankVerified || !data.nameMatchPassed}
          >
            Create My Account
          </GoldButton>
        </div>
      </div>
    </div>
  );
}
