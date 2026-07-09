"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fmtCurrency } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  images: string;
}

export default function RecentlyViewed({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -280 : 280;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (products.length === 0) return null;

  return (
    <section className="py-8" id="recently-viewed">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-extrabold text-ink section-accent">Recently Viewed</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((p, i) => {
            const img = JSON.parse(p.images || "[]")[0] || "https://picsum.photos/seed/rv" + i + "/300/300";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/product/${p.slug}`}
                  className="shrink-0 w-[200px] bg-white border border-line rounded-xl overflow-hidden group hover:shadow-lg2 transition block"
                >
                  <div className="relative aspect-square bg-[#f4f6fa] overflow-hidden">
                    <Image
                      src={img}
                      alt={p.name}
                      fill
                      className="object-cover product-image-zoom"
                      sizes="200px"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[12.5px] font-semibold text-ink line-clamp-1">{p.name}</p>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-[14px] font-extrabold text-ink">{fmtCurrency(p.price, "PKR")}</span>
                      {p.comparePrice && (
                        <span className="text-[11px] text-sub line-through">{fmtCurrency(p.comparePrice, "PKR")}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
