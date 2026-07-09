"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { ProductType } from "./ProductCard";
import { fmtCurrency } from "@/lib/utils";

// Mini Countdown component to match screenshot
function MiniCountdown() {
  return (
    <div className="flex items-center gap-6 mt-6 mb-8 text-[#1b2436]">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-medium tracking-tight">177</span>
        <span className="text-[13px] text-gray-500 font-medium">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-medium tracking-tight">09</span>
        <span className="text-[13px] text-gray-500 font-medium">Hr</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-medium tracking-tight">21</span>
        <span className="text-[13px] text-gray-500 font-medium">Min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-medium tracking-tight">56</span>
        <span className="text-[13px] text-gray-500 font-medium">Sc</span>
      </div>
    </div>
  );
}

export default function PromoBanner({ products = [] }: { products?: ProductType[] }) {
  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-12 relative overflow-hidden bg-bg">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Main Banner Area */}
        <div className="relative bg-gradient-to-br from-[#e0f1ff] to-[#a4d4ff] min-h-[460px] rounded-lg overflow-hidden flex flex-col md:flex-row pb-12">
          
          {/* Decorative Waves */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full" preserveAspectRatio="none">
              <path fill="#ffffff" fillOpacity="0.2" d="M0,128L48,138.7C96,149,192,171,288,176C384,181,480,171,576,144C672,117,768,75,864,85.3C960,96,1056,160,1152,181.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>

          {/* Left Side - Product Cluster */}
          <div className="w-full md:w-[45%] relative min-h-[300px] md:min-h-full flex items-end justify-center pt-8">
            <div className="relative w-[90%] h-[120%] -bottom-4 z-10">
              <Image 
                src="/uploads/banner_skincare_1783568776197.png" 
                alt="Skincare Bundle" 
                fill 
                className="object-contain object-bottom drop-shadow-2xl" 
                priority
              />
            </div>
          </div>

          {/* Right Side - Text and CTA */}
          <div className="w-full md:w-[55%] relative z-20 flex flex-col justify-center px-8 md:pl-0 md:pr-16 pt-8 md:pt-0">
            <h2 className="text-[40px] md:text-[46px] font-semibold text-[#2c323f] leading-[1.1] mb-4 tracking-tight">
              Beauty Essentials Sale
            </h2>
            
            <p className="text-[17px] text-[#485363] mb-2 max-w-[500px]">
              Exclusive deals on skincare and personal care up to 20%
            </p>
            
            <MiniCountdown />

            <div>
              <Link href="/#offers" className="inline-flex items-center gap-2 bg-[#1f6fdb] text-white font-medium text-[15px] px-6 py-2.5 rounded hover:bg-[#1856ac] transition-colors shadow-sm">
                Go Shopping 
                <span className="text-[12px] opacity-80">&gt;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Overlapping Cards */}
        {displayProducts.length > 0 && (
          <div className="relative -mt-16 z-30 mx-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-6">
            {displayProducts.map((p, i) => {
              const imageList: string[] = (() => {
                try { return JSON.parse(p.images); } catch { return []; }
              })();
              const primaryImage = imageList[0] || "/placeholder.png";

              return (
                <Link href={`/product/${p.slug}`} key={p.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white rounded-lg p-3 flex gap-3 items-center shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#f0f0f0] transition-all"
                  >
                    <div className="w-[60px] h-[75px] shrink-0 bg-[#f8f9fa] rounded flex items-center justify-center p-1">
                      <Image 
                        src={primaryImage} 
                        alt={p.name} 
                        width={50} 
                        height={65} 
                        className="object-contain h-full mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-semibold text-[#1b2436] truncate mb-1">
                        {p.name}
                      </h4>
                      <div className="flex gap-[1px] mb-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-[10px] h-[10px] ${i < Math.floor(p.rating) ? "text-[#f2b23c] fill-[#f2b23c]" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <div className="text-[14px] font-bold text-[#1f6fdb]">
                        {fmtCurrency(p.price)}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
