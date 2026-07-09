"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CategoryType } from "@/lib/types";

export default function CategoryGrid({ categories }: { categories: CategoryType[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="py-16 bg-[#fafafa]" id="categories">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="inline-block text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">
            Explore Collections
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#0b1221] tracking-tight">
            Popular Categories
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
          {categories.map((c, i) => {
             const imgSrc = c.image || "https://picsum.photos/seed/" + c.slug + "/300/400";
             return (
              <Link href={`/category/${c.slug}`} key={c.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                  className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-[#0b1221] cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all duration-500"
                >
                  {/* Background Image */}
                  <Image 
                    src={imgSrc} 
                    alt={c.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 14vw"
                  />
                  
                  {/* Premium Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221]/90 via-[#0b1221]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Content inside card */}
                  <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-center text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="block text-[13px] md:text-[14px] font-bold text-white tracking-wide mb-1">
                      {c.name}
                    </span>
                    {c._count && (
                      <span className="block text-[10px] text-[#d4af37] font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {c._count.products} items
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
