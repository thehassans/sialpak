"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronRight } from "lucide-react";
import type { ProductType } from "./ProductCard";
import { fmtCurrency } from "@/lib/utils";

// Ultra Premium Mini Countdown
function MiniCountdown() {
  return (
    <div className="flex items-center gap-6 mt-8 mb-10 text-white">
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-light tracking-wider">177</span>
        <span className="text-[11px] text-[#a9b6d3] uppercase tracking-[0.2em] mt-1 font-semibold">Days</span>
      </div>
      <span className="text-2xl font-light text-white/20 -mt-5">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-light tracking-wider">09</span>
        <span className="text-[11px] text-[#a9b6d3] uppercase tracking-[0.2em] mt-1 font-semibold">Hours</span>
      </div>
      <span className="text-2xl font-light text-white/20 -mt-5">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-light tracking-wider">21</span>
        <span className="text-[11px] text-[#a9b6d3] uppercase tracking-[0.2em] mt-1 font-semibold">Mins</span>
      </div>
      <span className="text-2xl font-light text-white/20 -mt-5">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-light tracking-wider">56</span>
        <span className="text-[11px] text-[#a9b6d3] uppercase tracking-[0.2em] mt-1 font-semibold">Secs</span>
      </div>
    </div>
  );
}

export default function PromoBanner({ banner, products = [] }: { banner: any, products?: ProductType[] }) {
  const displayProducts = products.slice(0, 4);

  if (!banner) return null;

  return (
    <section className="py-16 relative overflow-hidden bg-bg">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Main Ultra Premium Banner */}
        <div 
          className="relative min-h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: `linear-gradient(90deg, ${banner.bgColorFrom}, ${banner.bgColorTo})`, color: banner.textColor }}
        >
          
          {/* Background Image spanning the whole banner but fading out towards the right */}
          <div className="absolute inset-0 w-full h-full md:w-[65%] z-0">
            <Image 
              src={banner.image || "/placeholder.png"} 
              alt={banner.title} 
              fill 
              className="object-cover object-center" 
              priority
            />
            {/* Gradient mask to seamlessly blend the image into the dark background on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0b1221]/80 to-[#0b1221]" style={{ background: `linear-gradient(to right, transparent, ${banner.bgColorTo}80, ${banner.bgColorTo})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221]/90 via-transparent to-transparent md:hidden" style={{ background: `linear-gradient(to top, ${banner.bgColorTo}E6, transparent, transparent)` }}></div>
          </div>

          {/* Right Side - Content */}
          <div className="relative z-10 flex flex-col justify-center h-full min-h-[500px] px-8 py-12 md:px-16 w-full md:w-[55%] ml-auto text-left">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-end text-right ml-auto max-w-xl"
            >
              {banner.eyebrow && <span className="uppercase text-[11px] font-bold tracking-[0.3em] text-[#d4af37] mb-4 drop-shadow-md">{banner.eyebrow}</span>}
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight drop-shadow-lg" style={{ color: banner.textColor }}>
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="text-lg md:text-xl font-medium leading-relaxed drop-shadow opacity-90" style={{ color: banner.textColor }}>
                  {banner.subtitle}
                </p>
              )}
              
              <MiniCountdown />

              <div className="mt-8">
                <Link href={banner.link || "/search"} className="group inline-flex items-center gap-3 bg-white text-[#0b1221] font-bold text-[13px] uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-[#d4af37] hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  {banner.buttonText}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Overlapping Cards - Ultra Premium Styling */}
        {displayProducts.length > 0 && (
          <div className="relative -mt-20 z-30 mx-4 md:mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pb-6">
            {displayProducts.map((p, i) => {
              const imageList: string[] = (() => {
                try { return JSON.parse(p.images); } catch { return []; }
              })();
              const primaryImage = imageList[0] || "/placeholder.png";

              return (
                <Link href={`/product/${p.slug}`} key={p.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.2)] border border-[#f0f0f0] transition-all duration-300"
                  >
                    <div className="w-[70px] h-[70px] shrink-0 rounded-lg overflow-hidden relative bg-[#f8f9fa]">
                      <Image 
                        src={primaryImage} 
                        alt={p.name} 
                        fill
                        className="object-cover mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-[13.5px] font-bold text-[#0b1221] truncate mb-1.5">
                        {p.name}
                      </h4>
                      <div className="flex gap-[2px] mb-2">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={`w-[11px] h-[11px] ${idx < Math.floor(p.rating) ? "text-[#d4af37] fill-[#d4af37]" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <div className="text-[14px] font-extrabold text-[#0b1221]">
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
