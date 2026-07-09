"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Lock, ArrowRight, Truck } from "lucide-react";
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

  const provinceCities: Record<string, string[]> = {
    "Punjab": [
      "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Sargodha", 
      "Bahawalpur", "Sheikhupura", "Jhang", "Gujrat", "Kasur", "Sahiwal", "Okara", "Wah Cantonment", 
      "Dera Ghazi Khan", "Chiniot", "Kamoke", "Sadiqabad", "Burewala", "Vehari", "Muridke"
    ],
    "Sindh": [
      "Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas", "Jacobabad", 
      "Shikarpur", "Khairpur", "Dadu", "Tando Adam", "Tando Allahyar", "Umerkot", "Badin"
    ],
    "KPK": [
      "Peshawar", "Mardan", "Mingora", "Kohat", "Abbottabad", "Swat", "Dera Ismail Khan", 
      "Nowshera", "Charsadda", "Mansehra", "Swabi", "Timargara", "Bannu", "Batkhela"
    ],
    "Balochistan": [
      "Quetta", "Gwadar", "Khuzdar", "Chaman", "Turbat", "Sibi", "Hub", "Zhob", "Dera Murad Jamali"
    ],
    "Islamabad": ["Islamabad"]
  };

  const mockCartItem = {
    id: "1",
    name: "ANUA Heartleaf 77 Soothing Toner - 250ml",
    price: 4500,
    qty: 1,
    image: "/uploads/banner_skincare_1783568776197.png"
  };
  const subtotal = mockCartItem.price;
  const shipping = subtotal >= 2500 ? 0 : 250;
  const total = subtotal + shipping - (appliedCoupon?.discountAmount || 0);

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
      total: total,
      couponCode: appliedCoupon?.code || undefined,
      discountAmount: appliedCoupon?.discountAmount || undefined
    });
    if (res.success) {
      setOrderNumber(res.orderNumber);
      setStep("success");
    } else {
      alert("Checkout failed");
    }
    setLoading(false);
  }

  async function handleEmailBlur(e: React.FocusEvent<HTMLInputElement>) {
    const email = e.target.value;
    if (!email || !email.includes("@")) return;

    // Track abandoned cart
    await fetch("/api/cart/abandoned", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        cartData: [mockCartItem]
      })
    }).catch(console.error);
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
        <div className="bg-white p-12 max-w-lg w-full text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl">
          <CheckCircle2 className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
          <h1 className="text-[32px] font-bold text-[#0b1221] mb-2 tracking-tight">Order Confirmed</h1>
          <p className="text-[#64748b] mb-8">Thank you for shopping with us. Your order <span className="font-bold text-[#0b1221]">#{orderNumber}</span> has been placed successfully.</p>
          <Link href="/" className="inline-block bg-[#0b1221] text-white font-bold text-[13px] uppercase tracking-widest px-10 py-4 rounded-sm transition-colors hover:bg-[#d4af37]">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Main Content (Cart or Checkout Form) */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8 text-[12px] font-bold uppercase tracking-widest">
              <button onClick={() => setStep("cart")} className={`${step === "cart" ? "text-[#0b1221]" : "text-[#94a3b8]"}`}>Shopping Bag</button>
              <span className="text-[#e2e8f0]">/</span>
              <button onClick={() => setStep("checkout")} className={`${step === "checkout" ? "text-[#0b1221]" : "text-[#94a3b8]"}`}>Checkout</button>
            </div>

            {step === "cart" ? (
              <div className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-6 border-b border-[#f0f0f0] pb-6 mb-6">
                  <div className="w-24 h-24 bg-[#f8f9fa] rounded-lg relative overflow-hidden shrink-0">
                    <Image src={mockCartItem.image} alt="" fill className="object-cover mix-blend-multiply p-2" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-bold text-[#0b1221] mb-1">{mockCartItem.name}</h3>
                    <p className="text-[#94a3b8] text-[13px]">Signature Collection</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] font-bold text-[#0b1221]">PKR {mockCartItem.price.toFixed(2)}</div>
                    <div className="text-[#64748b] text-[12px] mt-1">Qty: 1</div>
                  </div>
                </div>
                <button onClick={() => setStep("checkout")} className="w-full bg-[#0b1221] text-white font-bold text-[13px] uppercase tracking-widest py-4 rounded-sm transition-colors hover:bg-[#d4af37] flex items-center justify-center gap-3">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
                <h2 className="text-[24px] font-bold text-[#0b1221] mb-6 tracking-tight">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-5 mb-8">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#64748b] mb-2">Full Name</label>
                    <input name="name" required className="w-full border border-[#e2e8f0] rounded-lg p-3 text-[14px] outline-none focus:border-[#0b1221]" placeholder="John Doe" />
                  </div>
                    <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">Phone Number *</label>
                    <input required type="text" name="phone" defaultValue="+92 " className="w-full bg-white border border-line rounded-lg px-4 py-3 outline-none focus:border-brand transition-colors text-sm" placeholder="+92 300 1234567" />
                  </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">Email Address *</label>
                      <input required type="email" name="email" onBlur={handleEmailBlur} className="w-full bg-white border border-line rounded-lg px-4 py-3 outline-none focus:border-brand transition-colors text-sm" placeholder="For order updates" />
                    </div>
                    <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#64748b] mb-2">Complete Address</label>
                    <input name="address" required className="w-full border border-[#e2e8f0] rounded-lg p-3 text-[14px] outline-none focus:border-[#0b1221]" placeholder="House No, Street, Area" />
                  </div>
                  <div className="col-span-2 md:col-span-1 relative">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#64748b] mb-2">City</label>
                    <input 
                      type="hidden"
                      name="city"
                      value={citySearch}
                    />
                    <input 
                      required 
                      autoComplete="off"
                      value={citySearch}
                      onChange={(e) => {
                        setCitySearch(e.target.value);
                        setShowCityDropdown(true);
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                      onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                      className="w-full border border-[#e2e8f0] rounded-lg p-3 text-[14px] outline-none focus:border-[#0b1221]" 
                      placeholder="Search or select city" 
                    />
                    
                    {showCityDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-[#e2e8f0] rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] max-h-60 overflow-y-auto">
                        {(provinceCities[selectedProvince] || [])
                          .filter(city => city.toLowerCase().includes(citySearch.toLowerCase()))
                          .map(city => (
                            <div 
                              key={city}
                              className="px-4 py-3 text-[14px] text-[#0b1221] hover:bg-[#f8f9fa] hover:text-[#d4af37] cursor-pointer transition-colors border-b border-[#f0f0f0] last:border-0"
                              onClick={() => {
                                setCitySearch(city);
                                setShowCityDropdown(false);
                              }}
                            >
                              {city}
                            </div>
                          ))}
                        {(provinceCities[selectedProvince] || []).filter(city => city.toLowerCase().includes(citySearch.toLowerCase())).length === 0 && (
                          <div className="px-4 py-3 text-[13px] text-[#94a3b8] italic">No cities found</div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#64748b] mb-2">Province</label>
                    <select 
                      name="province" 
                      value={selectedProvince}
                      onChange={(e) => {
                        setSelectedProvince(e.target.value);
                        setCitySearch(""); // Reset city when province changes
                      }}
                      className="w-full border border-[#e2e8f0] rounded-lg p-3 text-[14px] outline-none focus:border-[#0b1221]"
                    >
                      {Object.keys(provinceCities).map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#0b1221] text-white font-bold text-[13px] uppercase tracking-widest py-4 rounded-sm transition-colors hover:bg-[#d4af37]">
                  {loading ? "Processing..." : "Place Order (Cash on Delivery)"}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full md:w-[380px] shrink-0">
            <div className="bg-[#f8f9fa] p-6 lg:p-8 rounded-2xl flex flex-col h-full border border-[#e2e8f0]">
              <h2 className="text-[15px] font-black uppercase tracking-widest text-[#0b1221] mb-6">Order Summary</h2>

              <div className="flex-1 space-y-6">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 bg-white rounded-xl border border-[#e2e8f0] flex items-center justify-center overflow-hidden shrink-0">
                    <Image src={mockCartItem.image} alt={mockCartItem.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[13px] text-[#0b1221] mb-1 leading-snug">{mockCartItem.name}</div>
                    <div className="text-[12px] text-[#64748b]">Qty: {mockCartItem.qty}</div>
                    <div className="font-black text-[#0b1221] text-[14px] mt-1">Rs. {mockCartItem.price.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="pt-6 mt-6 border-t border-[#e2e8f0]">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())} 
                    placeholder="Gift card or discount code" 
                    className="flex-1 border border-[#e2e8f0] rounded-lg p-3 text-[14px] outline-none focus:border-brand font-mono uppercase" 
                  />
                  <button 
                    type="button" 
                    onClick={handleApplyCoupon} 
                    disabled={couponLoading || !couponCode}
                    className="bg-ink text-white font-bold text-[12px] uppercase tracking-widest px-6 rounded-lg hover:bg-brand transition-colors disabled:opacity-50"
                  >
                    {couponLoading ? "Applying..." : "Apply"}
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-[12px] font-bold mt-2">{couponError}</p>}
                
                {appliedCoupon && (
                  <div className="mt-3 bg-brand/5 border border-brand/20 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-mono font-bold text-[13px]">{appliedCoupon.code}</span>
                    </div>
                    <button type="button" onClick={() => setAppliedCoupon(null)} className="text-[11px] font-bold uppercase tracking-wider text-sub hover:text-red-500">
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-[#e2e8f0] space-y-3">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#64748b]">Subtotal</span>
                  <span className="font-semibold text-[#0b1221]">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[14px] text-brand font-bold">
                    <span>Discount</span>
                    <span>- Rs. {appliedCoupon.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#64748b]">Shipping</span>
                  <span className={shipping === 0 ? "font-bold text-brand" : "font-semibold text-[#0b1221]"}>
                    {shipping === 0 ? "Free" : `Rs. ${shipping.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#e2e8f0]">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[13px] font-bold uppercase tracking-widest text-[#0b1221]">Total</span>
                  <div className="text-right">
                    <span className="text-[11px] text-[#64748b] mr-2">PKR</span>
                    <span className="text-2xl font-black text-[#0b1221]">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-[12px] text-[#94a3b8]">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5 text-[#d4af37]" />
                  <p>Guaranteed safe & secure checkout. Your data is encrypted.</p>
                </div>
                <div className="flex items-start gap-3 text-[12px] text-[#94a3b8]">
                  <Truck className="w-4 h-4 shrink-0 mt-0.5 text-[#d4af37]" />
                  <p>Fast delivery nationwide within 3-5 business days.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}
