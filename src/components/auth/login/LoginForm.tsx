'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { AuthInput } from '../shared/AuthInput';
import { GoldButton } from '../shared/GoldButton';
import { LoginErrorBlock } from './LoginErrorBlock';
import { validateEmail } from '@/utils/validators';

interface LoginFormProps {
  onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      setIsLoading(false);
      setError('The credentials you entered do not match our records. Please check and try again.');
    }, 1500);
  };

  return (
    <div className="w-full max-w-[440px] animate-in fade-in duration-500 mx-auto">
      <div className="flex flex-col items-center lg:items-start mb-24">
        <div className="w-40 h-40 bg-secondary rounded-xl flex items-center justify-center mb-16 shadow-button-glow animate-pulse-glow">
          <span className="font-headline font-bold text-gold text-20">G+</span>
        </div>
        <span className="font-subheadline font-medium text-ivory-50 text-[14px] lg:text-[15px] mb-4">Welcome back</span>
        <h1 className="font-headline font-bold text-ivory text-[24px] lg:text-[28px] leading-tight">Sign in to GetrePlus</h1>
      </div>

      <div className="bg-surface border border-border-subtle rounded-[24px] p-24 sm:p-32 lg:p-40 shadow-card-shadow overflow-hidden">
        <LoginErrorBlock message={error || ''} />
        
        <form onSubmit={handleSubmit} className="space-y-20">
          <AuthInput
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="emeka@example.com"
            leftIcon={<Mail />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-4">
            <AuthInput
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              leftIcon={<Lock />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-gold text-[13px] font-body font-medium hover:underline transition-all"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <div className="pt-8">
            <GoldButton type="submit" isLoading={isLoading}>
              Sign In to Account
            </GoldButton>
          </div>
        </form>

        <div className="mt-24 pt-24 border-t border-border-subtle text-center">
          <p className="text-ivory-50 text-[14px] font-body">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-gold font-body font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-24 flex items-center justify-center gap-8 text-ivory-30">
        <ShieldCheck size={14} />
        <span className="text-[12px] font-body">Your connection is secured and encrypted</span>
      </div>
    </div>
  );
}
