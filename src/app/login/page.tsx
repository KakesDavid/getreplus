'use client';
import React, { useState } from 'react';
import { AuthPageShell } from '@/components/auth/shared/AuthPageShell';
import { LoginForm } from '@/components/auth/login/LoginForm';
import { ForgotPasswordPanel } from '@/components/auth/login/ForgotPasswordPanel';
import { cn } from '@/lib/utils';

type AuthPanel = 'login' | 'forgotPassword';

export default function LoginPage() {
  const [activePanel, setActivePanel] = useState<AuthPanel>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSwitchPanel = (panel: AuthPanel) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActivePanel(panel);
      setIsTransitioning(false);
    }, 250); // Matches the exit duration
  };

  return (
    <AuthPageShell>
      <div className="relative w-full overflow-hidden min-h-[500px] flex items-center justify-center">
        <div 
          className={cn(
            "w-full transition-all duration-250 ease-in-out flex justify-center",
            isTransitioning ? "opacity-0" : "opacity-100",
            activePanel === 'login' ? "translate-x-0" : "-translate-x-full absolute"
          )}
        >
          {activePanel === 'login' && (
            <LoginForm onForgotPassword={() => handleSwitchPanel('forgotPassword')} />
          )}
        </div>

        <div 
          className={cn(
            "w-full transition-all duration-250 ease-in-out flex justify-center",
            isTransitioning ? "opacity-0" : "opacity-100",
            activePanel === 'forgotPassword' ? "translate-x-0" : "translate-x-full absolute"
          )}
        >
          {activePanel === 'forgotPassword' && (
            <ForgotPasswordPanel onBack={() => handleSwitchPanel('login')} />
          )}
        </div>
      </div>
    </AuthPageShell>
  );
}
