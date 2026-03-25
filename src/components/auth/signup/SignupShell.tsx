'use client';
import React from 'react';
import { useSignupState } from '@/hooks/useSignupState';
import { Step1Personal } from './Step1Personal';
import { Step2Security } from './Step2Security';
import { Step3Verification } from './Step3Verification';
import { Step4Bank } from './Step4Bank';
import { Step5Success } from './Step5Success';
import { ProgressBar } from './ProgressBar';
import { StepDots } from './StepDots';
import { cn } from '@/lib/utils';

export function SignupShell() {
  const { step, formData, direction, isTransitioning, nextStep, prevStep, updateData } = useSignupState();

  const renderStep = () => {
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
    <div className="w-full max-w-[480px] animate-in fade-in duration-500 mx-auto py-32 lg:py-48">
      <div className="flex flex-col items-center mb-32">
        <div className="w-40 h-40 bg-secondary rounded-xl flex items-center justify-center mb-16 shadow-button-glow animate-pulse-glow">
          <span className="font-headline font-bold text-gold text-20">G+</span>
        </div>
        <span className="font-subheadline font-medium text-ivory-50 text-[14px] mb-4">Create your account</span>
        <h1 className="font-headline font-bold text-ivory text-[24px] lg:text-[28px]">GetrePlus</h1>
      </div>

      <div className="px-16 mb-24">
        <ProgressBar step={step} total={5} />
        <StepDots currentStep={step} totalSteps={5} />
      </div>

      <div className="bg-surface border border-border-subtle rounded-[24px] p-24 sm:p-32 lg:p-40 shadow-card-shadow relative min-h-[440px] overflow-hidden">
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
