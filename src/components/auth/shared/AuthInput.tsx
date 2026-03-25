'use client';
import React, { useState, useRef } from 'react';
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  validationState?: 'idle' | 'loading' | 'valid' | 'invalid';
  errorMessage?: React.ReactNode;
  helperText?: React.ReactNode;
  leftPaddingClassName?: string;
}

export function AuthInput({
  label,
  leftIcon,
  rightElement,
  validationState = 'idle',
  errorMessage,
  helperText,
  type,
  className,
  onFocus,
  leftPaddingClassName,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Smooth scroll to input on mobile focus
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
    onFocus?.(e);
  };

  const getBorderColor = () => {
    if (validationState === 'invalid') return 'border-error';
    if (validationState === 'valid') return 'border-emerald';
    return 'border-border-default focus-within:border-gold';
  };

  const getIconColor = () => {
    if (validationState === 'invalid') return 'text-error';
    if (validationState === 'valid') return 'text-emerald';
    return 'text-ivory-40 group-focus-within:text-gold';
  };

  const errorId = errorMessage ? `error-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined;

  return (
    <div className={cn("w-full group", validationState === 'invalid' && "animate-shake")}>
      {label && (
        <label className="block text-[13px] font-body font-medium text-ivory-60 tracking-wider mb-8 uppercase">
          {label}
        </label>
      )}
      
      <div className="relative w-full">
        <input
          ref={inputRef}
          type={inputType}
          onFocus={handleFocus}
          aria-invalid={validationState === 'invalid'}
          aria-describedby={errorId}
          className={cn(
            "w-full h-[54px] bg-input-bg border-[1.5px] rounded-[12px] text-ivory text-[16px] font-body transition-all duration-200 outline-none placeholder:text-ivory-25",
            leftPaddingClassName || (leftIcon ? "pl-[48px]" : "px-16"),
            getBorderColor(),
            "shadow-sm focus-within:shadow-focus-ring",
            "[&:-webkit-autofill]:shadow-[inset_0_0_0_9999px_#1A1A1A] [&:-webkit-autofill]:text-ivory [caret-color:var(--color-gold)]",
            className
          )}
          {...props}
        />

        {leftIcon && (
          <div className={cn(
            "absolute left-16 top-1/2 -translate-y-1/2 transition-colors duration-200 flex items-center pointer-events-none",
            getIconColor()
          )}>
            {React.isValidElement(leftIcon) ? (
              // If it's a lucide icon, it likely has a size prop
              typeof (leftIcon.type) === 'string' ? leftIcon : React.cloneElement(leftIcon as React.ReactElement<any>, { size: 18 })
            ) : (
              <span className="font-body text-[14px] lg:text-[16px]">{leftIcon}</span>
            )}
          </div>
        )}

        <div className="absolute right-4 top-0 w-40 h-full flex items-center justify-center pointer-events-none">
          {validationState === 'loading' && <Loader2 className="animate-spin text-gold" size={18} />}
          {validationState === 'valid' && <CheckCircle2 className="text-emerald animate-in zoom-in-50 duration-300" size={18} />}
          {validationState === 'invalid' && <XCircle className="text-error animate-in fade-in duration-200" size={18} />}
          {validationState === 'idle' && isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="w-40 h-40 flex items-center justify-center text-ivory-40 hover:text-ivory transition-colors pointer-events-auto"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {validationState === 'idle' && !isPassword && (
            <div className="pointer-events-auto flex items-center justify-center h-full w-full">
              {rightElement}
            </div>
          )}
        </div>
      </div>

      <div aria-live="polite" className="min-h-[20px] mt-4">
        {errorMessage && (
          <div id={errorId} className="text-[13px] font-body text-error animate-in fade-in slide-in-from-top-1 duration-200">
            {errorMessage}
          </div>
        )}
        {helperText && !errorMessage && (
          <div className="text-[12px] font-body text-ivory-40">
            {helperText}
          </div>
        )}
      </div>
    </div>
  );
}
