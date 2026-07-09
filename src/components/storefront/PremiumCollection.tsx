"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fmtCurrency } from "@/lib/utils";
import type { ProductType } from "@/lib/types";

export default function PremiumCollection({ products }: { products: ProductType[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
          
          {/* Left Promotional Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden relative bg-navy min-h-[400px] flex items-center justify-center p-10 text-center shadow-lg"
          >
            <div className="absolute inset-0 bg-[url('/uploads/banner_skincare_1783568776197.png')] opacity-60 object-cover bg-center mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] font-extrabold tracking-widest uppercase rounded-full mb-6 backdrop-blur-sm">
                Exclusive
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Premium<br/>Collection
              </h2>
              <p className="text-white/80 text-sm mb-8 leading-relaxed">
                Discover our handpicked premium products with exclusive deals and highest quality guaranteed.
              </p>
              <Link href="/#offers" className="sf-btn-white">
                Shop Collection
              </Link>
            </div>
          </motion.div>

          {/* Right Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.slice(0, 4).map((p, i) => {
              const img = JSON.parse(p.images || "[]")[0] || "https://picsum.photos/seed/prem" + i + "/400/400";
              return (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full"
                >
                  <Link href={`/product/${p.slug}`} className="bg-white border border-line rounded-xl overflow-hidden flex flex-col hover:shadow-lg2 transition group h-full block">
                    <div className="relative aspect-[4/5] bg-[#f4f6fa] overflow-hidden">
                      <Image src={img} alt={p.name} fill className="object-cover product-image-zoom" sizes="(max-width: 768px) 50vw, 25vw" />
                      {p.comparePrice && (
                        <span className="absolute top-2.5 left-2.5 bg-danger text-white text-[10.5px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[13.5px] font-bold text-ink leading-snug line-clamp-2 mb-2 group-hover:text-brand transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3 mt-auto">
                        <Star className="w-3.5 h-3.5 fill-star text-star" />
                        <span className="text-[11px] font-bold text-ink">{p.rating.toFixed(1)}</span>
                        <span className="text-[11px] text-sub">({p.reviewsCount})</span>
                      </div>
                      <div className="text-[16px] font-extrabold text-ink mt-auto">
                        {p.comparePrice && <span className="font-medium text-sub line-through text-[12px] mr-1.5">{fmtCurrency(p.comparePrice, "PKR")}</span>}
                        {fmtCurrency(p.price, "PKR")}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
