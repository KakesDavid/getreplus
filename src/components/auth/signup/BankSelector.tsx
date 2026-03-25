'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Landmark, Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const COMMON_BANKS = [
  "Access Bank", "Access Bank (Diamond)", "ALAT by WEMA", "ASO Savings and Loans",
  "Bowen Microfinance Bank", "Carbon", "CEMCS Microfinance Bank", "Citibank Nigeria",
  "Ecobank Nigeria", "Ekondo Microfinance Bank", "Eyowo", "Fidelity Bank",
  "First Bank of Nigeria", "First City Monument Bank", "FSDH Merchant Bank Limited",
  "Globus Bank", "Guaranty Trust Bank", "Hackman Microfinance Bank", "Hasal Microfinance Bank",
  "Heritage Bank", "Ibile Microfinance Bank", "Infinity MFB", "Jaiz Bank",
  "Keystone Bank", "Kuda Bank", "Lagos Building Investment Company PLC", "Lotus Bank",
  "Mayfair Microfinance Bank", "Mint MFB", "Paga", "PalmPay", "Parallex Bank",
  "Parkway - ReadyCash", "Paycom (OPay)", "Polaris Bank", "Providus Bank",
  "QuickFund Microfinance Bank", "Rand Merchant Bank", "Rubies MFB", "Safe Haven MFB",
  "Safe Haven Microfinance Bank Limited", "Sparkle Microfinance Bank", "Stanbic IBTC Bank",
  "Standard Chartered Bank", "Sterling Bank", "Suntrust Bank", "TAJ Bank",
  "Tangerine Money", "TCF MFB", "Titan Bank", "Titan Paystack", "Unity Bank",
  "VFD Microfinance Bank Limited", "Wema Bank", "Zenith Bank"
];

interface BankSelectorProps {
  selectedBank: string;
  onSelect: (bank: string) => void;
  disabled?: boolean;
}

export function BankSelector({ selectedBank, onSelect, disabled }: BankSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredBanks = useMemo(() => {
    return COMMON_BANKS.filter(bank => 
      bank.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="w-full">
      <label className="block text-[13px] font-body font-medium text-ivory-60 tracking-wider mb-8 uppercase">
        Select Your Bank
      </label>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "w-full h-[54px] bg-input-bg border-1.5 rounded-[12px] px-16 flex items-center justify-between text-left transition-all duration-200 outline-none",
              selectedBank ? "border-gold/30 text-ivory" : "border-border-default text-ivory-25",
              disabled && "opacity-50 cursor-not-allowed",
              "hover:border-gold/50"
            )}
          >
            <div className="flex items-center gap-12 overflow-hidden">
              <Landmark size={18} className={selectedBank ? "text-gold" : "text-ivory-40"} />
              <span className="truncate font-body text-16">
                {selectedBank || "Choose your bank"}
              </span>
            </div>
            <ChevronDown size={18} className="text-ivory-40 shrink-0" />
          </button>
        </DialogTrigger>
        
        <DialogContent className="bg-surface border-gold-border p-0 max-w-[440px] gap-0 overflow-hidden sm:rounded-[20px]">
          <DialogHeader className="p-20 border-b border-white-15">
            <DialogTitle className="font-headline text-ivory text-20">Select Bank</DialogTitle>
          </DialogHeader>
          
          <div className="p-16">
            <div className="relative">
              <Search className="absolute left-12 top-1/2 -translate-y-1/2 text-ivory-40" size={16} />
              <input
                autoFocus
                placeholder="Search banks..."
                className="w-full h-44 bg-white/5 border border-white-15 rounded-lg pl-40 pr-12 text-ivory outline-none focus:border-gold/50 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="max-h-[320px] overflow-y-auto px-8 pb-16 custom-scrollbar">
            {filteredBanks.length > 0 ? (
              filteredBanks.map((bank) => (
                <button
                  key={bank}
                  className={cn(
                    "w-full px-16 py-12 flex items-center justify-between rounded-lg transition-colors group",
                    selectedBank === bank ? "bg-gold-subtle text-gold" : "text-ivory-60 hover:bg-white/5 hover:text-ivory"
                  )}
                  onClick={() => {
                    onSelect(bank);
                    setOpen(false);
                  }}
                >
                  <span className="text-15 font-body">{bank}</span>
                  {selectedBank === bank && <Check size={16} />}
                </button>
              ))
            ) : (
              <div className="py-40 text-center flex flex-col items-center gap-12">
                <div className="w-48 h-48 rounded-full bg-white-15 flex items-center justify-center text-ivory-30">
                  <Landmark size={24} />
                </div>
                <p className="text-ivory-40 text-sm">No banks found matching "{search}"</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
