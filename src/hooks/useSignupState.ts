
'use client';
import { useState, useCallback, useEffect } from 'react';

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
  bankVerificationPersisted: any;
  
  // Meta
  signupIp: string;
  deviceFingerprint: string;
  firebaseUserUid?: string;
}

const STORAGE_KEY = 'getreplus_signup_state_v2';

export function useSignupState() {
  const [step, setStep] = useState<SignupStep>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // We never restore passwords for security
        setFormData(prev => ({ 
          ...prev, 
          ...parsed.formData, 
          password: '', 
          confirmPassword: '' 
        }));
        setStep(parsed.step || 1);
      } catch (e) {
        console.error("Failed to parse signup state", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isHydrated) return;
    
    const { password, confirmPassword, ...persistableData } = formData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      step,
      formData: persistableData
    }));

    // Clear on absolute success
    if (step === 5) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [formData, step, isHydrated]);

  const nextStep = useCallback(() => {
    if (step < 5) {
      setIsTransitioning(true);
      setDirection('forward');
      setTimeout(() => {
        setStep((s) => (s + 1) as SignupStep);
        setIsTransitioning(false);
      }, 300);
    }
  }, [step]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setIsTransitioning(true);
      setDirection('backward');
      setTimeout(() => {
        setStep((s) => (s - 1) as SignupStep);
        setIsTransitioning(false);
      }, 300);
    }
  }, [step]);

  const updateData = useCallback((data: Partial<SignupData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const jumpToStep = useCallback((target: SignupStep) => {
    setStep(target);
  }, []);

  return { 
    step, 
    formData, 
    direction,
    isTransitioning,
    isHydrated,
    nextStep, 
    prevStep, 
    updateData,
    jumpToStep
  };
}
