'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Rating from './Rating';
import { fmtCurrency } from '@/lib/utils';

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

  const discountPercent =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : null;

  const stockPercent = Math.min(product.stock, 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-xl border border-line overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1">
        {/* Image Area */}
        <div className="aspect-square bg-[#f4f6fa] relative overflow-hidden group">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Discount Badge */}
          {discountPercent && (
            <span className="absolute top-2.5 left-2.5 bg-warn text-white text-[11px] font-bold px-2 py-0.5 rounded-md z-10">
              -{discountPercent}%
            </span>
          )}

          {/* HOT Badge */}
          {product.isFeatured && (
            <span className="absolute top-9 left-2.5 bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10 uppercase tracking-wide">
              HOT
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishlisted(!wishlisted);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-10 group/heart"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted
                  ? 'text-danger fill-danger'
                  : 'text-sub group-hover/heart:text-danger'
              }`}
            />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-3.5 flex flex-col flex-1">
          {/* Rating */}
          <Rating rating={product.rating} count={product.reviewsCount} />

          {/* Product Name */}
          <h3 className="text-[13.5px] font-semibold leading-snug line-clamp-2 text-ink mt-1.5 mb-2">
            {product.name}
          </h3>

          {/* Stock Indicator */}
          <div className="mb-2.5 mt-auto">
            <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-success transition-all duration-500"
                style={{ width: `${stockPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-sub mt-1">
              Available: <span className="font-medium">{product.stock}</span>
            </p>
          </div>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-[16px] font-extrabold text-ink">
              {fmtCurrency(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="line-through text-sub text-[13px]">
                {fmtCurrency(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add To Cart Button */}
      <div className="px-3.5 pb-3.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full bg-brand text-white py-2 rounded-md text-[12.5px] font-bold hover:bg-brand-dark transition-colors duration-200 flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add To Cart
        </button>
      </div>
    </motion.div>
  );
}
