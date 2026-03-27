'use client';
import React, { useState, useEffect } from 'react';
import { AuthPageShell } from '@/components/auth/shared/AuthPageShell';
import { LoginForm } from '@/components/auth/login/LoginForm';
import { ForgotPasswordPanel } from '@/components/auth/login/ForgotPasswordPanel';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

type AuthPanel = 'login' | 'forgotPassword';

export default function LoginPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [activePanel, setActivePanel] = useState<AuthPanel>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleSwitchPanel = (panel: AuthPanel) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActivePanel(panel);
      setIsTransitioning(false);
    }, 250);
  };

  if (isUserLoading || user) {
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
            activePanel === 'forgotPassword' ? "translate-x-0" : "-translate-x-full absolute"
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
