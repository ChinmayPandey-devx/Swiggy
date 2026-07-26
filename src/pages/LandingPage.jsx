import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap, ArrowRight, TrendingUp, ShieldCheck, Clock, Layers, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#FC8019] selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FC8019] flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-[#FC8019]/40">
              S
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">Swiggy <span className="text-[#FC8019]">Growth</span></span>
              <span className="text-xs text-slate-400 block font-medium">Founder Pitch Prototype Suite</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Interactive Prototypes Ready
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FC8019]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FC8019]/15 border border-[#FC8019]/30 text-[#FC8019] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Impact Product Opportunities for Swiggy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Swiggy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC8019] via-orange-400 to-amber-300">Growth Concepts</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Two strategic product inventions to drive high-margin Instamart adoption and eliminate support refund operational expenditure using real-time telemetry.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#FC8019]">₹0</div>
              <div className="text-[11px] text-slate-400 font-medium">Cross-Sell CAC</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">1 Delivery</div>
              <div className="text-[11px] text-slate-400 font-medium">Food + Instamart Slot</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#FC8019]">-68%</div>
              <div className="text-[11px] text-slate-400 font-medium">Support Ticket Vol</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-purple-400">0 sec</div>
              <div className="text-[11px] text-slate-400 font-medium">Auto-Refund SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Prototype Cards Section */}
      <section className="max-w-5xl mx-auto px-4 py-10 w-full flex-1">
        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Prototype Demos</h2>
            <p className="text-sm text-slate-400">Select a concept below to interact with the mobile prototype flow</p>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:block">Mobile Viewport: 390px iPhone</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Behavior-Triggered Cross-Sell */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-[#FC8019]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#FC8019]/10 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FC8019]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FC8019]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Instamart Synergy
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FC8019] transition-colors">
                Behavior-Triggered Cross-Sell
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Turning food orders into Instamart orders by embedding instant add-ons (drinks, desserts, munchies) into the checkout flow under a single delivery slot.
              </p>

              <div className="space-y-2 mb-8 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FC8019] shrink-0" />
                  <span>Pre-Checkout Instamart prompt with live running cart total</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FC8019] shrink-0" />
                  <span>Combined single order & unified delivery ETA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FC8019] shrink-0" />
                  <span>Post-Order food rating trigger variant</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => navigate('/cross-sell')}
                className="w-full bg-[#FC8019] hover:bg-[#e06e0d] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FC8019]/25 group-hover:gap-3"
              >
                <span>View Prototype</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Zero-Ticket Refunds */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Support Automation
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Zero-Ticket Refunds
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Auto-resolving ETA breaches without support tickets by detecting delivery delay thresholds and instantly crediting wallet refunds before users complain.
              </p>

              <div className="space-y-2 mb-8 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>"Today" flow: 8-min wait, agent queues, dead-end support ticket</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>"Proposed" flow: Proactive SLA breach detection & instant wallet credit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Side-by-side ROI metrics: ticket reduction & churn risk mitigation</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => navigate('/zero-refund')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/25 group-hover:gap-3"
              >
                <span>View Prototype</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Pitch Deck Context Footer */}
      <section className="bg-slate-900/50 border-t border-slate-800 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Pitch Narrative & Prototype Guidance</h4>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            Click through both prototypes to experience real-time state changes, micro-animations, and live business annotations. Designed for mobile-first demonstration on Swiggy app mechanics.
          </p>
        </div>
      </section>
    </div>
  );
}
