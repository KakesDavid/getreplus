'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ShieldCheck, ChevronLeft, Loader2, CheckCircle2, AlertCircle, Landmark } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { BankSelector } from './BankSelector';
import { SignupData } from '@/hooks/useSignupState';
import { useFirestore } from '@/firebase';
import { updateUserBankAccount } from '@/firebase/auth-service';
import { resolveBankAccount } from '@/app/actions/paystack';
import { cn } from '@/lib/utils';

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

  // Memoize bankCode access
  const bankCode = (data as any).selectedBankCode;

  // Persistence and Validation Sync Effect
  useEffect(() => {
    // 1. Restore persisted state if available
    if (data.bankVerificationPersisted && !data.bankVerified) {
      onUpdate({ 
        bankVerified: data.bankVerificationPersisted.bankVerified,
        verifiedAccountName: data.bankVerificationPersisted.verifiedAccountName,
        nameMatchPassed: data.bankVerificationPersisted.nameMatchPassed
      });
      return;
    }

    // 2. Clear verification if inputs change and become invalid
    if (data.bankVerified && (data.accountNumber.length !== 10 || !data.selectedBank)) {
      onUpdate({ bankVerified: false, verifiedAccountName: '', nameMatchPassed: false });
    }
  }, [data.accountNumber, data.selectedBank, data.bankVerified, data.bankVerificationPersisted, onUpdate]);

  const verifyAccount = useCallback(async (account: string, code: string) => {
    if (isVerifying) return;
    setIsVerifying(true);
    setError(null);
    
    try {
      const result = await resolveBankAccount(account, code);
      
      if (result.success) {
        const verifiedName = result.accountName;
        const userParts = data.fullName.toLowerCase().split(' ');
        const verifiedParts = verifiedName.toLowerCase().split(' ');
        const nameMatch = userParts.some(part => part.length > 2 && verifiedParts.some(vp => vp.includes(part) || part.includes(vp)));

        const verificationResult = {
          bankVerified: true,
          verifiedAccountName: verifiedName,
          nameMatchPassed: nameMatch
        };

        onUpdate({
          ...verificationResult,
          bankVerificationPersisted: verificationResult
        });
      } else {
        onUpdate({ bankVerified: false, verifiedAccountName: '', nameMatchPassed: false });
        setError(result.error);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsVerifying(false);
    }
  }, [data.fullName, onUpdate, isVerifying]);

  // Trigger verification effect
  useEffect(() => {
    if (data.accountNumber.length === 10 && bankCode && !data.bankVerified && !isVerifying && !error) {
      verifyAccount(data.accountNumber, bankCode);
    }
  }, [data.accountNumber, bankCode, data.bankVerified, isVerifying, verifyAccount, error]);

  const handleBankSelect = useCallback((name: string, code: string) => {
    onUpdate({ selectedBank: name, selectedBankCode: code } as any);
    setError(null); // Clear errors when bank changes
  }, [onUpdate]);

  const handleFinish = async () => {
    if (!data.bankVerified || !data.nameMatchPassed || isFinishing) return;
    
    setIsFinishing(true);
    setError(null);

    try {
      if (!data.firebaseUserUid) throw new Error('Auth state missing');

      await updateUserBankAccount(db, data.firebaseUserUid, {
        bankName: data.selectedBank,
        bankCode: bankCode || "000", 
        accountNumber: data.accountNumber,
        accountName: data.verifiedAccountName
      });

      onNext();
    } catch (err: any) {
      setError("Failed to link bank account. Please try again.");
      setIsFinishing(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onPrev}
          className="w-32 h-32 flex items-center justify-center text-ivory-40 hover:text-white transition-colors -ml-10"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-6 bg-emerald/10 border border-emerald/20 px-10 py-2 rounded-full">
           <ShieldCheck size={12} className="text-emerald" />
           <span className="text-[10px] font-bold text-emerald uppercase tracking-widest">Payout Link</span>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-headline font-bold text-ivory text-[20px] leading-tight">Bank Details</h2>
        <p className="text-ivory-50 text-[12px] mt-1">Where you want to receive your money.</p>
      </div>

      <div className="space-y-10">
        <div className="bg-white/5 border border-white-15 rounded-2xl p-12 space-y-8">
          <BankSelector 
            selectedBankName={data.selectedBank}
            onSelect={handleBankSelect}
            disabled={isVerifying || isFinishing}
          />

          <AuthInput
            label="Account Number"
            placeholder="0123456789"
            inputMode="numeric"
            maxLength={10}
            value={data.accountNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
              onUpdate({ accountNumber: val });
              if (error) setError(null);
            }}
            disabled={isVerifying || isFinishing}
            validationState={isVerifying ? 'loading' : (data.bankVerified ? 'valid' : 'idle')}
            className="h-[44px]"
          />
        </div>

        {isVerifying && (
          <div className="flex items-center justify-center gap-8 text-gold py-1 animate-pulse">
            <Loader2 className="animate-spin" size={14} />
            <span className="text-[11px] font-medium">Resolving account via Paystack...</span>
          </div>
        )}

        {data.bankVerified && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
            <div className="bg-obsidian border border-gold/20 rounded-xl p-10 flex items-center gap-10">
              <div className="w-32 h-32 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Landmark className="text-gold" size={16} />
              </div>
              <div className="overflow-hidden">
                <span className="text-[9px] font-bold text-ivory-40 uppercase tracking-wider block mb-0.5">Account Name</span>
                <div className="text-[13px] font-headline font-bold text-gold truncate">{data.verifiedAccountName}</div>
              </div>
            </div>

            {data.nameMatchPassed ? (
              <div className="flex items-center gap-6 text-emerald bg-emerald/10 border border-emerald/20 p-8 rounded-lg">
                <CheckCircle2 size={14} className="shrink-0" />
                <span className="text-[11px] font-bold">Identity Verified ✓</span>
              </div>
            ) : (
              <div className="bg-error-subtle border border-error-border p-10 rounded-xl space-y-4">
                <div className="flex items-center gap-8 text-error">
                  <AlertCircle size={14} className="shrink-0" />
                  <span className="text-[11px] font-bold">Name Mismatch</span>
                </div>
                <p className="text-[10px] text-error/80 leading-relaxed">
                  Bank name doesn't match your profile.
                </p>
                <button onClick={onPrev} className="text-[11px] font-bold text-gold hover:underline">
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        )}

        {error && !isVerifying && (
          <div className="bg-error-subtle border border-error-border rounded-xl p-8 flex items-start gap-8 text-error text-[11px] animate-in slide-in-from-top-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <p className="leading-snug">{error}</p>
          </div>
        )}

        <div className="pt-2">
          <GoldButton 
            onClick={handleFinish}
            isLoading={isFinishing}
            isDisabled={!data.bankVerified || !data.nameMatchPassed}
            className="h-[48px]"
          >
            {isFinishing ? "Linking Account..." : "Finish Registration"}
          </GoldButton>
        </div>
      </div>
    </div>
  );
}
