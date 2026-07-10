"use client";
import { useState, useEffect } from "react";
import { fmtCurrency } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface Variant {
  id: string;
  sku: string | null;
  price: number;
  stock: number;
  optionChoices: string; // JSON string
}

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice: number | null;
  stock: number;
  options: string | null; // JSON array
  variants: Variant[];
  images?: string; // JSON array string
  description: string;
}

export default function VariantSelector({ product, general }: { product: Product, general: any }) {
  const router = useRouter();
  const options = product.options ? JSON.parse(product.options) as { name: string; values: string[] }[] : [];
  
  const variants = product.variants.map(v => ({
    ...v,
    choices: JSON.parse(v.optionChoices) as Record<string, string>
  }));

  // Safely parse description JSON
  let parsedDesc: any = {};
  try {
    if (product.description) {
      parsedDesc = JSON.parse(product.description);
    }
  } catch {}

  const showBundleSaveSetting = !!parsedDesc.showBundleSave;
  const hasShadeAndSize = options.some(o => o.name === "Shade") && options.some(o => o.name === "Size");

  // Keep track of separate option states
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    options.forEach(opt => {
      if (opt.values.length > 0) init[opt.name] = opt.values[0];
    });
    return init;
  });

  const [qty, setQty] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<"one" | "two" | "three">("one");
  const [matchedVariant, setMatchedVariant] = useState<typeof variants[0] | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) setShowSticky(true);
      else setShowSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (variants.length === 0) return;
    const matched = variants.find(v => {
      for (const [key, val] of Object.entries(selected)) {
        if (v.choices[key] !== val) return false;
      }
      return true;
    });
    setMatchedVariant(matched || null);
  }, [selected, variants]);

  const currentPrice = matchedVariant ? matchedVariant.price : product.price;
  const currentStock = matchedVariant ? matchedVariant.stock : product.stock;
  const showCompare = matchedVariant ? false : !!product.comparePrice;

  // Sync qty and bundle selection
  const handleQtyChange = (newQty: number) => {
    const q = Math.max(1, Math.min(currentStock, newQty));
    setQty(q);
    if (q === 1) setSelectedBundle("one");
    else if (q === 2) setSelectedBundle("two");
    else if (q >= 3) setSelectedBundle("three");
  };

  const handleBundleSelect = (b: "one" | "two" | "three") => {
    setSelectedBundle(b);
    if (b === "one") setQty(1);
    else if (b === "two") setQty(2);
    else if (b === "three") setQty(3);
  };

  // Calculate dynamic bundle unit price and total price
  const getBundleUnitPrice = () => {
    if (currentPrice === 2799) {
      if (selectedBundle === "two") return 2659.5; // total 5319
      if (selectedBundle === "three") return 2379.33; // total 7138
    }
    if (selectedBundle === "two") return currentPrice * 0.95;
    if (selectedBundle === "three") return currentPrice * 0.85;
    return currentPrice;
  };

  const getBundleTotalPrice = () => {
    if (currentPrice === 2799) {
      if (selectedBundle === "two") return 5319;
      if (selectedBundle === "three") return 7138;
    }
    return Math.round(getBundleUnitPrice() * qty);
  };

  const handleRedirect = () => {
    let imgUrl = "/placeholder.png";
    if (product.images) {
      try {
        const arr = JSON.parse(product.images);
        imgUrl = arr[0] || "/placeholder.png";
      } catch {}
    }
    const variantStr = Object.entries(selected).map(([k,v]) => `${k}: ${v}`).join(', ');
    const params = new URLSearchParams({
      productId: product.id,
      name: product.name,
      price: getBundleUnitPrice().toString(),
      image: imgUrl,
      qty: qty.toString(),
      variant: variantStr
    });
    router.push(`/cart?${params.toString()}`);
  };

  // Custom combinations for Hair Color Shampoo swatches
  const swatchCombinations = [
    { shade: "Dark Brown", size: "200ML", color: "#3E2A20", label: "DARK BROWN - 200ML" },
    { shade: "Light Brown", size: "200ML", color: "#8B5A2B", label: "LIGHT BROWN - 200ML" },
    { shade: "Black", size: "200ML", color: "#0a0a0a", label: "BLACK - 200ML" },
    { shade: "Dark Brown", size: "400ML", color: "#3E2A20", label: "DARK BROWN - 400ML" },
    { shade: "Black", size: "400ML", color: "#0a0a0a", label: "BLACK - 400ML" },
    { shade: "Light Brown", size: "400ML", color: "#8B5A2B", label: "LIGHT BROWN - 400ML" },
  ];

  const currentCombinationLabel = `${selected["Shade"]?.toUpperCase()} - ${selected["Size"]}`;

  return (
    <div>
      {/* Price section formatted to match the Hair Factory theme */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[26px] font-bold text-[#e95144] tracking-tight">
          Rs.{getBundleUnitPrice().toLocaleString()}
        </span>
        {showCompare && (
          <span className="text-[18px] font-light text-[#969696] line-through tracking-wide">
            Rs.{(selectedBundle === "one" 
              ? (product.comparePrice || 3499) 
              : selectedBundle === "two" ? 5598 : 8397).toLocaleString()}
          </span>
        )}
        <span className="bg-[#e95144] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          SALE • SAVE RS.{(
            (selectedBundle === "one" ? (product.comparePrice || 3499) : selectedBundle === "two" ? 5598 : 8397) - getBundleTotalPrice()
          ).toLocaleString()}
        </span>
      </div>

      {/* Feature List Box styled like the Hair Factory card */}
      <div className="border border-black rounded-2xl bg-[#fee5c9]/30 p-6 mb-8 grid grid-cols-2 gap-4">
        <div className="flex items-start gap-2.5">
          <span className="text-[#3b2e2a] font-bold mt-0.5">✓</span>
          <div>
            <h5 className="text-[11px] font-bold text-black uppercase tracking-wider">COVERS GRAYS</h5>
            <p className="text-[10px] text-[#6b6b6b]">in just 15 minutes</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="text-[#3b2e2a] font-bold mt-0.5">✓</span>
          <div>
            <h5 className="text-[11px] font-bold text-black uppercase tracking-wider">PROTECTS HAIR</h5>
            <p className="text-[10px] text-[#6b6b6b]">ammonia-free formula</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="text-[#3b2e2a] font-bold mt-0.5">✓</span>
          <div>
            <h5 className="text-[11px] font-bold text-black uppercase tracking-wider">AS EASY AS</h5>
            <p className="text-[10px] text-[#6b6b6b]">regular shampoo</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="text-[#3b2e2a] font-bold mt-0.5">✓</span>
          <div>
            <h5 className="text-[11px] font-bold text-black uppercase tracking-wider">SUITABLE FOR</h5>
            <p className="text-[10px] text-[#6b6b6b]">ALL hair types</p>
          </div>
        </div>
      </div>

      {/* Unified Shade Swatch Selector (For Hair Color Shampoo specifically) */}
      {hasShadeAndSize ? (
        <div className="border border-black rounded-2xl bg-white/40 p-6 mb-8">
          <div className="mb-4">
            <h4 className="text-[11px] font-bold text-black uppercase tracking-wider">
              Choose SHADES: <span className="font-extrabold text-[#e95144]">{currentCombinationLabel}</span>
            </h4>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {swatchCombinations.map(combo => {
              const isSelected = selected["Shade"] === combo.shade && selected["Size"] === combo.size;
              return (
                <button
                  key={combo.label}
                  type="button"
                  onClick={() => setSelected({ "Shade": combo.shade, "Size": combo.size })}
                  className={`flex flex-col items-center p-3 border rounded-xl transition-all ${
                    isSelected 
                      ? 'border-black bg-white ring-2 ring-black' 
                      : 'border-gray-300 hover:border-black bg-white/70'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-full mb-2.5 border border-black/10 shadow-inner"
                    style={{ backgroundColor: combo.color }}
                  />
                  <span className="text-[8px] font-extrabold text-black text-center leading-tight tracking-wider uppercase">
                    {combo.shade}<br/>{combo.size}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Fallback for other products with variants */
        options.length > 0 && (
          <div className="space-y-8 mb-10 border border-black rounded-2xl bg-white/40 p-6">
            {options.map(opt => (
              <div key={opt.name}>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a1a1aa]">{opt.name}</h4>
                  <span className="text-[11px] font-medium text-black">{selected[opt.name]}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {opt.values.map(val => (
                    <button
                      key={val}
                      onClick={() => setSelected(prev => ({ ...prev, [opt.name]: val }))}
                      className={`px-6 py-3 border text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                        selected[opt.name] === val 
                          ? 'border-black bg-black text-white' 
                          : 'border-[#e4e4e7] text-[#52525b] hover:border-black hover:text-black bg-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Quantity Selector */}
      <div className="mb-8">
        <h4 className="text-[10px] font-bold text-black uppercase tracking-wider mb-3">Quantity</h4>
        <div className="flex items-center w-32 border border-black bg-white rounded-xl overflow-hidden">
          <button 
            type="button"
            onClick={() => handleQtyChange(qty - 1)}
            className="w-10 py-3 text-black hover:bg-gray-100 flex items-center justify-center font-bold text-sm select-none"
          >
            -
          </button>
          <span className="flex-1 text-center text-xs font-bold text-black select-none">{qty}</span>
          <button 
            type="button"
            onClick={() => handleQtyChange(qty + 1)}
            className="w-10 py-3 text-black hover:bg-gray-100 flex items-center justify-center font-bold text-sm select-none"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <button 
          type="button"
          onClick={handleRedirect}
          disabled={currentStock <= 0}
          className="w-full bg-[#3b2e2a] hover:bg-[#2d221e] text-white font-bold text-[12px] uppercase tracking-[0.2em] py-5 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(59,46,42,0.2)] rounded-xl"
        >
          <span>{currentStock > 0 ? 'Add To Cart' : 'Out of Stock'}</span>
          {currentStock > 0 && <ShoppingCart className="w-4 h-4 opacity-70" />}
        </button>

        <button 
          type="button"
          onClick={handleRedirect}
          disabled={currentStock <= 0}
          className="w-full bg-[#ff5a1f] hover:bg-[#e04f1a] text-white font-extrabold text-[12px] uppercase tracking-[0.2em] py-5 transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_6px_20px_rgba(255,90,31,0.25)] rounded-xl"
        >
          <span>Buy It Now</span>
        </button>
      </div>

      <div className="text-center mb-10 pb-10 border-b border-black">
        <p className="text-[#e95144] text-[12px] font-black tracking-wider mb-1">30 Day Money-Back-Guarantee.</p>
        <p className="text-[12px] text-black font-bold">
          If it doesn't work for you we'll <span className="text-[#2e7d32] underline decoration-2">refund</span> no questions asked
        </p>
      </div>

      {/* BUNDLE & SAVE SECTION */}
      {showBundleSaveSetting && (
        <div className="border border-[#c27c24] rounded-2xl bg-[#fee5c9]/10 p-6 mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] bg-[#c27c24] flex-1"></div>
            <h3 className="text-sm font-black text-black uppercase tracking-[0.15em]">BUNDLE & SAVE</h3>
            <div className="h-[1px] bg-[#c27c24] flex-1"></div>
          </div>

          <div className="space-y-4">
            {/* Box 1: Buy One */}
            <div 
              onClick={() => handleBundleSelect("one")}
              className={`border-2 rounded-xl overflow-hidden cursor-pointer bg-white transition-all ${
                selectedBundle === "one" ? 'border-[#c27c24]' : 'border-gray-200'
              }`}
            >
              <div className="bg-[#c27c24] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 flex items-center justify-between">
                <span>MOST POPULAR</span>
              </div>
              <div className="p-4 flex items-start gap-4">
                <input 
                  type="radio" 
                  checked={selectedBundle === "one"} 
                  onChange={() => handleBundleSelect("one")}
                  className="mt-1 accent-[#c27c24]" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-black">Buy One</span>
                    <span className="text-xs font-black text-black">Rs.2,799</span>
                  </div>
                  {selectedBundle === "one" && options.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {options.map(opt => (
                        <div key={opt.name} className="space-y-1">
                          <label className="block text-[8px] font-bold text-[#6b6b6b] uppercase tracking-wider">{opt.name}</label>
                          <select 
                            value={selected[opt.name]} 
                            onChange={(e) => setSelected(prev => ({ ...prev, [opt.name]: e.target.value }))}
                            className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-[11px] font-semibold bg-white text-black outline-none"
                          >
                            {opt.values.map(val => (
                              <option key={val} value={val}>{val}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Box 2: Buy Two */}
            <div 
              onClick={() => handleBundleSelect("two")}
              className={`border-2 rounded-xl overflow-hidden cursor-pointer bg-white transition-all ${
                selectedBundle === "two" ? 'border-[#c27c24]' : 'border-gray-200'
              }`}
            >
              <div className="bg-[#c27c24] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 flex items-center justify-between">
                <span>Best Seller!</span>
              </div>
              <div className="p-4 flex items-start gap-4">
                <input 
                  type="radio" 
                  checked={selectedBundle === "two"} 
                  onChange={() => handleBundleSelect("two")}
                  className="mt-1 accent-[#c27c24]" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-black">Buy Two</span>
                    <div className="text-right">
                      <span className="text-xs font-black text-black block">Rs.5,319</span>
                      <span className="text-[10px] text-[#969696] line-through block">Rs.5,598</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wide">Get Extra 5% Discount</span>
                </div>
              </div>
            </div>

            {/* Box 3: Buy Three */}
            <div 
              onClick={() => handleBundleSelect("three")}
              className={`border-2 rounded-xl overflow-hidden cursor-pointer bg-white transition-all ${
                selectedBundle === "three" ? 'border-[#c27c24]' : 'border-gray-200'
              }`}
            >
              <div className="bg-[#c27c24] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 flex items-center justify-between">
                <span>Best Value!</span>
              </div>
              <div className="p-4 flex items-start gap-4">
                <input 
                  type="radio" 
                  checked={selectedBundle === "three"} 
                  onChange={() => handleBundleSelect("three")}
                  className="mt-1 accent-[#c27c24]" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-black">Buy Three</span>
                    <div className="text-right">
                      <span className="text-xs font-black text-black block">Rs.7,138</span>
                      <span className="text-[10px] text-[#969696] line-through block">Rs.8,397</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wide">Get Extra 15% Discount</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStock > 0 && currentStock <= 10 && (
        <p className="text-[11px] font-medium text-[#d4af37] tracking-wider mt-4 text-center">
          Only {currentStock} left in stock - order soon.
        </p>
      )}

      {/* Sticky Bottom Add To Cart bar */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-black p-4 flex gap-4 lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
          <button 
            type="button"
            onClick={handleRedirect}
            disabled={currentStock <= 0}
            className="w-full bg-[#c27c24] hover:bg-[#a9661d] text-white font-bold text-[12px] uppercase tracking-[0.2em] py-4 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl disabled:opacity-50"
          >
            <span>ADD TO CART</span>
          </button>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${general.supportPhone.replace(/[^0-9]/g, "")}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`fixed right-6 z-50 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white ${
          showSticky ? 'bottom-24 lg:bottom-6' : 'bottom-6'
        }`}
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.66.986 3.292 1.503 4.883 1.503 5.394 0 9.782-4.387 9.785-9.78.002-2.612-1.012-5.067-2.859-6.915C16.56 2.114 14.11 1.1 11.498 1.1 6.108 1.1 1.72 5.488 1.716 10.88c-.001 1.622.428 3.209 1.245 4.632l-1.018 3.719 3.823-1.002c.001-.001 0 0 0 0z"/>
        </svg>
      </a>
    </div>
  );
}
