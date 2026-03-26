'use client';
import React, { useEffect } from 'react';
import { useSignupState } from '@/hooks/useSignupState';
import { Step1Personal } from './Step1Personal';
import { Step2Security } from './Step2Security';
import { Step3Verification } from './Step3Verification';
import { Step4Bank } from './Step4Bank';
import { Step5Success } from './Step5Success';
import { ProgressBar } from './ProgressBar';
import { StepDots } from './StepDots';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

export function SignupShell() {
  const { user, isUserLoading } = useUser();
  const { step, formData, direction, isTransitioning, isHydrated, nextStep, prevStep, updateData, jumpToStep } = useSignupState();

  // Handle Return from Email Verification
  useEffect(() => {
    if (!isUserLoading && user && user.emailVerified) {
      // If user is verified and on an earlier step, jump to Bank details
      if (step < 4) {
        jumpToStep(4);
        updateData({ firebaseUserUid: user.uid, email: user.email || formData.email });
      }
    }
  }, [user, isUserLoading, step, jumpToStep, updateData, formData.email]);

  const renderStep = () => {
    if (!isHydrated) return <div className="min-h-[400px] flex items-center justify-center text-ivory-30">Loading your progress...</div>;

    switch (step) {
      case 1:
        return <Step1Personal data={formData} onNext={nextStep} onUpdate={updateData} />;
      case 2:
        return <Step2Security data={formData} onNext={nextStep} onPrev={prevStep} onUpdate={updateData} />;
      case 3:
        return <Step3Verification data={formData} onNext={nextStep} onPrev={prevStep} onUpdate={updateData} />;
      case 4:
        return <Step4Bank data={formData} onNext={nextStep} onPrev={prevStep} onUpdate={updateData} />;
      case 5:
        return <Step5Success data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[480px] animate-in fade-in duration-500 mx-auto pt-0 pb-16 lg:pt-8 lg:pb-24">
      <div className="flex flex-col items-center mb-16 lg:mb-24">
        <span className="font-subheadline font-medium text-ivory-40 text-[13px] mb-2 uppercase tracking-widest">Registration</span>
        <h1 className="font-headline font-bold text-ivory text-[22px] lg:text-[26px]">Join GetrePlus</h1>
      </div>

      <div className="px-16 mb-20 lg:mb-24">
        <ProgressBar step={step} total={5} />
        <StepDots currentStep={step} totalSteps={5} />
      </div>

      <div className="bg-surface border border-border-subtle rounded-[24px] p-20 sm:p-24 lg:p-32 shadow-card-shadow relative min-h-[440px] overflow-hidden">
        <div 
          className={cn(
            "w-full transition-all duration-250 ease-in-out",
            isTransitioning ? "opacity-0" : "opacity-100",
            isTransitioning && direction === 'forward' && "-translate-x-8",
            isTransitioning && direction === 'backward' && "translate-x-8"
          )}
        >
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
