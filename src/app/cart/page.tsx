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
      total: mockCartItem.price,
    });
    if (res.success) {
      setOrderNumber(res.orderNumber);
      setStep("success");
    }
    setLoading(false);
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
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#64748b] mb-2">Phone Number</label>
                    <input name="phone" required className="w-full border border-[#e2e8f0] rounded-lg p-3 text-[14px] outline-none focus:border-[#0b1221]" placeholder="+92 300 1234567" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#64748b] mb-2">Email Address</label>
                    <input name="email" type="email" required className="w-full border border-[#e2e8f0] rounded-lg p-3 text-[14px] outline-none focus:border-[#0b1221]" placeholder="john@example.com" />
                  </div>
                  <div className="col-span-2">
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
            <div className="bg-[#0b1221] text-white rounded-2xl p-8 sticky top-8">
              <h3 className="text-[18px] font-bold mb-6">Order Summary</h3>
              <div className="flex justify-between text-[#cbd5e1] mb-3 text-[14px]">
                <span>Subtotal</span>
                <span>PKR {mockCartItem.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#cbd5e1] mb-6 text-[14px]">
                <span>Shipping</span>
                <span className="text-[#d4af37] font-semibold">Free</span>
              </div>
              <div className="w-full h-px bg-white/10 mb-6"></div>
              <div className="flex justify-between text-white mb-8 text-[18px] font-bold">
                <span>Total</span>
                <span>PKR {mockCartItem.price.toFixed(2)}</span>
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
    </div>
  );
}
