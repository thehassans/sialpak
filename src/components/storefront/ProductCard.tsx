'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { fmtCurrency } from '@/lib/utils';
import { Star } from "lucide-react";

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  images: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  status: string;
}

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  const imageList: string[] = (() => {
    try {
      return JSON.parse(product.images);
    } catch {
      return [];
    }
  })();
  const primaryImage = imageList[0] || '/placeholder.png';
  const secondaryImage = imageList[1] || primaryImage;

  const discountPercent =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : null;

  return (
    <div className="group flex flex-col relative h-full">
      {/* Product Image Area */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/5] bg-[#ffebd5] rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
        
        {/* Badges - Premium Theme */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {discountPercent && (
            <span className="bg-[#ff5a1f] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 border-2 border-black">
              -{discountPercent}%
            </span>
          )}
          {product.status === 'hot' && (
            <span className="bg-[#3b2e2a] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 border-2 border-black">
              Best
            </span>
          )}
          {product.status === 'new' && (
            <span className="bg-[#fee5c9] text-black border-2 border-black text-[10px] font-black uppercase tracking-widest px-2 py-1">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-[#fee5c9] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:bg-[#ff5a1f] hover:text-white ${
            wishlisted ? 'text-[#ff5a1f] opacity-100 translate-y-0' : 'text-black/60'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} strokeWidth={wishlisted ? 2 : 1.5} />
        </button>

        {/* Images with hover reveal */}
        <div className="w-full h-full relative mix-blend-multiply p-4">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={secondaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 z-10">
          <button className="w-full bg-[#3b2e2a] hover:bg-[#ff5a1f] border-2 border-black text-white text-[13px] font-black uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 rounded-xl">
            <ShoppingCart className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </Link>

      {/* Product Info - Premium Theme */}
      <div className="flex flex-col flex-1 px-1">
        <Link href={`/product/${product.slug}`} className="group-hover:opacity-80 transition-opacity">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-[13px] h-[13px] ${i < Math.floor(product.rating) ? "text-[#ff5a1f] fill-[#ff5a1f]" : "text-black/10"}`} 
                strokeWidth={1}
              />
            ))}
            <span className="text-[12px] font-bold text-black/60 ml-1">({product.reviewsCount})</span>
          </div>

          <h3 className="text-[16px] font-black text-black mb-1.5 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-[17px] font-black text-[#ff5a1f] tracking-wide">
            {fmtCurrency(product.price)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="line-through text-black/40 text-[13px] font-bold">
              {fmtCurrency(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
