
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

  // Handle Return from Email Verification or Refresh
  useEffect(() => {
    if (!isUserLoading && user) {
      if (user.emailVerified && step < 4) {
        jumpToStep(4);
        updateData({ 
          firebaseUserUid: user.uid, 
          email: user.email || formData.email 
        });
      }
    }
  }, [user, isUserLoading, step, jumpToStep, updateData, formData.email]);

  const renderStep = () => {
    if (!isHydrated) return (
      <div className="min-h-[300px] flex flex-col items-center justify-center gap-12 text-ivory-30">
        <div className="w-24 h-24 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        <span className="text-sm font-medium">Restoring your progress...</span>
      </div>
    );

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
    <div className="w-full max-w-[460px] animate-in fade-in duration-500 mx-auto mt-0">
      <div className="flex flex-col items-center mb-12">
        <span className="font-subheadline font-medium text-gold text-[11px] mb-2 uppercase tracking-[0.2em]">Registration</span>
        <h1 className="font-headline font-bold text-ivory text-[24px] lg:text-[26px]">Join GetrePlus</h1>
      </div>

      <div className="px-16 mb-12">
        <ProgressBar step={step} total={5} />
        <StepDots currentStep={step} totalSteps={5} />
      </div>

      <div className="bg-surface border border-gold/15 rounded-[24px] p-16 sm:p-20 lg:p-24 shadow-card-shadow relative min-h-[400px] overflow-hidden group">
        <div className="noise-overlay" />
        <div 
          className={cn(
            "w-full transition-all duration-300 ease-in-out relative z-10",
            isTransitioning ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100",
            isTransitioning && direction === 'forward' && "-translate-x-4",
            isTransitioning && direction === 'backward' && "translate-x-4"
          )}
        >
          {renderStep()}
        </div>
      </div>
      
      {/* Bottom spacer removal as requested */}
      <div className="h-16" />
    </div>
  );
}
