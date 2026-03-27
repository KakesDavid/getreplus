'use client';
import React, { useEffect } from 'react';
import { AuthPageShell } from '@/components/auth/shared/AuthPageShell';
import { SignupShell } from '@/components/auth/signup/SignupShell';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  // Redirect if already logged in
  useEffect(() => {
    if (!isUserLoading && user && user.emailVerified) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="min-h-svh bg-obsidian flex flex-col items-center justify-center gap-16">
        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center animate-pulse shadow-button-glow">
          <span className="font-headline font-bold text-gold text-20">G+</span>
        </div>
        <Loader2 className="animate-spin text-gold/40" size={24} />
      </div>
    );
  }

  return (
    <AuthPageShell>
      <SignupShell />
    </AuthPageShell>
  );
}
