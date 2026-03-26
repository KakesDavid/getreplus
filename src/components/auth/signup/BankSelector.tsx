
'use client';
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Landmark, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const NIGERIAN_BANKS = [
  { name: "Access Bank", code: "044" },
  { name: "Access Bank (Diamond)", code: "063" },
  { name: "ALAT by WEMA", code: "035A" },
  { name: "Ecobank Nigeria", code: "050" },
  { name: "Fidelity Bank", code: "070" },
  { name: "First Bank of Nigeria", code: "011" },
  { name: "First City Monument Bank", code: "214" },
  { name: "Globus Bank", code: "00103" },
  { name: "Guaranty Trust Bank", code: "058" },
  { name: "Heritage Bank", code: "030" },
  { name: "Jaiz Bank", code: "301" },
  { name: "Keystone Bank", code: "082" },
  { name: "Kuda Bank", code: "50211" },
  { name: "Lotus Bank", code: "303" },
  { name: "Moniepoint MFB", code: "50515" },
  { name: "OPay (Paycom)", code: "999992" },
  { name: "PalmPay", code: "999991" },
  { name: "Parallex Bank", code: "526" },
  { name: "Polaris Bank", code: "076" },
  { name: "Providus Bank", code: "101" },
  { name: "Stanbic IBTC Bank", code: "221" },
  { name: "Standard Chartered Bank", code: "068" },
  { name: "Sterling Bank", code: "232" },
  { name: "Suntrust Bank", code: "100" },
  { name: "TAJ Bank", code: "302" },
  { name: "Titan Bank", code: "102" },
  { name: "Union Bank of Nigeria", code: "032" },
  { name: "United Bank for Africa", code: "033" },
  { name: "Unity Bank", code: "215" },
  { name: "VFD Microfinance Bank Limited", code: "566" },
  { name: "Wema Bank", code: "035" },
  { name: "Zenith Bank", code: "057" }
].sort((a, b) => a.name.localeCompare(b.name));

interface BankSelectorProps {
  selectedBankName: string;
  onSelect: (bankName: string, bankCode: string) => void;
  disabled?: boolean;
}

export function BankSelector({ selectedBankName, onSelect, disabled }: BankSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredBanks = useMemo(() => {
    return NIGERIAN_BANKS.filter(bank => 
      bank.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="w-full">
      <label className="block text-[11px] font-bold text-ivory-40 tracking-wider mb-6 uppercase">
        Select Bank
      </label>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "w-full h-[48px] bg-input-bg border-[1.5px] rounded-[12px] px-16 flex items-center justify-between text-left transition-all duration-200 outline-none",
              selectedBankName ? "border-gold/40 text-white" : "border-border-default text-ivory-25",
              disabled && "opacity-50 cursor-not-allowed",
              !disabled && "hover:border-gold/60"
            )}
          >
            <div className="flex items-center gap-10 overflow-hidden">
              <Landmark size={16} className={selectedBankName ? "text-gold" : "text-ivory-40"} />
              <span className="truncate text-[14px] font-medium">
                {selectedBankName || "Choose your bank"}
              </span>
            </div>
            <ChevronDown size={16} className="text-ivory-40 shrink-0" />
          </button>
        </DialogTrigger>
        
        <DialogContent className="bg-surface border-gold-border p-0 max-w-[400px] gap-0 overflow-hidden sm:rounded-[20px] shadow-2xl">
          <DialogHeader className="p-16 border-b border-white-15">
            <DialogTitle className="font-headline text-ivory text-[17px]">Select Bank</DialogTitle>
          </DialogHeader>
          
          <div className="p-12">
            <div className="relative">
              <Search className="absolute left-12 top-1/2 -translate-y-1/2 text-ivory-40" size={14} />
              <input
                autoFocus
                placeholder="Search banks..."
                className="w-full h-[40px] bg-white/5 border border-white-15 rounded-lg pl-36 pr-12 text-white text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-ivory-25"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="max-h-[280px] overflow-y-auto px-6 pb-12 custom-scrollbar">
            {filteredBanks.length > 0 ? (
              filteredBanks.map((bank) => (
                <button
                  key={bank.code}
                  className={cn(
                    "w-full px-12 py-9 flex items-center justify-between rounded-lg transition-colors group mb-1",
                    selectedBankName === bank.name ? "bg-gold/10 text-gold" : "text-ivory-60 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => {
                    onSelect(bank.name, bank.code);
                    setOpen(false);
                    setSearch('');
                  }}
                >
                  <span className="text-[13px] font-medium">{bank.name}</span>
                  {selectedBankName === bank.name && <Check size={14} />}
                </button>
              ))
            ) : (
              <div className="py-24 text-center flex flex-col items-center gap-6">
                <Landmark size={20} className="text-ivory-20" />
                <p className="text-ivory-40 text-xs">No results for "{search}"</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
