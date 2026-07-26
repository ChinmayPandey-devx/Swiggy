import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, Clock, AlertTriangle, MessageSquare, Headset, 
  CheckCircle2, ArrowRight, RefreshCw, Sparkles, AlertCircle, XCircle, 
  Wallet, UserX, Check, Flame, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PhoneShell from '../components/PhoneShell';

export default function ZeroRefundPrototype() {
  // Mode: 'today' (broken current flow) vs 'proposed' (zero-ticket automated flow)
  const [flowMode, setFlowMode] = useState('proposed');

  // "Today" Flow step: 1 = Initial ETA, 2 = Delay Jump, 3 = Support Chat Bot, 4 = Static Dead End
  const [todayStep, setTodayStep] = useState(1);

  // "Proposed" Flow step: 1 = Initial ETA, 2 = Delay Jump + Auto Refund Notification, 3 = Wallet Updated state
  const [proposedStep, setProposedStep] = useState(1);

  // Auto-refund wallet state
  const [walletBalance, setWalletBalance] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Trigger ETA delay jump animation for Today flow
  const handleTriggerTodayDelay = () => {
    setTodayStep(2);
  };

  // Trigger ETA delay jump & Auto-refund for Proposed flow
  const handleTriggerProposedDelay = () => {
    setProposedStep(2);
    // Automatically credit refund after subtle 1.2s delay to feel real-time telemetry driven
    setTimeout(() => {
      setProposedStep(3);
      setWalletBalance(150);
      setShowToast(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#FC8019', '#3b82f6']
      });
    }, 1200);
  };

  const handleReset = () => {
    setTodayStep(1);
    setProposedStep(1);
    setWalletBalance(0);
    setShowToast(false);
  };

  // Annotation Metrics Panel Content
  const annotationContent = (
    <div className="space-y-4 text-slate-300 text-xs leading-relaxed">
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5">
        <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-4 h-4" />
          Support Automation & Retention ROI
        </h4>
        <p className="text-slate-300">
          Swiggy handles 1.8M daily food deliveries. Late deliveries cause ~12% of total support volume. Proactive refunding eliminates support labor while retaining user trust.
        </p>
      </div>

      {/* Side-by-side Metric Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-950 p-3 rounded-lg border border-red-500/20">
          <div className="flex items-center justify-between text-[10px] text-red-400 font-mono mb-1">
            <span>TODAY FLOW</span>
            <XCircle className="w-3 h-3 text-red-500" />
          </div>
          <div className="text-lg font-bold text-red-400">8+ Min Wait</div>
          <p className="text-[11px] text-slate-400">Average support ticket resolution time</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-emerald-500/20">
          <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mb-1">
            <span>PROPOSED FLOW</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-emerald-400">Instant (0 sec)</div>
          <p className="text-[11px] text-slate-400">Automated wallet credit via telemetry</p>
        </div>
      </div>

      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
        <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">Core Impact Metrics:</h5>
        
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span className="text-slate-400">Support Ticket Volume Reduction:</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">-68%</span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span className="text-slate-400">Cost-per-Ticket Avoidance:</span>
          <span className="font-mono font-bold text-[#FC8019] text-sm">~₹32 / incident</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Net Promoter Score (NPS) Delta:</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">+24 Points</span>
        </div>
      </div>

      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
        <strong className="text-white block">The Churn-Risk Narrative:</strong>
        <p className="text-slate-400">
          <strong className="text-red-400">Today:</strong> A customer who has to fight with a generic bot and wait 8 minutes for a refund feels neglected and churns to Zomato.
        </p>
        <p className="text-slate-400">
          <strong className="text-emerald-400">Proposed:</strong> A customer who gets an automatic refund <em>before even filing a ticket</em> feels valued and remains loyal.
        </p>
      </div>
    </div>
  );

  return (
    <PhoneShell
      title="Zero-Ticket Refunds"
      subtitle="Proactive ETA Breach Resolution Engine"
      activeTab="zero-refund"
      onReset={handleReset}
      annotationContent={annotationContent}
      customHeaderControls={
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium px-2">Flow Comparison:</span>
          <button
            onClick={() => { setFlowMode('today'); setTodayStep(1); }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              flowMode === 'today'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            "Today" Flow (Broken)
          </button>
          <button
            onClick={() => { setFlowMode('proposed'); setProposedStep(1); setWalletBalance(0); setShowToast(false); }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              flowMode === 'proposed'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            "Proposed" Flow (Zero-Ticket)
          </button>
        </div>
      }
    >
      {/* Top Header inside phone mockup */}
      <div className={`px-4 py-3 sticky top-0 z-30 shadow-md flex items-center justify-between ${
        flowMode === 'today' ? 'bg-slate-900 text-white' : 'bg-slate-900 text-white'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#FC8019] text-white flex items-center justify-center font-bold text-xs">
            S
          </div>
          <div>
            <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
              Swiggy Order Tracking
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                flowMode === 'today' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {flowMode === 'today' ? 'Legacy Ops' : 'Proactive Engine'}
              </span>
            </h2>
            <p className="text-[10px] text-slate-400">Order #SWG-99120 • Tandoor Express</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-mono">
          <Wallet className="w-3 h-3 text-emerald-400" />
          <span>₹{walletBalance}</span>
        </div>
      </div>

      {/* MAIN SCREEN DEPENDING ON FLOW MODE */}
      {flowMode === 'today' ? (
        /* TODAY FLOW (BROKEN HIGH FRICTION) */
        <div className="p-3 flex-1 flex flex-col justify-between space-y-3">
          
          {/* STEP 1 & 2: TRACKING & DELAY JUMP */}
          {todayStep <= 2 && (
            <div className="space-y-3 animate-in fade-in duration-300">
              
              {/* Order Status Banner */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center space-y-3">
                <div className="text-xs text-slate-500 font-medium">Estimated Delivery Time</div>

                {/* Animated ETA Badge */}
                {todayStep === 1 ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-black text-xl border border-emerald-200">
                    <Clock className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>25 - 30 MIN</span>
                  </div>
                ) : (
                  <div className="inline-flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 border-2 border-red-500 animate-pulse-subtle">
                    <div className="flex items-center gap-2 font-black text-2xl text-red-600">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <span>70 MIN</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                      ⚠️ Severe Delay (+40 min jump)
                    </span>
                  </div>
                )}

                <div className="text-xs text-slate-600 font-medium">
                  {todayStep === 1 
                    ? 'Rider is on the way to kitchen...' 
                    : 'Rider delayed due to heavy kitchen rush & traffic'}
                </div>
              </div>

              {/* Progress bar */}
              <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2">
                <div className="flex justify-between text-[11px] font-bold text-slate-700">
                  <span>Order Placed</span>
                  <span>Preparing</span>
                  <span className={todayStep === 2 ? 'text-red-600 font-extrabold' : 'text-slate-400'}>Delayed</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${
                    todayStep === 1 ? 'w-2/3 bg-[#FC8019]' : 'w-2/3 bg-red-500'
                  }`} />
                </div>
              </div>

              {/* Step 1 & 2 Action Controls */}
              {todayStep === 1 ? (
                <div className="pt-4">
                  <button
                    onClick={handleTriggerTodayDelay}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all text-xs"
                  >
                    <Flame className="w-4 h-4 fill-white" />
                    <span>Simulate 40-Min ETA Delay Jump</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Click to simulate driver breach delay event
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 space-y-3 animate-in slide-in-from-bottom-2">
                  <div className="flex items-start gap-2 text-xs text-red-900">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>Your order is delayed past promise time. User must manually seek support.</span>
                  </div>

                  <button
                    onClick={() => setTodayStep(3)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md"
                  >
                    <Headset className="w-4 h-4 text-[#FC8019]" />
                    <span>Tap "Something's wrong / Contact Help"</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: BROKEN SUPPORT CHAT QUEUE */}
          {todayStep === 3 && (
            <div className="space-y-3 flex-1 flex flex-col justify-between animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 flex-1 flex flex-col justify-between">
                <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#FC8019]" />
                    Swiggy Support Desk
                  </span>
                  <span className="text-[10px] text-slate-400">Ticket #77218</span>
                </div>

                {/* Simulated Chat Bubble Messages */}
                <div className="py-3 space-y-3 flex-1">
                  <div className="bg-slate-100 rounded-xl p-2.5 text-xs text-slate-800 max-w-[85%]">
                    Hello! I see your order #SWG-99120 is running late.
                  </div>
                  <div className="bg-[#FC8019] text-white rounded-xl p-2.5 text-xs max-w-[85%] ml-auto font-medium">
                    My food was supposed to be here 20 mins ago! Where is driver? I want refund!
                  </div>
                  <div className="bg-slate-100 rounded-xl p-2.5 text-xs text-slate-800 max-w-[85%] space-y-1">
                    <p>We are connecting you to an executive...</p>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                      <Clock className="w-3 h-3 animate-spin" />
                      <span>Estimated Agent Wait Time: 8 min</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setTodayStep(4)}
                  className="w-full bg-red-600 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-red-700 transition-colors"
                >
                  Submit Support Ticket (Wait for Agent)
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: STATIC DEAD END SCREEN */}
          {todayStep === 4 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center space-y-4 my-auto animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Your Request is Under Review</h3>
                <p className="text-xs text-slate-500 mt-1">Ticket #SWG-99120 • Status: Pending Operational Audit</p>
              </div>

              <div className="bg-slate-100 p-3 rounded-xl text-xs text-slate-700 text-left space-y-1 border border-slate-200">
                <span className="font-bold text-slate-900 block">Agent Note:</span>
                <p>Our team is verifying delivery logs with kitchen staff. Resolution typically takes 24 to 48 hours.</p>
              </div>

              <div className="p-2.5 bg-red-50 text-red-800 rounded-xl text-[11px] font-semibold flex items-center gap-2">
                <UserX className="w-4 h-4 text-red-600 shrink-0" />
                <span>High Friction Dead End: User frustrated, 64% probability of app uninstall.</span>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Reset & Compare with "Proposed" Flow
              </button>
            </div>
          )}

        </div>
      ) : (
        /* PROPOSED FLOW (ZERO-TICKET PROACTIVE RESOLUTION) */
        <div className="p-3 flex-1 flex flex-col justify-between space-y-3">
          
          <div className="space-y-3 animate-in fade-in duration-300">
            {/* Order Status Banner */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center space-y-3">
              <div className="text-xs text-slate-500 font-medium">Telemetry Order ETA Status</div>

              {/* Animated ETA Badge */}
              {proposedStep === 1 ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-black text-xl border border-emerald-200">
                  <Clock className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>25 - 30 MIN</span>
                </div>
              ) : (
                <div className="inline-flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 border-2 border-red-500 animate-pulse-subtle">
                  <div className="flex items-center gap-2 font-black text-2xl text-red-600">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <span>70 MIN</span>
                  </div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    ⚠️ SLA Breach Telemetry Triggered
                  </span>
                </div>
              )}

              <div className="text-xs text-slate-600 font-medium">
                {proposedStep === 1 
                  ? 'Swiggy Telemetry active: standard SLA tracking' 
                  : 'SLA Breach detected (>40 min threshold delay)'}
              </div>
            </div>

            {/* Trigger Button if at step 1 */}
            {proposedStep === 1 && (
              <div className="pt-4">
                <button
                  onClick={handleTriggerProposedDelay}
                  className="w-full bg-[#FC8019] hover:bg-[#e06e0d] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FC8019]/30 transition-all text-xs"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Simulate ETA Breach (+40 min Jump)</span>
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  Demonstrates automatic zero-ticket refund engine
                </p>
              </div>
            )}

            {/* PROACTIVE AUTOMATED REFUND CARD (SLIDES IN AT STEP 2 & 3) */}
            {proposedStep >= 2 && (
              <div className="space-y-3">
                {proposedStep === 2 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 flex items-center gap-2 animate-pulse">
                    <RefreshCw className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                    <span>Executing Proactive Refund Telemetry... (0 sec user action)</span>
                  </div>
                )}

                {proposedStep === 3 && (
                  <div className="bg-emerald-900 text-white rounded-2xl p-4 shadow-xl space-y-3 animate-in slide-in-from-bottom-6 duration-400 border border-emerald-500/40">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        ZERO-TICKET RESOLUTION
                      </span>
                      <span className="text-[10px] text-emerald-200 font-mono">Auto-Refund Logged</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white">
                          Order Delayed Beyond Promise
                        </h4>
                        <p className="text-xs text-emerald-100/90 leading-tight mt-0.5">
                          We've automatically credited <strong>₹150 Swiggy Money refund</strong> to your wallet.
                        </p>
                      </div>
                    </div>

                    {/* Wallet Updated Pill */}
                    <div className="bg-emerald-950/80 rounded-xl p-2.5 flex items-center justify-between border border-emerald-700/50">
                      <div className="flex items-center gap-2 text-xs">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        <span>Swiggy Money Wallet Balance:</span>
                      </div>
                      <span className="font-black text-sm text-emerald-400">₹{walletBalance}</span>
                    </div>

                    {/* Toast Callout */}
                    {showToast && (
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 text-[11px] text-emerald-200 text-center font-semibold border border-white/10">
                        ✨ No need to contact support — this was automatic!
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reset Flow Button */}
          {proposedStep === 3 && (
            <button
              onClick={handleReset}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-xs hover:bg-slate-800 transition-colors shadow-md"
            >
              Test Again (Reset Flow)
            </button>
          )}

        </div>
      )}
    </PhoneShell>
  );
}
