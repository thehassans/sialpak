"use client";
import { useState, useEffect } from "react";
import { fmtCurrency } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

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
}

export default function VariantSelector({ product, general }: { product: Product, general: any }) {
  const options = product.options ? JSON.parse(product.options) as { name: string; values: string[] }[] : [];
  
  // Parse variant optionChoices once
  const variants = product.variants.map(v => ({
    ...v,
    choices: JSON.parse(v.optionChoices) as Record<string, string>
  }));

  // Initialize selected options to the first value of each option
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    options.forEach(opt => {
      if (opt.values.length > 0) init[opt.name] = opt.values[0];
    });
    return init;
  });

  const [matchedVariant, setMatchedVariant] = useState<typeof variants[0] | null>(null);

  useEffect(() => {
    if (variants.length === 0) return;
    
    // Find the variant that matches all selected options
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
  // If matchedVariant exists, we don't have comparePrice at variant level currently in schema.
  // We can default to product.comparePrice if product.price === variant.price, or omit it.
  const showCompare = matchedVariant ? false : !!product.comparePrice;

  return (
    <div>
      <div className="text-2xl font-extrabold mb-4 flex items-center gap-3">
        {showCompare && <span className="line-through text-sub font-medium text-lg">{fmtCurrency(product.comparePrice!, general.currency)}</span>}
        <span className="text-ink">{fmtCurrency(currentPrice, general.currency)}</span>
        
        {currentStock > 0 ? (
          <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase px-2 py-1 rounded">In Stock ({currentStock})</span>
        ) : (
          <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase px-2 py-1 rounded">Out of Stock</span>
        )}
      </div>

      {options.length > 0 && (
        <div className="space-y-4 mb-6 pt-4 border-t border-line">
          {options.map(opt => (
            <div key={opt.name}>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-sub mb-2">{opt.name}</h4>
              <div className="flex flex-wrap gap-2">
                {opt.values.map(val => (
                  <button
                    key={val}
                    onClick={() => setSelected(prev => ({ ...prev, [opt.name]: val }))}
                    className={`px-4 py-2 border text-[13px] font-semibold rounded-lg transition-colors ${
                      selected[opt.name] === val 
                        ? 'border-brand bg-brand/5 text-brand ring-1 ring-brand' 
                        : 'border-line text-ink hover:border-gray-300 bg-white'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
        disabled={currentStock <= 0}
        className="w-full bg-brand text-white font-bold text-[14px] py-4 rounded-xl hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-2 shadow-lg shadow-brand/20"
      >
        <ShoppingCart className="w-5 h-5" />
        {currentStock > 0 ? 'Add To Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}
