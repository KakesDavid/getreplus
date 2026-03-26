'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, ChevronLeft, Loader2, CheckCircle2, AlertCircle, Landmark } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { BankSelector } from './BankSelector';
import { SignupData } from '@/hooks/useSignupState';
import { useFirestore } from '@/firebase';
import { updateUserBankAccount } from '@/firebase/auth-service';
import { resolveBankAccount } from '@/app/actions/paystack';

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

  // Restore state if returning from Step 5
  useEffect(() => {
    if (data.bankVerificationPersisted && !data.bankVerified) {
      onUpdate({ 
        bankVerified: data.bankVerificationPersisted.bankVerified,
        verifiedAccountName: data.bankVerificationPersisted.verifiedAccountName,
        nameMatchPassed: data.bankVerificationPersisted.nameMatchPassed
      });
    }
  }, [data.bankVerificationPersisted, data.bankVerified, onUpdate]);

  const verifyAccount = useCallback(async (account: string, bankCode: string) => {
    setIsVerifying(true);
    setError(null);
    
    try {
      const result = await resolveBankAccount(account, bankCode);
      
      if (result.success) {
        const verifiedName = result.accountName;
        // Basic name matching logic: check if at least one name part matches
        const userParts = data.fullName.toLowerCase().split(' ');
        const verifiedParts = verifiedName.toLowerCase().split(' ');
        const nameMatch = userParts.some(part => part.length > 2 && verifiedParts.includes(part));

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
        setError(result.error || "Could not verify account.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsVerifying(false);
    }
  }, [data.fullName, onUpdate]);

  // Auto-trigger verification when fields are complete
  useEffect(() => {
    const bankCode = (data as any).selectedBankCode;
    if (data.accountNumber.length === 10 && bankCode && !data.bankVerified && !isVerifying) {
      verifyAccount(data.accountNumber, bankCode);
    }
    
    // Reset verification if user changes details
    if (data.bankVerified && (data.accountNumber.length !== 10 || !data.selectedBank)) {
      onUpdate({ bankVerified: false, verifiedAccountName: '', nameMatchPassed: false });
    }
  }, [data.accountNumber, (data as any).selectedBankCode, data.selectedBank, data.bankVerified, isVerifying, verifyAccount, onUpdate]);

  const handleFinish = async () => {
    if (!data.bankVerified || !data.nameMatchPassed || isFinishing) return;
    
    setIsFinishing(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      setIsFinishing(false);
      setError("Operation timed out. Please check your network and try again.");
    }, 30000);

    try {
      if (!data.firebaseUserUid) throw new Error('Auth state missing');

      await updateUserBankAccount(db, data.firebaseUserUid, {
        bankName: data.selectedBank,
        bankCode: (data as any).selectedBankCode || "000", 
        accountNumber: data.accountNumber,
        accountName: data.verifiedAccountName
      });

      clearTimeout(timeoutId);
      onNext();
    } catch (err: any) {
      clearTimeout(timeoutId);
      setError("Failed to save bank details. Please try again.");
      setIsFinishing(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-16">
        <button
          onClick={onPrev}
          className="w-40 h-40 flex items-center justify-center text-ivory-40 hover:text-white transition-colors -ml-12"
          aria-label="Back"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-6 bg-emerald/10 border border-emerald/20 px-10 py-3 rounded-full">
           <ShieldCheck size={14} className="text-emerald" />
           <span className="text-[10px] font-bold text-emerald uppercase tracking-widest">Paystack Secured</span>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="font-headline font-bold text-ivory text-[22px] leading-tight">Payout Details</h2>
        <p className="text-ivory-50 text-[13px] mt-2">Required for your weekly Friday disbursements.</p>
      </div>

      <div className="space-y-16">
        <div className="bg-white/5 border border-white-15 rounded-2xl p-16 space-y-16">
          <BankSelector 
            selectedBankName={data.selectedBank}
            onSelect={(name, code) => onUpdate({ selectedBank: name, selectedBankCode: code } as any)}
            disabled={isVerifying || isFinishing}
          />

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
            validationState={isVerifying ? 'loading' : (data.bankVerified ? 'valid' : 'idle')}
            className="h-[52px]"
            helperText={data.accountNumber.length > 0 ? `${data.accountNumber.length}/10 digits` : null}
          />
        </div>

        {isVerifying && (
          <div className="flex items-center justify-center gap-8 text-gold py-8 animate-pulse">
            <Loader2 className="animate-spin" size={16} />
            <span className="text-[13px] font-medium">Resolving account via Paystack...</span>
          </div>
        )}

        {data.bankVerified && (
          <div className="space-y-12 animate-in fade-in slide-in-from-top-2">
            <div className="bg-obsidian border border-gold/20 rounded-xl p-12 lg:p-16 flex items-center gap-12">
              <div className="w-40 h-40 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Landmark className="text-gold" size={20} />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold text-ivory-40 uppercase tracking-wider block mb-1">Account Name</span>
                <div className="text-[15px] font-headline font-bold text-gold truncate">{data.verifiedAccountName}</div>
              </div>
            </div>

            {data.nameMatchPassed ? (
              <div className="flex items-center gap-8 text-emerald bg-emerald/10 border border-emerald/20 p-12 rounded-lg">
                <CheckCircle2 size={16} className="shrink-0" />
                <span className="text-[13px] font-bold">Name matches legal profile ✓</span>
              </div>
            ) : (
              <div className="bg-error-subtle border border-error-border p-12 rounded-lg space-y-8">
                <div className="flex items-center gap-8 text-error">
                  <AlertCircle size={16} className="shrink-0" />
                  <span className="text-[13px] font-bold">Name Mismatch Detected</span>
                </div>
                <p className="text-[12px] text-error/80 leading-relaxed">
                  Bank account name does not match the Full Name from Step 1. Please use an account in your legal name.
                </p>
                <button 
                  onClick={onPrev} 
                  className="text-[12px] font-bold text-gold hover:underline"
                >
                  Edit Legal Name
                </button>
              </div>
            )}
          </div>
        )}

        {error && !isVerifying && (
          <div className="bg-error-subtle border border-error-border rounded-xl p-12 flex items-start gap-10 text-error text-[13px] animate-in slide-in-from-top-2">
            <AlertCircle size={18} className="shrink-0 mt-1" />
            <p>{error}</p>
          </div>
        )}

        <div className="pt-8">
          <GoldButton 
            onClick={handleFinish}
            isLoading={isFinishing}
            isDisabled={!data.bankVerified || !data.nameMatchPassed}
            className="h-[56px] text-[16px]"
          >
            {isFinishing ? "Linking Account..." : "Finalize Registration"}
          </GoldButton>
        </div>
      </div>
    </div>
  );
}
