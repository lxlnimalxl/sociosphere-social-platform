import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export default function DeviceFrame({ children, className = '', darkStatusBar = false }) {
  return (
    <div 
      id="phone-simulator"
      className={`relative mx-auto w-[390px] h-[844px] bg-[#E6EEFA] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(9,61,137,0.22),0_0_0_10px_#FFFFFF,0_0_0_12px_rgba(9,61,137,0.08)] overflow-hidden flex flex-col select-none transform-gpu ${className}`}
    >
      {/* iOS Status Bar */}
      <div className={`relative z-30 flex items-center justify-between px-7 pt-3.5 pb-1 flex-shrink-0 ${darkStatusBar ? 'text-white' : 'text-slate-800'}`}>
        <span className="text-[14px] font-semibold tracking-tight">9:41</span>
        
        {/* Dynamic Island pill */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[112px] h-[26px] bg-black rounded-full flex items-center justify-end pr-2.5 space-x-1 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1C1C1E] border border-slate-700/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        <div className="flex items-center space-x-1.5">
          <Signal size={13} className="stroke-[2.5]" />
          <Wifi size={13} className="stroke-[2.5]" />
          <div className="flex items-center">
            <BatteryMedium size={18} className="stroke-[2]" />
          </div>
        </div>
      </div>

      {/* Screen Body with relative positioning */}
      <div className="relative flex-1 overflow-y-auto no-scrollbar flex flex-col">
        {children}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="relative z-30 w-full pb-2 pt-1 flex justify-center bg-transparent pointer-events-none flex-shrink-0">
        <div className="w-36 h-[4.5px] bg-slate-900/25 rounded-full backdrop-blur-sm" />
      </div>
    </div>
  );
}
