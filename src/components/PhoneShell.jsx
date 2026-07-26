import React from 'react';
import { Wifi, Signal, Battery, ArrowLeft, RotateCcw, Smartphone, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PhoneShell({ 
  children, 
  title, 
  subtitle, 
  activeTab, 
  onReset,
  annotationContent,
  showAnnotations = true,
  onToggleAnnotations,
  customHeaderControls
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Pitch Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg text-sm border border-slate-700/60"
            >
              <ArrowLeft className="w-4 h-4 text-[#FC8019]" />
              <span className="font-medium hidden sm:inline">Back to Overview</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FC8019] flex items-center justify-center font-black text-white text-lg shadow-md shadow-[#FC8019]/30">
                S
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-lg leading-tight text-white flex items-center gap-2">
                  {title}
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#FC8019]/20 text-[#FC8019] border border-[#FC8019]/30">
                    Founder Pitch Demo
                  </span>
                </h1>
                {subtitle && <p className="text-xs text-slate-400 hidden sm:block">{subtitle}</p>}
              </div>
            </div>
          </div>

          {/* Quick prototype switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => navigate('/cross-sell')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'cross-sell'
                  ? 'bg-[#FC8019] text-white shadow-lg shadow-[#FC8019]/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              1. Cross-Sell Engine
            </button>
            <button
              onClick={() => navigate('/zero-refund')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'zero-refund'
                  ? 'bg-[#FC8019] text-white shadow-lg shadow-[#FC8019]/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              2. Zero-Ticket Refunds
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onReset && (
              <button 
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                title="Reset prototype flow"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#FC8019]" />
                <span>Reset Flow</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Pitch Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
        {customHeaderControls && (
          <div className="w-full mb-6 flex justify-center">
            {customHeaderControls}
          </div>
        )}

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main Column: Phone Mockup Frame */}
          <div className={`flex flex-col items-center justify-center ${annotationContent ? 'lg:col-span-7 xl:col-span-7' : 'lg:col-span-12'}`}>
            <div className="relative">
              {/* Device Label */}
              <div className="flex items-center justify-between mb-3 w-[390px] px-1 text-slate-400 text-xs">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#FC8019]" />
                  Simulated Swiggy App (390px iPhone)
                </span>
                <span className="text-[11px] text-slate-500 font-mono">iOS 18 • Swiggy v17.4</span>
              </div>

              {/* iPhone Mockup Outer Shell */}
              <div className="w-[390px] h-[780px] bg-slate-900 rounded-[50px] phone-shadow border-4 border-slate-800 relative overflow-hidden flex flex-col">
                
                {/* iPhone Dynamic Island / Top Notch */}
                <div className="absolute top-0 inset-x-0 h-7 z-50 flex items-center justify-between px-6 pt-1 text-slate-900 text-[12px] font-semibold select-none bg-white">
                  <span>9:41</span>
                  {/* Dynamic Island pill */}
                  <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-end px-2 gap-1.5 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <Signal className="w-3.5 h-3.5" />
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-4 h-4" />
                  </div>
                </div>

                {/* iPhone Screen Content Container */}
                <div className="pt-7 pb-5 flex-1 bg-slate-100 text-slate-900 overflow-y-auto custom-scrollbar flex flex-col relative">
                  {children}
                </div>

                {/* iPhone Home Bar */}
                <div className="h-5 bg-white flex items-center justify-center border-t border-slate-100 z-50 shrink-0">
                  <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Annotation & Pitch Insights Panel */}
          {annotationContent && (
            <div className="lg:col-span-5 xl:col-span-5 w-full sticky top-20">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FC8019] animate-ping" />
                    <h3 className="font-bold text-white text-base">Opportunity Telemetry & Pitch Notes</h3>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    R&D Strategy
                  </span>
                </div>
                {annotationContent}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 py-4 px-6 text-center text-slate-500 text-xs">
        <p>Swiggy Growth Concepts Prototype • Built for Founder Pitch • Single-Page Interactive Demo</p>
      </footer>
    </div>
  );
}
