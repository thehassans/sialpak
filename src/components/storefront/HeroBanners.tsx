"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BannerType } from "@/lib/types";

export default function HeroBanners({ banners }: { banners: BannerType[] }) {
  if (!banners || banners.length === 0) return null;

  const leftBanner = banners[0];
  const rightBanner = banners.length > 1 ? banners[1] : null;

  return (
    <section className="bg-white pt-6 pb-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[540px]">
          
          {/* Main Hero Banner (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 relative rounded-2xl overflow-hidden group min-h-[400px] lg:min-h-full bg-[#0b1221]"
          >
            <div className="absolute inset-0 w-full h-full z-0">
              <Image 
                src={leftBanner.image || "/placeholder.png"} 
                alt={leftBanner.title} 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80"
                priority
              />
              {/* Premium Dark Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1221] via-[#0b1221]/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221]/90 via-transparent to-transparent md:hidden"></div>
            </div>

            <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center max-w-xl">
              <span className="inline-block text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
                {leftBanner.eyebrow}
              </span>
              <h2 className="text-[38px] md:text-[54px] font-bold text-white leading-[1.1] mb-5 tracking-tight">
                {leftBanner.title}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#cbd5e1] mb-10 font-light leading-relaxed">
                {leftBanner.subtitle}
              </p>
              <div>
                <Link href={leftBanner.link || "/#offers"} className="inline-block bg-white text-[#0b1221] hover:bg-[#d4af37] hover:text-white font-bold text-[13px] uppercase tracking-widest px-10 py-4 rounded-sm transition-all duration-300">
                  {leftBanner.buttonText || "Shop Now"}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Secondary Hero Banner (Right) */}
          {rightBanner && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-4 relative rounded-2xl overflow-hidden group min-h-[300px] lg:min-h-full bg-[#0b1221]"
            >
              <div className="absolute inset-0 w-full h-full z-0">
                <Image 
                  src={rightBanner.image || "/placeholder.png"} 
                  alt={rightBanner.title} 
                  fill 
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-70"
                  priority
                />
                {/* Premium Dark Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] via-[#0b1221]/60 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end text-center items-center">
                <span className="inline-block text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                  {rightBanner.eyebrow}
                </span>
                <h3 className="text-[28px] md:text-[34px] font-bold text-white leading-tight mb-3 tracking-tight">
                  {rightBanner.title}
                </h3>
                <p className="text-[14px] text-[#cbd5e1] mb-8 font-light max-w-[250px] mx-auto">
                  {rightBanner.subtitle}
                </p>
                <Link href={rightBanner.link || "/#offers"} className="inline-block bg-transparent border border-white text-white hover:bg-white hover:text-[#0b1221] font-bold text-[12px] uppercase tracking-widest px-8 py-3 rounded-sm transition-all duration-300">
                  {rightBanner.buttonText || "Discover"}
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
