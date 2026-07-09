"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, ShoppingCart } from "lucide-react";
import { fmtCurrency } from "@/lib/utils";
import type { ProductType } from "@/lib/types";

export default function PremiumCollection({ banner, products = [] }: { banner: any, products?: ProductType[] }) {
  if (!banner) return null;
  const displayProducts = products.slice(0, 4);
  const featuredProduct = displayProducts[0];
  const subProducts = displayProducts.slice(1, 4);

  // Helper to parse images
  const getPrimaryImage = (p: ProductType) => {
    try {
      const arr = JSON.parse(p.images);
      return arr[0] || "/placeholder.png";
    } catch {
      return "/placeholder.png";
    }
  };

  return (
    <section className="py-16 bg-white border-t border-[#f0f0f0]">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <span className="inline-block text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.3em] mb-2">
            The Edit
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#0b1221] tracking-tight">
            Premium Curations
          </h2>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
          
          {/* Left Column - Banners & Mini Cards */}
          <div className="flex flex-col gap-6">
            
            {/* Top Main Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#f8f9fa] rounded-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[320px] border border-[#f0f0f0]"
              style={{ backgroundColor: banner.bgColorFrom }}
            >
              <div className="w-full md:w-[45%] relative h-[250px] md:h-full bg-white">
                <Image 
                  src={banner.image || "/placeholder.png"} 
                  alt={banner.title} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="w-full md:w-[55%] p-8 md:p-10 flex flex-col justify-center">
                <h3 className="text-[32px] md:text-[42px] font-bold leading-[1.1] mb-4 tracking-tight" style={{ color: banner.textColor }}>
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <p className="text-[14px] leading-relaxed mb-6 max-w-[300px]" style={{ color: banner.textColor, opacity: 0.9 }}>
                    {banner.subtitle}
                  </p>
                )}
                <Link href={banner.link || "/search"} className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest hover:underline" style={{ color: banner.textColor }}>
                  {banner.buttonText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Bottom Row - 3 Horizontal Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subProducts.map((p, i) => {
                // Determine styling for ultra premium mini-banners
                // 1st: Dark Slate, 2nd: Elegant Cream, 3rd: Gold Accent
                let bgClass = "bg-[#0b1221] text-white";
                let textClass = "text-[#cbd5e1]";
                let titleClass = "text-white";
                let btnClass = "bg-white text-[#0b1221] hover:bg-[#d4af37] hover:text-white";
                
                if (i === 1) {
                  bgClass = "bg-[#f8f9fa] border border-[#f0f0f0]";
                  textClass = "text-[#64748b]";
                  titleClass = "text-[#0b1221]";
                  btnClass = "bg-[#0b1221] text-white hover:bg-[#d4af37]";
                } else if (i === 2) {
                  bgClass = "bg-[#d4af37]";
                  textClass = "text-white/80";
                  titleClass = "text-white";
                  btnClass = "bg-white text-[#d4af37] hover:bg-[#0b1221] hover:text-white";
                }

                return (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-xl overflow-hidden flex flex-row items-center p-5 relative group ${bgClass} shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="flex-1 pr-4 z-10">
                      <h4 className={`text-[15px] font-bold mb-1 line-clamp-2 ${titleClass}`}>
                        {p.name}
                      </h4>
                      <p className={`text-[11px] mb-4 line-clamp-1 ${textClass}`}>
                        Curated Selection
                      </p>
                      <Link href={`/product/${p.slug}`} className={`inline-block text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-colors ${btnClass}`}>
                        View Details
                      </Link>
                    </div>
                    <div className="w-[80px] h-[80px] shrink-0 relative bg-white/50 rounded-lg overflow-hidden flex items-center justify-center p-1 z-10">
                      <Image 
                        src={getPrimaryImage(p)} 
                        alt={p.name} 
                        fill 
                        className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    {/* Subtle decorative background glow for dark/gold cards */}
                    {i !== 1 && (
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Highlighted Product */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#f0f0f0] rounded-xl overflow-hidden flex flex-col group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
          >
            <div className="relative aspect-[3/4] bg-[#f8f9fa] overflow-hidden p-8 flex items-center justify-center">
              {featuredProduct.status === 'new' && (
                <span className="absolute top-4 left-4 bg-[#0b1221] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 z-10 rounded-sm">
                  New Arrival
                </span>
              )}
              <Image 
                src={getPrimaryImage(featuredProduct)} 
                alt={featuredProduct.name} 
                fill 
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain p-8 mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
            
            <div className="p-6 md:p-8 flex flex-col flex-1 bg-white">
              <Link href={`/product/${featuredProduct.slug}`} className="group-hover:opacity-80 transition-opacity mb-auto">
                <h3 className="text-[18px] md:text-[20px] font-bold text-[#0b1221] mb-2 leading-tight">
                  {featuredProduct.name}
                </h3>
                <p className="text-[#64748b] text-[13px] mb-4">
                  Signature Collection
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-[14px] h-[14px] ${i < Math.floor(featuredProduct.rating) ? "text-[#d4af37] fill-[#d4af37]" : "text-[#e2e8f0]"}`} 
                    />
                  ))}
                  <span className="text-[12px] font-medium text-[#0b1221] ml-2">In Stock</span>
                </div>
              </Link>
              
              <div className="mt-6">
                <div className="text-[24px] font-bold text-[#0b1221] mb-4">
                  {fmtCurrency(featuredProduct.price)}
                </div>
                <button className="w-full bg-[#0b1221] text-white hover:bg-[#d4af37] font-bold text-[13px] uppercase tracking-widest py-4 rounded-sm transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Add To Bag
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
