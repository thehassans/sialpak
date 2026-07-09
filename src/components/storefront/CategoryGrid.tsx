"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CategoryType } from "@/lib/types";

export default function CategoryGrid({ categories }: { categories: CategoryType[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="py-10 bg-white" id="categories">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-ink section-accent">Popular Categories</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 md:gap-6">
          {categories.map((c, i) => {
             const imgSrc = c.image || "https://picsum.photos/seed/" + c.slug + "/200/200";
             return (
              <Link href={`/category/${c.slug}`} key={c.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="text-center flex flex-col items-center gap-3 group cursor-pointer"
                >
                  <div className="w-[85px] h-[85px] md:w-[110px] md:h-[110px] rounded-full bg-brand-pale overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center p-2 border-2 border-transparent group-hover:border-brand/20">
                    <Image 
                      src={imgSrc} 
                      alt={c.name} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-full" 
                      sizes="110px"
                    />
                  </div>
                  <div>
                    <span className="block text-[13px] md:text-[14px] font-extrabold text-ink group-hover:text-brand transition-colors line-clamp-1">{c.name}</span>
                    {c._count && <span className="block text-[11.5px] text-sub mt-0.5">{c._count.products} items</span>}
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
