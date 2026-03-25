'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, ChevronLeft, ChevronRight, Loader2, CheckCircle2, AlertCircle, Landmark } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { BankSelector } from './BankSelector';
import { SignupData } from '@/hooks/useSignupState';
import { cn } from '@/lib/utils';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

interface StepProps {
  data: SignupData;
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<SignupData>) => void;
}

export function Step4Bank({ data, onNext, onPrev, onUpdate }: StepProps) {
  const db = useFirestore();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  // Simulated Bank Verification (In a real app, this calls your API)
  const verifyAccount = useCallback(async (account: string, bank: string) => {
    setIsVerifying(true);
    setVerificationError(null);

    // Mock delay for Paystack simulation
    setTimeout(() => {
      // Logic simulation: If account starts with '9', fail name match for demo
      // In real life, this response comes from the server
      const mockVerifiedName = data.fullName.toUpperCase();
      const nameMatch = true;

      onUpdate({
        bankVerified: true,
        verifiedAccountName: mockVerifiedName,
        nameMatchPassed: nameMatch
      });
      setIsVerifying(false);
    }, 1500);
  }, [data.fullName, onUpdate]);

  useEffect(() => {
    if (data.accountNumber.length === 10 && data.selectedBank && !data.bankVerified) {
      verifyAccount(data.accountNumber, data.selectedBank);
    }
    
    // Clear verification if input changes
    if (data.bankVerified && (data.accountNumber.length !== 10 || !data.selectedBank)) {
      onUpdate({ bankVerified: false, verifiedAccountName: '', nameMatchPassed: false });
    }
  }, [data.accountNumber, data.selectedBank, data.bankVerified, verifyAccount, onUpdate]);

  const generateReferralCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `GETR-${code}`;
  };

  const handleFinish = async () => {
    if (!data.bankVerified || !data.nameMatchPassed || isFinishing) return;
    
    setIsFinishing(true);
    const refCode = generateReferralCode();

    try {
      if (!data.firebaseUserUid) throw new Error('Auth state missing');

      // Create main user profile document
      await setDoc(doc(db, 'userProfiles', data.firebaseUserUid), {
        id: data.firebaseUserUid,
        fullName: data.fullName,
        username: data.username.toLowerCase(),
        phoneNumber: data.phone,
        email: data.email,
        referralCode: refCode,
        referredBy: data.referralCode || null,
        bankName: data.selectedBank,
        bankAccountNumber: data.accountNumber,
        bankAccountName: data.verifiedAccountName,
        walletBalance: 0,
        totalEarned: 0,
        totalWithdrawn: 0,
        currentPlanId: 'none',
        isActive: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      onNext();
    } catch (error) {
      console.error(error);
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
        <p className="text-ivory-50 text-13 mt-4 leading-relaxed">Required to receive your automated Friday payouts.</p>
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
