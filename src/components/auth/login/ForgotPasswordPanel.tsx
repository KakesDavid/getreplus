'use client';
import React, { useState } from 'react';
import { ChevronLeft, Mail as MailIcon, CheckCircle2 } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { validateEmail } from '@/utils/validators';

interface ForgotPasswordPanelProps {
  onBack: () => void;
}

export function ForgotPasswordPanel({ onBack }: ForgotPasswordPanelProps) {
  const [formState, setFormState] = useState<'form' | 'success'>('form');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setIsLoading(true);
    // Firebase logic will go here
    setTimeout(() => {
      setIsLoading(false);
      setFormState('success');
    }, 800);
  };

  if (formState === 'success') {
    return (
      <div className="w-full max-w-[440px] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-[72px] h-[72px] bg-gold-subtle rounded-full flex items-center justify-center mb-24 animate-bounce-gentle">
          <CheckCircle2 className="text-gold" size={40} />
        </div>
        
        <h2 className="font-headline font-bold text-ivory text-[24px] lg:text-[28px] mb-12">Reset link sent</h2>
        <p className="text-ivory-55 text-base leading-relaxed mb-32">
          We sent a password reset link to <span className="text-gold font-medium">{email}</span>. Please check your inbox and spam folder.
        </p>

        <div className="w-full space-y-16">
          <button
            onClick={onBack}
            className="text-gold font-body font-medium hover:underline flex items-center justify-center gap-8 w-full py-12"
          >
            <ChevronLeft size={16} />
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-right-4 duration-300">
      <button
        onClick={onBack}
        className="w-44 h-44 flex items-center justify-center text-ivory-60 hover:text-ivory mb-20 -ml-12 transition-colors"
        aria-label="Back to login"
      >
        <ChevronLeft size={24} />
      </button>

      <h2 className="font-headline font-bold text-ivory text-[24px] lg:text-[28px] mb-12">Reset Your Password</h2>
      <p className="text-ivory-55 text-base leading-relaxed mb-32">
        Enter your email address and we&apos;ll send you a link to reset your password and get back into your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-24">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="emeka@example.com"
          leftIcon={<MailIcon />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <GoldButton type="submit" isLoading={isLoading}>
          Send Reset Link
        </GoldButton>
      </form>
    </div>
  );
}
