'use client';
import { useState, useCallback } from 'react';

export type SignupStep = 1 | 2 | 3 | 4 | 5;

export interface SignupData {
  // Step 1
  fullName: string;
  username: string;
  phone: string;
  referralCode: string;
  
  // Step 2
  email: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted: boolean;
  
  // Step 3 (Verification)
  verificationSent: boolean;
  resendCount: number;
  resendCooldown: number;
  
  // Step 4 (Bank)
  selectedBank: string;
  accountNumber: string;
  verifiedAccountName: string;
  bankVerified: boolean;
  nameMatchPassed: boolean;
  bankVerificationPersisted: any; // Data that survives step changes
  
  // Meta
  signupIp: string;
  deviceFingerprint: string;
  firebaseUserUid?: string;
}

export function useSignupState() {
  const [step, setStep] = useState<SignupStep>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [formData, setFormData] = useState<SignupData>({
    fullName: '',
    username: '',
    phone: '',
    referralCode: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    verificationSent: false,
    resendCount: 0,
    resendCooldown: 0,
    selectedBank: '',
    accountNumber: '',
    verifiedAccountName: '',
    bankVerified: false,
    nameMatchPassed: false,
    bankVerificationPersisted: null,
    signupIp: '',
    deviceFingerprint: '',
  });

  const nextStep = useCallback(() => {
    if (step < 5) {
      setIsTransitioning(true);
      setDirection('forward');
      setTimeout(() => {
        setStep((s) => (s + 1) as SignupStep);
        setIsTransitioning(false);
      }, 250);
    }
  }, [step]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setIsTransitioning(true);
      setDirection('backward');
      setTimeout(() => {
        setStep((s) => (s - 1) as SignupStep);
        setIsTransitioning(false);
      }, 250);
    }
  }, [step]);

  const updateData = useCallback((data: Partial<SignupData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const persistBankVerification = useCallback((data: any) => {
    setFormData((prev) => ({ ...prev, bankVerificationPersisted: data }));
  }, []);

  return { 
    step, 
    formData, 
    direction,
    isTransitioning,
    nextStep, 
    prevStep, 
    updateData,
    persistBankVerification 
  };
}
