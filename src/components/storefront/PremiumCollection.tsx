"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fmtCurrency } from "@/lib/utils";
import type { ProductType } from "@/lib/types";

export default function PremiumCollection({ banner, products = [] }: { banner: any, products?: ProductType[] }) {
  if (!banner) return null;
  const displayProducts = products.slice(0, 3);
  const featuredProduct = displayProducts[0];
  const subProducts = displayProducts.slice(1, 3);

  const getPrimaryImage = (p: ProductType) => {
    try { return JSON.parse(p.images)[0] || "/placeholder.png"; } 
    catch { return "/placeholder.png"; }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-block text-[#a1a1aa] text-[10px] font-semibold uppercase tracking-[0.3em] mb-4">
            The Edit
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-6">
            Premium Curations
          </h2>
          <div className="w-12 h-[1px] bg-black"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Large Editorial Image */}
          <div className="relative aspect-[4/5] bg-[#f4f4f5] overflow-hidden group">
            <Image 
              src={banner.image || "/placeholder.png"} 
              alt={banner.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-10 md:p-16">
              <h3 className="text-white text-4xl md:text-5xl font-medium tracking-tight mb-4">
                {banner.title}
              </h3>
              {banner.subtitle && (
                <p className="text-white/90 text-sm tracking-wide mb-8 max-w-md font-light">
                  {banner.subtitle}
                </p>
              )}
              <Link href={banner.link || "/search"} className="inline-flex items-center gap-4 text-white text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                {banner.buttonText} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column - Product List */}
          <div className="flex flex-col gap-12">
            
            {/* Featured Product */}
            {featuredProduct && (
              <div className="flex flex-col md:flex-row gap-8 items-center group">
                <Link href={`/product/${featuredProduct.slug}`} className="relative w-full md:w-1/2 aspect-square bg-[#fafafa] overflow-hidden">
                  <Image 
                    src={getPrimaryImage(featuredProduct)} 
                    alt={featuredProduct.name} 
                    fill 
                    className="object-contain mix-blend-multiply p-8 group-hover:scale-105 transition-transform duration-700" 
                  />
                </Link>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[#a1a1aa] text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">Featured</span>
                  <Link href={`/product/${featuredProduct.slug}`} className="hover:opacity-60 transition-opacity">
                    <h4 className="text-2xl font-light text-black mb-3 leading-snug">{featuredProduct.name}</h4>
                  </Link>
                  <p className="text-sm text-[#71717a] font-light mb-6">{fmtCurrency(featuredProduct.price)}</p>
                  <Link href={`/product/${featuredProduct.slug}`} className="inline-flex items-center gap-3 text-black text-[11px] font-semibold uppercase tracking-[0.1em] border-b border-black pb-1 hover:text-[#52525b] hover:border-[#52525b] transition-colors self-start">
                    Shop Now
                  </Link>
                </div>
              </div>
            )}

            <div className="h-[1px] w-full bg-[#f4f4f5]"></div>

            {/* Sub Products Grid */}
            <div className="grid grid-cols-2 gap-8">
              {subProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="flex flex-col group">
                  <div className="relative aspect-square bg-[#fafafa] overflow-hidden mb-4">
                    <Image 
                      src={getPrimaryImage(p)} 
                      alt={p.name} 
                      fill 
                      className="object-contain mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <h5 className="text-[13px] font-medium text-black mb-1 group-hover:opacity-60 transition-opacity line-clamp-1">{p.name}</h5>
                  <p className="text-[12px] text-[#71717a] font-light">{fmtCurrency(p.price)}</p>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
