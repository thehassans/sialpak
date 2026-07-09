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
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/5] bg-[#f8f9fa] rounded-sm mb-4">
        
        {/* Badges - Minimalist Premium */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {discountPercent && (
            <span className="bg-[#0b1221] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
              -{discountPercent}%
            </span>
          )}
          {product.status === 'hot' && (
            <span className="bg-[#d4af37] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
              Best
            </span>
          )}
          {product.status === 'new' && (
            <span className="bg-white text-[#0b1221] border border-[#e2e8f0] text-[10px] font-bold uppercase tracking-widest px-2 py-1">
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
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:bg-[#0b1221] hover:text-white ${
            wishlisted ? 'text-[#d4af37] opacity-100 translate-y-0' : 'text-[#64748b]'
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
          <button className="w-full bg-white/90 backdrop-blur-sm hover:bg-[#0b1221] hover:text-white text-[#0b1221] text-[12px] font-bold uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors shadow-lg">
            <ShoppingCart className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </Link>

      {/* Product Info - Minimalist */}
      <div className="flex flex-col flex-1 px-1">
        <Link href={`/product/${product.slug}`} className="group-hover:opacity-80 transition-opacity">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-[11px] h-[11px] ${i < Math.floor(product.rating) ? "text-[#d4af37] fill-[#d4af37]" : "text-gray-200"}`} 
                strokeWidth={1}
              />
            ))}
            <span className="text-[11px] text-[#94a3b8] ml-1">({product.reviewsCount})</span>
          </div>

          <h3 className="text-[14px] font-semibold text-[#0b1221] mb-1.5 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-[#0b1221] tracking-wide">
            {fmtCurrency(product.price)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="line-through text-[#94a3b8] text-[12px] font-medium">
              {fmtCurrency(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
