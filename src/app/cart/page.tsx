"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, Truck, ChevronLeft,
  Banknote, MessageCircle, Shield, Package, Clock,
  Copy, Check
} from "lucide-react";
import { createOrder } from "./actions";

export default function CartPage() {
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("Punjab");
  const [citySearch, setCitySearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "advance">("cod");
  const [advanceDiscount, setAdvanceDiscount] = useState(200);
  const [whatsappNumber, setWhatsappNumber] = useState("+923001234567");
  const [copied, setCopied] = useState<string | null>(null);
  const [paySettings, setPaySettings] = useState<any>({
    jazzcash: { enabled: false, displayNumber: "", displayName: "" },
    easypaisa: { enabled: false, displayNumber: "", displayName: "" },
    bankTransfer: { enabled: false, accountTitle: "", accountNumber: "", bankName: "", iban: "", displayInstructions: "" },
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(r => r.json())
      .then(d => {
        if (d.advance_payment_discount) setAdvanceDiscount(Number(d.advance_payment_discount));
        if (d.company_whatsapp) setWhatsappNumber(d.company_whatsapp);
      })
      .catch(() => {});

    fetch("/api/admin/settings/payments")
      .then(r => r.json())
      .then(d => { if (d) setPaySettings(d); })
      .catch(() => {});
  }, []);

  const provinceCities: Record<string, string[]> = {
    "Punjab": ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Sargodha", "Bahawalpur", "Sheikhupura", "Jhang", "Gujrat", "Kasur", "Sahiwal", "Okara", "Wah Cantonment", "Dera Ghazi Khan", "Chiniot", "Kamoke", "Sadiqabad", "Burewala", "Vehari", "Muridke"],
    "Sindh": ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas", "Jacobabad", "Shikarpur", "Khairpur", "Dadu", "Tando Adam", "Tando Allahyar", "Umerkot", "Badin"],
    "KPK": ["Peshawar", "Mardan", "Mingora", "Kohat", "Abbottabad", "Swat", "Dera Ismail Khan", "Nowshera", "Charsadda", "Mansehra", "Swabi", "Timargara", "Bannu", "Batkhela"],
    "Balochistan": ["Quetta", "Gwadar", "Khuzdar", "Chaman", "Turbat", "Sibi", "Hub", "Zhob", "Dera Murad Jamali"],
    "Islamabad": ["Islamabad"]
  };

  const [cartItem, setCartItem] = useState({
    id: "1",
    name: "ANUA Heartleaf 77 Soothing Toner - 250ml",
    price: 4500,
    qty: 1,
    image: "/uploads/banner_skincare_1783568776197.png",
    variant: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("productId");
    if (productId) {
      setCartItem({
        id: productId,
        name: params.get("name") || "Product",
        price: Number(params.get("price") || 0),
        qty: Number(params.get("qty") || 1),
        image: params.get("image") || "/placeholder.png",
        variant: params.get("variant") || ""
      });
    }
  }, []);

  const subtotal = cartItem.price * cartItem.qty;
  const shipping = subtotal >= 2500 ? 0 : 250;
  const advanceSaving = paymentMethod === "advance" ? advanceDiscount : 0;
  const couponDiscount = appliedCoupon?.discountAmount || 0;
  const total = subtotal + shipping - couponDiscount - advanceSaving;

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  async function handleApplyCoupon() {
    if (!couponCode) return;
    setCouponLoading(true);
    setCouponError("");
    const res = await fetch("/api/checkout/apply-coupon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode, cartTotal: subtotal })
    });
    setCouponLoading(false);
    const data = await res.json();
    if (res.ok) {
      setAppliedCoupon({ code: data.coupon.code, discountAmount: data.discountAmount });
      setCouponCode("");
    } else {
      setCouponError(data.error);
    }
  }

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await createOrder({
      customerName: fd.get("name") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      address: fd.get("address") as string,
      city: fd.get("city") as string,
      province: fd.get("province") as string,
      postalCode: fd.get("postal") as string,
      total,
      couponCode: appliedCoupon?.code || undefined,
      discountAmount: appliedCoupon?.discountAmount || undefined,
      paymentMethod,
      productId: cartItem.id,
      itemName: cartItem.variant ? `${cartItem.name} (${cartItem.variant})` : cartItem.name,
      itemPrice: cartItem.price,
      itemQty: cartItem.qty,
      itemImage: cartItem.image
    });
    if (res.success) {
      setOrderNumber(res.orderNumber);
      setStep("success");
    } else {
      alert("Checkout failed. Please try again.");
    }
    setLoading(false);
  }

  async function handleEmailBlur(e: React.FocusEvent<HTMLInputElement>) {
    const email = e.target.value;
    if (!email || !email.includes("@")) return;
    await fetch("/api/cart/abandoned", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, cartData: [cartItem] })
    }).catch(console.error);
  }

  function openWhatsApp() {
    const clean = whatsappNumber.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Hi! I placed order *#${orderNumber}* via Advance Payment. Screenshot attached. Total: *Rs. ${total.toLocaleString()} PKR*. Please confirm!`
    );
    window.open(`https://wa.me/${clean}?text=${msg}`, "_blank");
  }

  // ── Input style ─────────────────────────────────
  const inputCls = "w-full border border-[#e8ecf0] rounded-xl px-4 py-3 text-[14px] text-[#1a1f2e] bg-[#fafbfc] outline-none transition-all focus:border-[#1a1f2e] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,31,46,0.06)] placeholder:text-[#b8c0cc]";

  // ─── SUCCESS SCREEN ─────────────────────────────────────────────────────────
  if (step === "success") {
    const isAdvance = paymentMethod === "advance";
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4">
        <div className="max-w-[480px] w-full">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] p-8 md:p-10 text-center">
            {/* Check Icon */}
            <div className="mx-auto w-20 h-20 mb-6 relative">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
              </div>
            </div>

            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#94a3b8] mb-2">Order Confirmed</p>
            <h1 className="text-3xl font-black text-[#1a1f2e] mb-2 tracking-tight">Thank You!</h1>
            <p className="text-[#64748b] text-sm mb-1">
              Order <span className="font-bold text-[#1a1f2e]">#{orderNumber}</span> placed successfully.
            </p>
            <p className="text-[#94a3b8] text-xs mb-8">
              Rs. {total.toLocaleString()} • {isAdvance ? "Advance Payment" : "Cash on Delivery"}
            </p>

            {/* Advance Payment Instructions */}
            {isAdvance && (
              <div className="text-left mb-6 space-y-3">
                <div className="bg-[#fafbfc] border border-[#e8ecf0] rounded-2xl p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#94a3b8] mb-3">📋 Send Payment To</p>
                  
                  {/* JazzCash */}
                  {paySettings.jazzcash?.displayNumber && (
                    <div className="flex items-center justify-between py-3 border-b border-[#f0f0f0]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden relative bg-[#f5f5f5]">
                          <Image src="/uploads/jazzcash.jpg" alt="JazzCash" fill className="object-contain p-1" />
                        </div>
                        <div>
                          <p className="text-[11px] text-[#94a3b8] font-medium">JazzCash</p>
                          <p className="text-sm font-bold text-[#1a1f2e]">{paySettings.jazzcash.displayNumber}</p>
                          {paySettings.jazzcash.displayName && <p className="text-xs text-[#64748b]">{paySettings.jazzcash.displayName}</p>}
                        </div>
                      </div>
                      <button onClick={() => copyToClipboard(paySettings.jazzcash.displayNumber, "jc")} className="text-[#94a3b8] hover:text-[#1a1f2e] transition-colors p-2 rounded-lg hover:bg-[#f0f0f0]">
                        {copied === "jc" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  )}

                  {/* EasyPaisa */}
                  {paySettings.easypaisa?.displayNumber && (
                    <div className="flex items-center justify-between py-3 border-b border-[#f0f0f0]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden relative bg-[#f5f5f5]">
                          <Image src="/uploads/easypaisa.png" alt="EasyPaisa" fill className="object-contain p-1" />
                        </div>
                        <div>
                          <p className="text-[11px] text-[#94a3b8] font-medium">EasyPaisa</p>
                          <p className="text-sm font-bold text-[#1a1f2e]">{paySettings.easypaisa.displayNumber}</p>
                          {paySettings.easypaisa.displayName && <p className="text-xs text-[#64748b]">{paySettings.easypaisa.displayName}</p>}
                        </div>
                      </div>
                      <button onClick={() => copyToClipboard(paySettings.easypaisa.displayNumber, "ep")} className="text-[#94a3b8] hover:text-[#1a1f2e] transition-colors p-2 rounded-lg hover:bg-[#f0f0f0]">
                        {copied === "ep" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {paySettings.bankTransfer?.accountNumber && (
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1a1f2e] flex items-center justify-center">
                          <span className="text-white text-[9px] font-black">BANK</span>
                        </div>
                        <div>
                          <p className="text-[11px] text-[#94a3b8] font-medium">{paySettings.bankTransfer.bankName || "Bank Transfer"}</p>
                          <p className="text-sm font-bold text-[#1a1f2e]">{paySettings.bankTransfer.accountNumber}</p>
                          {paySettings.bankTransfer.accountTitle && <p className="text-xs text-[#64748b]">{paySettings.bankTransfer.accountTitle}</p>}
                          {paySettings.bankTransfer.iban && <p className="text-[11px] text-[#94a3b8]">IBAN: {paySettings.bankTransfer.iban}</p>}
                        </div>
                      </div>
                      <button onClick={() => copyToClipboard(paySettings.bankTransfer.accountNumber, "bank")} className="text-[#94a3b8] hover:text-[#1a1f2e] transition-colors p-2 rounded-lg hover:bg-[#f0f0f0]">
                        {copied === "bank" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  )}

                  {/* Fallback if no accounts set */}
                  {!paySettings.jazzcash?.displayNumber && !paySettings.easypaisa?.displayNumber && !paySettings.bankTransfer?.accountNumber && (
                    <p className="text-sm text-[#94a3b8] py-2">Transfer details will be sent to your email.</p>
                  )}
                </div>

                {/* Custom bank instructions */}
                {paySettings.bankTransfer?.displayInstructions && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-xs text-amber-700 leading-relaxed">{paySettings.bankTransfer.displayInstructions}</p>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <button
                  onClick={openWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20b858] text-white font-bold text-sm py-4 rounded-2xl transition-all duration-200 shadow-[0_4px_16px_rgba(37,211,102,0.25)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Screenshot via WhatsApp
                </button>
              </div>
            )}

            <div className={`flex gap-3 ${isAdvance ? "" : "mt-2"}`}>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center py-3.5 rounded-2xl border border-[#e8ecf0] text-[#64748b] hover:border-[#1a1f2e] hover:text-[#1a1f2e] font-semibold text-sm transition-all"
              >
                Continue Shopping
              </Link>
              <Link
                href="/account"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#1a1f2e] text-white font-bold text-sm transition-all hover:bg-[#2d3548]"
              >
                Track Order <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN CART / CHECKOUT ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9fb]">

      {/* Minimal Top Nav */}
      <div className="bg-white border-b border-[#f0f0f0]">
        <div className="max-w-[1100px] mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => step === "checkout" ? setStep("cart") : window.history.back()}
            className="flex items-center gap-1.5 text-[#64748b] hover:text-[#1a1f2e] transition-colors text-sm font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === "checkout" ? "Back to Cart" : "Back"}
          </button>

          {/* Step indicators */}
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
            <span className={step === "cart" ? "text-[#1a1f2e]" : "text-[#b8c0cc]"}>Bag</span>
            <div className="w-5 h-px bg-[#e8ecf0]" />
            <span className={step === "checkout" ? "text-[#1a1f2e]" : "text-[#b8c0cc]"}>Checkout</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#94a3b8]">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-4">

            {step === "cart" ? (
              // ── CART STEP ──
              <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#f8f9fb]">
                  <h1 className="text-[17px] font-black text-[#1a1f2e]">Shopping Bag</h1>
                  <p className="text-xs text-[#94a3b8] mt-0.5">1 item</p>
                </div>
                <div className="p-6 flex items-center gap-5">
                  <div className="w-20 h-20 bg-[#f8f9fb] rounded-xl relative overflow-hidden shrink-0">
                    <Image src={cartItem.image} alt="" fill className="object-cover mix-blend-multiply p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#1a1f2e] leading-snug mb-0.5">{cartItem.name}</h3>
                    {cartItem.variant && <p className="text-xs font-bold text-amber-600 mb-1">Shade: {cartItem.variant}</p>}
                    <p className="text-xs text-[#94a3b8] mb-3">Signature Collection</p>
                    <span className="text-base font-black text-[#1a1f2e]">Rs. {(cartItem.price * cartItem.qty).toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-[#94a3b8] shrink-0">Qty: {cartItem.qty}</span>
                </div>
                <div className="px-6 pb-6">
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full bg-[#1a1f2e] hover:bg-[#2d3548] text-white font-bold text-[13px] uppercase tracking-widest py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              // ── CHECKOUT STEP ──
              <form onSubmit={handleCheckout} className="space-y-4">

                {/* Shipping Information */}
                <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
                  <div className="px-6 py-5 border-b border-[#f8f9fb] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f8f9fb] border border-[#f0f0f0] flex items-center justify-center">
                      <Package className="w-4 h-4 text-[#64748b]" />
                    </div>
                    <div>
                      <h2 className="text-[15px] font-black text-[#1a1f2e]">Shipping Information</h2>
                      <p className="text-[11px] text-[#94a3b8]">We'll deliver right to your door</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8] mb-2">Full Name</label>
                      <input name="name" required className={inputCls} placeholder="Your full name" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8] mb-2">Phone Number *</label>
                        <input required type="text" name="phone" defaultValue="+92 " className={inputCls} placeholder="+92 300 1234567" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8] mb-2">Email Address *</label>
                        <input required type="email" name="email" onBlur={handleEmailBlur} className={inputCls} placeholder="For order updates" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8] mb-2">Complete Address</label>
                      <input name="address" required className={inputCls} placeholder="House No, Street, Area / Block" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City */}
                      <div className="relative">
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8] mb-2">City</label>
                        <input type="hidden" name="city" value={citySearch} />
                        <input
                          required autoComplete="off" value={citySearch}
                          onChange={(e) => { setCitySearch(e.target.value); setShowCityDropdown(true); }}
                          onFocus={() => setShowCityDropdown(true)}
                          onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                          className={inputCls} placeholder="Search or select city"
                        />
                        {showCityDropdown && (
                          <div className="absolute z-20 w-full mt-1 bg-white border border-[#e8ecf0] rounded-xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)] max-h-52 overflow-y-auto">
                            {(provinceCities[selectedProvince] || [])
                              .filter(c => c.toLowerCase().includes(citySearch.toLowerCase()))
                              .map(city => (
                                <div key={city} onClick={() => { setCitySearch(city); setShowCityDropdown(false); }}
                                  className="px-4 py-2.5 text-sm text-[#1a1f2e] hover:bg-[#f8f9fb] cursor-pointer border-b border-[#f8f9fb] last:border-0 transition-colors"
                                >
                                  {city}
                                </div>
                              ))}
                            {!(provinceCities[selectedProvince] || []).some(c => c.toLowerCase().includes(citySearch.toLowerCase())) && (
                              <div className="px-4 py-3 text-sm text-[#94a3b8] italic">No cities found</div>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Province */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8] mb-2">Province</label>
                        <select name="province" value={selectedProvince}
                          onChange={(e) => { setSelectedProvince(e.target.value); setCitySearch(""); }}
                          className={inputCls}
                        >
                          {Object.keys(provinceCities).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Delivery badge */}
                    <div className={`flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium ${shipping === 0 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      <Truck className="w-4 h-4 shrink-0" />
                      {shipping === 0 ? "🎉 You qualify for FREE delivery!" : `Delivery: Rs. ${shipping} — Add Rs. ${2500 - subtotal} more for free.`}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
                  <div className="px-6 py-5 border-b border-[#f8f9fb] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f8f9fb] border border-[#f0f0f0] flex items-center justify-center">
                      <Banknote className="w-4 h-4 text-[#64748b]" />
                    </div>
                    <div>
                      <h2 className="text-[15px] font-black text-[#1a1f2e]">Payment Method</h2>
                      <p className="text-[11px] text-[#94a3b8]">Choose how you'd like to pay</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    {/* COD */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-[#1a1f2e] bg-[#1a1f2e]/[0.02]" : "border-[#f0f0f0] hover:border-[#e0e0e0]"}`}
                    >
                      <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "cod" ? "border-[#1a1f2e]" : "border-[#d1d5db]"}`} style={{ width: 18, height: 18 }}>
                        {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-[#1a1f2e]" />}
                      </div>
                      <Banknote className="w-5 h-5 text-[#64748b] shrink-0" />
                      <div>
                        <p className="font-bold text-sm text-[#1a1f2e]">Cash on Delivery</p>
                        <p className="text-xs text-[#94a3b8]">Pay when your order arrives</p>
                      </div>
                    </div>

                    {/* Advance Payment */}
                    <div
                      onClick={() => setPaymentMethod("advance")}
                      className={`border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "advance" ? "border-[#f59e0b]" : "border-[#f0f0f0] hover:border-[#e0e0e0]"}`}
                    >
                      <div className="flex items-start gap-4 p-4">
                        <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${paymentMethod === "advance" ? "border-[#f59e0b]" : "border-[#d1d5db]"}`} style={{ width: 18, height: 18 }}>
                          {paymentMethod === "advance" && <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="font-bold text-sm text-[#1a1f2e]">Advance Payment</p>
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                              Save Rs. {advanceDiscount}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] mb-3">Pay via JazzCash, EasyPaisa, or Bank Transfer</p>

                          {/* Payment logos */}
                          <div className="flex flex-wrap gap-2">
                            {paySettings.jazzcash?.enabled !== false && (
                              <div className="flex items-center gap-2 bg-[#f8f9fb] border border-[#f0f0f0] rounded-lg px-2.5 py-1.5">
                                <div className="w-6 h-6 rounded overflow-hidden relative">
                                  <Image src="/uploads/jazzcash.jpg" alt="JazzCash" fill className="object-contain" />
                                </div>
                                <span className="text-[11px] font-bold text-[#1a1f2e]">JazzCash</span>
                              </div>
                            )}
                            {paySettings.easypaisa?.enabled !== false && (
                              <div className="flex items-center gap-2 bg-[#f8f9fb] border border-[#f0f0f0] rounded-lg px-2.5 py-1.5">
                                <div className="w-6 h-6 rounded overflow-hidden relative">
                                  <Image src="/uploads/easypaisa.png" alt="EasyPaisa" fill className="object-contain" />
                                </div>
                                <span className="text-[11px] font-bold text-[#1a1f2e]">EasyPaisa</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 bg-[#f8f9fb] border border-[#f0f0f0] rounded-lg px-2.5 py-1.5">
                              <div className="w-6 h-6 rounded bg-[#1a1f2e] flex items-center justify-center">
                                <span className="text-white text-[8px] font-black">BK</span>
                              </div>
                              <span className="text-[11px] font-bold text-[#1a1f2e]">Bank</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Account details revealed when selected */}
                      {paymentMethod === "advance" && (
                        <div className="mx-4 mb-4 border border-[#f0f0f0] rounded-xl overflow-hidden bg-[#fafbfc]">
                          {paySettings.jazzcash?.displayNumber && (
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0]">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg overflow-hidden relative bg-white">
                                  <Image src="/uploads/jazzcash.jpg" alt="JazzCash" fill className="object-contain p-0.5" />
                                </div>
                                <div>
                                  <p className="text-[11px] text-[#94a3b8]">JazzCash</p>
                                  <p className="text-sm font-bold text-[#1a1f2e]">{paySettings.jazzcash.displayNumber}</p>
                                  {paySettings.jazzcash.displayName && <p className="text-xs text-[#64748b]">{paySettings.jazzcash.displayName}</p>}
                                </div>
                              </div>
                              <button type="button" onClick={() => copyToClipboard(paySettings.jazzcash.displayNumber, "jc-f")} className="text-[#94a3b8] hover:text-[#1a1f2e] p-1.5 rounded-lg hover:bg-white transition-colors">
                                {copied === "jc-f" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          )}
                          {paySettings.easypaisa?.displayNumber && (
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0]">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg overflow-hidden relative bg-white">
                                  <Image src="/uploads/easypaisa.png" alt="EasyPaisa" fill className="object-contain p-0.5" />
                                </div>
                                <div>
                                  <p className="text-[11px] text-[#94a3b8]">EasyPaisa</p>
                                  <p className="text-sm font-bold text-[#1a1f2e]">{paySettings.easypaisa.displayNumber}</p>
                                  {paySettings.easypaisa.displayName && <p className="text-xs text-[#64748b]">{paySettings.easypaisa.displayName}</p>}
                                </div>
                              </div>
                              <button type="button" onClick={() => copyToClipboard(paySettings.easypaisa.displayNumber, "ep-f")} className="text-[#94a3b8] hover:text-[#1a1f2e] p-1.5 rounded-lg hover:bg-white transition-colors">
                                {copied === "ep-f" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          )}
                          {paySettings.bankTransfer?.accountNumber && (
                            <div className="flex items-center justify-between px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-[#1a1f2e] flex items-center justify-center">
                                  <span className="text-white text-[8px] font-black">BK</span>
                                </div>
                                <div>
                                  <p className="text-[11px] text-[#94a3b8]">{paySettings.bankTransfer.bankName || "Bank Transfer"}</p>
                                  <p className="text-sm font-bold text-[#1a1f2e]">{paySettings.bankTransfer.accountNumber}</p>
                                  {paySettings.bankTransfer.accountTitle && <p className="text-xs text-[#64748b]">{paySettings.bankTransfer.accountTitle}</p>}
                                </div>
                              </div>
                              <button type="button" onClick={() => copyToClipboard(paySettings.bankTransfer.accountNumber, "bank-f")} className="text-[#94a3b8] hover:text-[#1a1f2e] p-1.5 rounded-lg hover:bg-white transition-colors">
                                {copied === "bank-f" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          )}
                          {!paySettings.jazzcash?.displayNumber && !paySettings.easypaisa?.displayNumber && !paySettings.bankTransfer?.accountNumber && (
                            <p className="px-4 py-3 text-sm text-[#94a3b8]">Payment details will be confirmed after order placement.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="px-6 pb-6">
                    <button
                      type="submit" disabled={loading}
                      className={`w-full font-black text-[13px] uppercase tracking-widest py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 ${
                        paymentMethod === "advance"
                          ? "bg-amber-400 hover:bg-amber-500 text-[#1a1f2e] shadow-[0_4px_16px_rgba(245,158,11,0.25)]"
                          : "bg-[#1a1f2e] hover:bg-[#2d3548] text-white shadow-[0_4px_16px_rgba(26,31,46,0.15)]"
                      }`}
                    >
                      {loading ? <><Clock className="w-4 h-4 animate-spin" /> Processing...</> 
                        : paymentMethod === "advance"
                          ? <>Place Order & Save Rs. {advanceDiscount} <ArrowRight className="w-4 h-4" /></>
                          : <>Place Order (Cash on Delivery) <ArrowRight className="w-4 h-4" /></>
                      }
                    </button>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <span className="flex items-center gap-1.5 text-[11px] text-[#b8c0cc]"><Shield className="w-3 h-3" /> 256-bit SSL</span>
                      <span className="flex items-center gap-1.5 text-[11px] text-[#b8c0cc]"><Truck className="w-3 h-3" /> Nationwide Delivery</span>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden sticky top-20">
              <div className="px-6 py-5 border-b border-[#f8f9fb]">
                <h2 className="text-[13px] font-black uppercase tracking-widest text-[#1a1f2e]">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="flex gap-3.5 pb-5 border-b border-[#f8f9fb]">
                  <div className="relative w-14 h-14 bg-[#f8f9fb] rounded-xl overflow-hidden shrink-0">
                    <Image src={cartItem.image} alt={cartItem.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#1a1f2e] leading-snug mb-0.5 truncate">{cartItem.name}</p>
                    {cartItem.variant && <p className="text-[10px] font-bold text-amber-600">Shade: {cartItem.variant}</p>}
                    <p className="text-[11px] text-[#94a3b8]">Qty: {cartItem.qty}</p>
                    <p className="text-[13px] font-black text-[#1a1f2e] mt-1">Rs. {(cartItem.price * cartItem.qty).toLocaleString()}</p>
                  </div>
                </div>

                {/* Coupon */}
                <div className="py-4 border-b border-[#f8f9fb]">
                  <div className="flex gap-2">
                    <input
                      type="text" value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Promo code"
                      className="flex-1 border border-[#e8ecf0] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#1a1f2e] font-mono uppercase bg-[#fafbfc] transition-all"
                    />
                    <button type="button" onClick={handleApplyCoupon} disabled={couponLoading || !couponCode}
                      className="bg-[#1a1f2e] text-white font-bold text-[11px] uppercase tracking-wider px-4 rounded-xl hover:bg-[#2d3548] transition-colors disabled:opacity-50"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                  {couponError && <p className="text-red-500 text-xs mt-1.5">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="mt-2 bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-emerald-700">{appliedCoupon.code} applied</span>
                      <button type="button" onClick={() => setAppliedCoupon(null)} className="text-[11px] text-[#94a3b8] hover:text-red-500 font-bold">✕</button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94a3b8]">Subtotal</span>
                    <span className="font-semibold text-[#1a1f2e]">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94a3b8]">Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? "text-emerald-600" : "text-[#1a1f2e]"}`}>
                      {shipping === 0 ? "Free 🎉" : `Rs. ${shipping}`}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm font-bold text-emerald-600">
                      <span>Coupon</span>
                      <span>- Rs. {appliedCoupon.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  {paymentMethod === "advance" && (
                    <div className="flex justify-between text-sm font-bold text-amber-600">
                      <span>Advance Discount</span>
                      <span>- Rs. {advanceDiscount}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t-2 border-[#f0f0f0] flex justify-between items-center">
                  <span className="text-[12px] font-black uppercase tracking-widest text-[#1a1f2e]">Total</span>
                  <span className="text-2xl font-black text-[#1a1f2e]">Rs. {total.toLocaleString()}</span>
                </div>

                {paymentMethod === "advance" && (
                  <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-100 p-3 rounded-xl">
                    <span className="text-base">💰</span>
                    <p className="text-xs text-amber-700">Saving <strong>Rs. {advanceDiscount}</strong> with Advance Payment</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
