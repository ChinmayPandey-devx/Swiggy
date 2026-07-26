import React, { useState } from 'react';
import { 
  ShoppingBag, Plus, Minus, Check, ArrowRight, Sparkles, Clock, Shield, 
  Star, ChevronRight, Zap, RefreshCw, Layers, CheckCircle2, TrendingUp,
  AlertCircle, Truck, Package, Store, Lightbulb, ChevronDown, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PhoneShell from '../components/PhoneShell';

// Food cart initial items
const INITIAL_FOOD_CART = [
  { id: 'f1', name: 'Special Butter Chicken', type: 'Non-Veg', price: 340, qty: 1, desc: 'Rich creamy gravy with tender chicken' },
  { id: 'f2', name: 'Garlic Butter Naan (2 Pcs)', type: 'Veg', price: 120, qty: 1, desc: 'Clay oven cooked bread with garlic butter' },
  { id: 'f3', name: 'Dal Makhani (Half)', type: 'Veg', price: 240, qty: 1, desc: 'Slow cooked black lentils with cream' }
];

// Instamart suggested cross-sell items
const INSTAMART_ITEMS = [
  { 
    id: 'im1', 
    name: 'Coca-Cola Zero Sugar 750ml', 
    price: 40, 
    originalPrice: 45, 
    unit: '750 ml bottle',
    category: 'Cold Drink',
    img: '🥤',
    tag: 'Pairs with Butter Chicken'
  },
  { 
    id: 'im2', 
    name: 'Amul Real Vanilla Ice Cream Cup', 
    price: 60, 
    originalPrice: 70, 
    unit: '125ml tub',
    category: 'Dessert',
    img: '🍨',
    tag: 'Best Meal Finisher'
  },
  { 
    id: 'im3', 
    name: "Lay's Magic Masala Chips", 
    price: 20, 
    originalPrice: 20, 
    unit: '50g pack',
    category: 'Munchies',
    img: '🥔',
    tag: 'Quick Crunch'
  }
];

// Post-Order rating quick items
const RATING_QUICK_ITEMS = [
  { id: 'rq1', name: 'Sprite Cold Drink 1.25L', price: 65, img: '🍾' },
  { id: 'rq2', name: 'Baskin Robbins Chocolate Ice Cream', price: 110, img: '🍦' },
  { id: 'rq3', name: 'Pass Pass Mouth Freshener (Pack of 5)', price: 25, img: '🍬' }
];

export default function CrossSellPrototype() {
  // Prototype sub-mode: 'pre-checkout' (Flow A) or 'post-order' (Flow B)
  const [triggerMode, setTriggerMode] = useState('pre-checkout');

  // Pre-Checkout step states: 1 = Cart, 2 = Instamart Step, 3 = Final Combined Checkout, 4 = Order Placed
  const [step, setStep] = useState(1);

  // Instamart selected items { itemId: quantity }
  const [instamartQuantities, setInstamartQuantities] = useState({});

  // Post-Order rating state
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [postOrderAdded, setPostOrderAdded] = useState({});

  // Calculations
  const foodSubtotal = INITIAL_FOOD_CART.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const instamartItemsSelected = INSTAMART_ITEMS.filter(item => (instamartQuantities[item.id] || 0) > 0);
  const instamartTotal = INSTAMART_ITEMS.reduce((sum, item) => {
    const qty = instamartQuantities[item.id] || 0;
    return sum + (item.price * qty);
  }, 0);

  const deliveryFee = 35;
  const taxes = 38;
  const grandTotal = foodSubtotal + instamartTotal + deliveryFee + taxes;

  const handleQuantityChange = (id, delta) => {
    setInstamartQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleReset = () => {
    setStep(1);
    setInstamartQuantities({});
    setRating(0);
    setRatingSubmitted(false);
    setPostOrderAdded({});
  };

  const handlePlaceOrder = () => {
    setStep(4);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FC8019', '#5E17EB', '#22c55e']
    });
  };

  // Annotation Content for pitch deck
  const annotationContent = (
    <div className="space-y-4 text-slate-300 text-xs leading-relaxed">
      <div className="bg-orange-950/40 border border-orange-500/30 rounded-xl p-3.5">
        <h4 className="font-bold text-[#FC8019] text-sm flex items-center gap-1.5 mb-1">
          <Zap className="w-4 h-4" />
          The Core Growth Thesis
        </h4>
        <p className="text-slate-300">
          Acquiring a new user for Instamart costs ₹120-180 CAC through performance marketing. 
          By intercepting Swiggy Food orders at high-intent moments, CAC drops to <strong>₹0</strong> while sharing the existing delivery route.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-500 block uppercase font-mono">Conversion Lift</span>
          <span className="text-lg font-bold text-emerald-400">+18.4%</span>
          <p className="text-[11px] text-slate-400">Cart addition rate on dinner orders</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-500 block uppercase font-mono">Logistics Cost</span>
          <span className="text-lg font-bold text-[#FC8019]">₹0 Extra</span>
          <p className="text-[11px] text-slate-400">Single driver, combined pickup slot</p>
        </div>
      </div>

      <div className="space-y-2">
        <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">Why This Works:</h5>
        
        <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
          <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">1</div>
          <div>
            <strong className="text-slate-200">Contextual Relevance:</strong> Users ordering spicy Butter Chicken actively want cold drinks or ice cream. Recommendations match food flavor profile.
          </div>
        </div>

        <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
          <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">2</div>
          <div>
            <strong className="text-slate-200">Zero Friction Single ETA:</strong> Both items arrive together in 26 minutes. No two delivery drivers knocking at your door.
          </div>
        </div>

        <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
          <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">3</div>
          <div>
            <strong className="text-slate-200">Funnel Seeding:</strong>
            <div className="mt-1 font-mono text-[10px] text-purple-300 bg-purple-950/50 p-1.5 rounded border border-purple-800/50">
              Food User ➔ 1st Instamart Order ➔ Dedicated Instamart App Habit
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PhoneShell
      title="Behavior-Triggered Cross-Sell"
      subtitle="Food Order to Instamart Conversion"
      activeTab="cross-sell"
      onReset={handleReset}
      annotationContent={annotationContent}
      customHeaderControls={
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium px-2">Trigger Surface:</span>
          <button
            onClick={() => { setTriggerMode('pre-checkout'); setStep(1); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              triggerMode === 'pre-checkout'
                ? 'bg-[#FC8019] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Flow A: Pre-Checkout Intercept
          </button>
          <button
            onClick={() => { setTriggerMode('post-order'); setRating(0); setRatingSubmitted(false); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              triggerMode === 'post-order'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Flow B: Post-Order Rating Trigger
          </button>
        </div>
      }
    >
      {/* App Header Bar inside Phone Mockup */}
      <div className="bg-slate-900 text-white px-4 py-3 sticky top-0 z-30 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#FC8019] text-white flex items-center justify-center font-bold text-xs">
            S
          </div>
          <div>
            <h2 className="text-xs font-bold text-white flex items-center gap-1">
              Punjabi Rasoi
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1 rounded">⭐ 4.4</span>
            </h2>
            <p className="text-[10px] text-slate-400">Indiranagar • 22 mins delivery</p>
          </div>
        </div>

        {/* Step Indicator pill */}
        {triggerMode === 'pre-checkout' && (
          <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Step {step} of 3
          </div>
        )}
      </div>

      {/* BODY CONTENT DEPENDING ON TRIGGER MODE */}
      {triggerMode === 'pre-checkout' ? (
        <div className="p-3 flex-1 flex flex-col justify-between">
          
          {/* STEP 1: CART SCREEN */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-3 text-xs text-orange-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FC8019] shrink-0" />
                <span>Express Food Prep in progress • ETA ~22 mins</span>
              </div>

              {/* Food Order Items */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-[#FC8019]" />
                    Food Items Cart (3 items)
                  </h3>
                  <span className="text-[10px] text-[#FC8019] font-semibold cursor-pointer">Edit Cart</span>
                </div>

                <div className="space-y-3">
                  {INITIAL_FOOD_CART.map(item => (
                    <div key={item.id} className="flex items-start justify-between text-xs border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                      <div className="flex items-start gap-2">
                        <span className={`w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 mt-0.5 ${
                          item.type === 'Non-Veg' ? 'border-red-600 text-red-600' : 'border-emerald-600 text-emerald-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'Non-Veg' ? 'bg-red-600' : 'bg-emerald-600'}`} />
                        </span>
                        <div>
                          <div className="font-semibold text-slate-900">{item.name}</div>
                          <div className="text-[10px] text-slate-500">{item.desc}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-slate-900">₹{item.price * item.qty}</div>
                        <div className="text-[10px] text-slate-400">Qty: {item.qty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Details */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5">Bill Summary</div>
                <div className="flex justify-between text-slate-600">
                  <span>Item Total</span>
                  <span>₹{foodSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GSt & Restaurant Charges</span>
                  <span>₹{taxes}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-sm border-t border-slate-100 pt-2">
                  <span>To Pay</span>
                  <span className="text-[#FC8019]">₹{foodSubtotal + deliveryFee + taxes}</span>
                </div>
              </div>

              {/* Step 1 Action Button */}
              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#FC8019] hover:bg-[#e06e0d] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FC8019]/30 transition-all text-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: NEW STEP (THE CONCEPT: INSTAMART CROSS-SELL PROMPT) */}
          {step === 2 && (
            <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-300">
              
              {/* Instamart Header Banner */}
              <div className="instamart-gradient text-white rounded-2xl p-3.5 shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-purple-900/80 text-purple-200 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded border border-purple-400/30">
                      INSTAMART ADD-ON
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30 animate-pulse">
                      ⚡ Arrives in 12 min
                    </span>
                  </div>
                  <span className="text-[10px] text-purple-200 font-medium">Same Slot</span>
                </div>

                <h3 className="font-extrabold text-sm text-white mb-1">
                  Add drinks & snacks from Instamart
                </h3>
                <p className="text-[11px] text-purple-100/90 leading-tight">
                  Arrives together in your food delivery bag. Zero extra delivery fee!
                </p>
              </div>

              {/* Running Instamart Total Badge */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    🛒
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-purple-950">Instamart Additions</div>
                    <div className="text-[10px] text-purple-700">
                      {instamartItemsSelected.length === 0 
                        ? 'Select items below' 
                        : `${instamartItemsSelected.length} item(s) selected`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-purple-700 transition-all transform scale-100">
                    ₹{instamartTotal}
                  </div>
                  <div className="text-[9px] text-emerald-700 font-semibold">₹0 extra delivery</div>
                </div>
              </div>

              {/* Suggested Instamart Items List */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider px-1">
                  Popular Meal Pairings
                </div>

                {INSTAMART_ITEMS.map((item) => {
                  const qty = instamartQuantities[item.id] || 0;
                  return (
                    <div 
                      key={item.id}
                      className={`bg-white rounded-xl p-3 border transition-all flex items-center justify-between ${
                        qty > 0 ? 'border-purple-500 ring-1 ring-purple-500/30 bg-purple-50/20' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                          {item.img}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-900">{item.name}</span>
                          </div>
                          <div className="text-[10px] text-slate-500">{item.unit}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-bold text-xs text-slate-900">₹{item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</span>
                            )}
                            <span className="text-[9px] bg-orange-100 text-orange-700 font-semibold px-1.5 py-0.2 rounded">
                              {item.tag}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper Button */}
                      <div className="shrink-0">
                        {qty === 0 ? (
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="bg-white border-2 border-purple-600 text-purple-700 font-extrabold text-xs px-3 py-1 rounded-lg hover:bg-purple-600 hover:text-white transition-colors shadow-sm"
                          >
                            + ADD
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-purple-700 text-white rounded-lg px-2 py-1 shadow-sm">
                            <button 
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="hover:text-purple-200 p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-xs min-w-[14px] text-center">{qty}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="hover:text-purple-200 p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions Footer */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-[#FC8019] hover:bg-[#e06e0d] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FC8019]/30 transition-all text-xs"
                >
                  <span>
                    {instamartTotal > 0 
                      ? `Continue to Order Summary (₹${grandTotal})` 
                      : 'Proceed to Checkout'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <button
                    onClick={() => { setInstamartQuantities({}); setStep(3); }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 underline py-1"
                  >
                    Skip add-ons & proceed with food only
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: FINAL COMBINED CHECKOUT SCREEN */}
          {step === 3 && (
            <div className="space-y-3.5 animate-in fade-in duration-300">
              {/* Single Combined Order Badge */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-950 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-900">Unified Single Order</div>
                  <div className="text-[10px] text-emerald-700">Food + Instamart items arriving together in 26 mins</div>
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">Order Summary</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    1 Delivery Exec
                  </span>
                </div>

                {/* Food section */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    🍲 Food Items ({INITIAL_FOOD_CART.length})
                  </div>
                  {INITIAL_FOOD_CART.map(item => (
                    <div key={item.id} className="flex justify-between py-1 text-slate-700">
                      <span>{item.qty}x {item.name}</span>
                      <span className="font-semibold text-slate-900">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                {/* Instamart section */}
                {instamartItemsSelected.length > 0 ? (
                  <div className="border-t border-slate-100 pt-2">
                    <div className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>⚡ Instamart Add-ons ({instamartItemsSelected.length})</span>
                    </div>
                    {instamartItemsSelected.map(item => {
                      const qty = instamartQuantities[item.id];
                      return (
                        <div key={item.id} className="flex justify-between py-1 text-purple-900 bg-purple-50/50 px-2 rounded">
                          <span>{qty}x {item.name}</span>
                          <span className="font-bold text-purple-900">₹{item.price * qty}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border-t border-slate-100 pt-2 text-[10px] text-slate-400 italic">
                    No Instamart add-ons selected
                  </div>
                )}
              </div>

              {/* Unified Bill & Savings */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Food Subtotal</span>
                  <span>₹{foodSubtotal}</span>
                </div>
                {instamartTotal > 0 && (
                  <div className="flex justify-between text-purple-700 font-medium">
                    <span>Instamart Subtotal</span>
                    <span>₹{instamartTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery & Handling</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & Fees</span>
                  <span>₹{taxes}</span>
                </div>
                {instamartTotal > 0 && (
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg text-[11px] font-semibold flex items-center justify-between">
                    <span>Instamart Delivery Saved</span>
                    <span>-₹35</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-slate-900 text-sm border-t border-slate-100 pt-2">
                  <span>Total Payable</span>
                  <span className="text-[#FC8019]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Pay & Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#FC8019] hover:bg-[#e06e0d] text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-[#FC8019]/40 transition-all text-xs"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Pay & Place Combined Order (₹{grandTotal})</span>
              </button>
            </div>
          )}

          {/* STEP 4: ORDER SUCCESS SCREEN */}
          {step === 4 && (
            <div className="space-y-4 animate-in zoom-in-95 duration-300 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Order Placed Successfully!</h3>
                <p className="text-xs text-slate-500 mt-1">Order #SWG-88219 • Punjabi Rasoi</p>
              </div>

              {/* Combined Delivery Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl p-4 shadow-lg text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded">
                    Unified Delivery
                  </span>
                  <span className="text-xs font-mono font-bold">Arriving in 26 mins</span>
                </div>
                <div className="text-sm font-bold">Driver Ramesh is picking up your Food & Instamart items</div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-2/3 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Summary Items list */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200 text-left text-xs space-y-1.5">
                <div className="font-bold text-slate-800 border-b border-slate-100 pb-1">Order Items Included:</div>
                <div className="text-slate-600">• 3x Food Items from Punjabi Rasoi</div>
                {instamartItemsSelected.length > 0 && (
                  <div className="text-purple-700 font-semibold">
                    • {instamartItemsSelected.length}x Instamart items ({instamartItemsSelected.map(i=>i.name.split(' ')[0]).join(', ')})
                  </div>
                )}
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-xs hover:bg-slate-800 transition-colors"
              >
                Test Again (Reset Flow)
              </button>
            </div>
          )}

        </div>
      ) : (
        /* FLOW B: POST-ORDER RATING TRIGGER VARIANT */
        <div className="p-3 flex-1 flex flex-col justify-between space-y-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-orange-100 text-[#FC8019] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              😋
            </div>
            
            <div>
              <h3 className="font-bold text-sm text-slate-900">How was your food from Punjabi Rasoi?</h3>
              <p className="text-[11px] text-slate-500">Rate your order to unlock special Instamart perks</p>
            </div>

            {/* 5-Star Interactive Rating Widget */}
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setRating(star);
                    setRatingSubmitted(true);
                  }}
                  className={`p-1.5 transition-transform hover:scale-125 ${
                    star <= rating ? 'text-amber-400' : 'text-slate-200'
                  }`}
                >
                  <Star className="w-7 h-7 fill-current" />
                </button>
              ))}
            </div>

            {ratingSubmitted && (
              <div className="text-xs text-emerald-600 font-bold animate-in fade-in">
                Thank you for rating {rating} stars!
              </div>
            )}
          </div>

          {/* POST-ORDER INSTAMART PROMPT CARD */}
          {ratingSubmitted && (
            <div className="instamart-gradient text-white rounded-2xl p-4 shadow-xl space-y-3 animate-in slide-in-from-bottom-6 duration-400">
              <div className="flex items-center justify-between">
                <span className="bg-purple-900/80 text-purple-200 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-purple-400/30">
                  INSTAMART POST-MEAL
                </span>
                <span className="text-[10px] text-emerald-300 font-bold">⚡ 10 Min Delivery</span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-white">Ran out of something after your meal?</h4>
                <p className="text-[11px] text-purple-100/90">Get desserts, mouth fresheners & drinks delivered in 10 minutes!</p>
              </div>

              <div className="space-y-2">
                {RATING_QUICK_ITEMS.map((item) => {
                  const added = postOrderAdded[item.id];
                  return (
                    <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between border border-white/15">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.img}</span>
                        <div>
                          <div className="font-bold text-xs text-white">{item.name}</div>
                          <div className="text-[10px] text-purple-200">₹{item.price}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setPostOrderAdded(prev => ({ ...prev, [item.id]: true }))}
                        disabled={added}
                        className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                          added 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-white text-purple-900 hover:bg-purple-100'
                        }`}
                      >
                        {added ? '✓ Added' : '+ Add in 1-Tap'}
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  confetti({ particleCount: 50, spread: 60 });
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md transition-all"
              >
                Checkout Instamart Quick Order
              </button>
            </div>
          )}

          <button
            onClick={handleReset}
            className="w-full bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-300 transition-colors"
          >
            Reset Rating Prototype
          </button>
        </div>
      )}
    </PhoneShell>
  );
}
