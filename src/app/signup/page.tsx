'use client';
import React from 'react';
import { AuthPageShell } from '@/components/auth/shared/AuthPageShell';
import { SignupShell } from '@/components/auth/signup/SignupShell';

export default function SignupPage() {
  return (
    <AuthPageShell>
      <SignupShell />
    </AuthPageShell>
  );
}
