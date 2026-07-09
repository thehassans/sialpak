"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BannerType } from "@/lib/types";

export default function HeroBanners({ banners }: { banners: BannerType[] }) {
  if (banners.length === 0) return null;

  return (
    <section className="pt-6 pb-2">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 mb-4">
          {banners.slice(0, 2).map((b, index) => {
            const isLarge = index === 0;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Link
                  href={b.link || "#"}
                  className="rounded-2xl overflow-hidden relative min-h-[220px] md:min-h-[340px] flex items-center p-8 md:p-12 block group"
                  style={{ background: `linear-gradient(135deg, ${b.bgColorFrom}, ${b.bgColorTo})`, color: b.textColor }}
                >
                  <div className={`relative z-10 ${isLarge ? "max-w-[340px]" : "max-w-[220px]"}`}>
                    {b.eyebrow && <p className="text-[12px] font-bold tracking-widest opacity-90 mb-3 uppercase">{b.eyebrow}</p>}
                    <h3 className={`${isLarge ? "text-3xl md:text-[42px]" : "text-2xl md:text-[28px]"} leading-[1.1] font-extrabold mb-4`}>
                      {b.title}
                    </h3>
                    {b.subtitle && <p className="opacity-80 text-[14px] md:text-[15px] leading-relaxed mb-6">{b.subtitle}</p>}
                    <span className="sf-btn-primary group-hover:scale-105 shadow-md group-hover:shadow-lg transition-transform">
                      {b.buttonText}
                    </span>
                  </div>
                  <div className="absolute right-0 top-0 h-full w-[50%] md:w-[45%]">
                     <Image 
                       src={b.image} 
                       alt={b.title} 
                       fill 
                       className="object-cover hidden sm:block transition-transform duration-700 group-hover:scale-105" 
                       style={{ 
                         maskImage: 'linear-gradient(to right, transparent, black 25%)', 
                         WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)' 
                       }} 
                       sizes="(max-width: 768px) 100vw, 50vw"
                     />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        {/* Slider indicators */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <div className="w-8 h-2 bg-brand rounded-full"></div>
          <div className="w-2 h-2 bg-line rounded-full cursor-pointer hover:bg-sub transition"></div>
          <div className="w-2 h-2 bg-line rounded-full cursor-pointer hover:bg-sub transition"></div>
        </div>
      </div>
    </section>
  );
}
