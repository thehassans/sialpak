"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, X, Package } from "lucide-react";
import { fmtCurrency } from "@/lib/utils";
import type { ProductType } from "@/lib/types";

export default function BannerProductCard({ 
  bannerId, 
  product, 
  isEditMode,
  alignLeft = false
}: { 
  bannerId: string, 
  product?: ProductType | null, 
  isEditMode: boolean,
  alignLeft?: boolean
}) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSelectorOpen || !search) {
      setResults([]);
      return;
    }
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [search, isSelectorOpen]);

  const handleLinkProduct = async (productId: string | null) => {
    try {
      await fetch(`/api/admin/banners/${bannerId}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const getPrimaryImage = (p: ProductType) => {
    try { return JSON.parse(p.images)[0] || "/placeholder.png"; } 
    catch { return "/placeholder.png"; }
  };

  return (
    <div className={`absolute bottom-6 z-40 flex flex-col pointer-events-auto ${alignLeft ? 'left-6 md:left-16 items-start' : 'right-6 md:right-16 items-end'}`}>
      
      {/* Product Card */}
      {product ? (
        <div className="relative group">
          <Link href={`/product/${product.slug}`} onClick={(e) => isEditMode && e.preventDefault()} className="flex items-center gap-4 bg-white/95 backdrop-blur-md p-3 pr-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 border border-white/40 group-hover:border-white/80">
            <div className="w-14 h-14 relative bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
              <Image src={getPrimaryImage(product)} alt={product.name} fill className="object-contain p-1 mix-blend-multiply" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase text-[#ff5a1f] tracking-wider mb-0.5">Featured</span>
              <span className="text-sm font-bold text-gray-900 line-clamp-1 max-w-[160px]">{product.name}</span>
              <span className="text-xs font-semibold text-gray-600 mt-0.5">{fmtCurrency(product.price)}</span>
            </div>
          </Link>
          
          {/* Edit controls */}
          {isEditMode && (
            <div className="absolute -top-3 -right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setIsSelectorOpen(true)} className="bg-blue-500 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors" title="Change Product">
                <Search className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleLinkProduct(null)} className="bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors" title="Remove Product">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        isEditMode && (
          <button 
            onClick={() => setIsSelectorOpen(true)}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg border border-white/30 transition-all"
          >
            <Package className="w-4 h-4" /> Link Product
          </button>
        )
      )}

      {/* Selector Modal */}
      {isEditMode && isSelectorOpen && (
        <div className="absolute bottom-full right-0 mb-4 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden origin-bottom-right animate-in zoom-in-95 duration-200">
          <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Select Product to Link</span>
            <button onClick={() => setIsSelectorOpen(false)} className="text-gray-400 hover:text-gray-800"><X className="w-4 h-4" /></button>
          </div>
          <div className="p-3">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              autoFocus
            />
          </div>
          <div className="max-h-[250px] overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-xs text-gray-400">Searching...</div>
            ) : results.length > 0 ? (
              <div className="flex flex-col">
                {results.map(p => (
                  <button key={p.id} onClick={() => handleLinkProduct(p.id)} className="flex items-center gap-3 p-3 hover:bg-gray-50 text-left border-b border-gray-50 last:border-0 transition-colors">
                    <div className="w-10 h-10 relative bg-white rounded overflow-hidden shrink-0 border border-gray-100">
                      <Image src={getPrimaryImage(p)} alt={p.name} fill className="object-contain p-1 mix-blend-multiply" />
                    </div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <span className="text-xs font-bold text-gray-900 truncate">{p.name}</span>
                      <span className="text-[10px] text-gray-500">{fmtCurrency(p.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : search ? (
              <div className="p-4 text-center text-xs text-gray-400">No products found.</div>
            ) : (
              <div className="p-4 text-center text-xs text-gray-400">Type to search for a product...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
