"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ArticleType } from "@/lib/types";

export default function Articles({ articles }: { articles: ArticleType[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="py-12 bg-transparent" id="articles">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-baseline justify-between mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-[24px] font-black text-black uppercase tracking-widest">Our Articles</h2>
          <Link href="/blog" className="text-[13px] font-black text-[#ff5a1f] hover:text-[#3b2e2a] uppercase tracking-widest transition-colors">
            Read All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`} className="block bg-white rounded-3xl border border-gray-200 overflow-hidden group hover:shadow-sm hover:translate-y-[-4px] transition-all h-full flex flex-col">
                <div className="relative aspect-[3/2] overflow-hidden bg-[#f8f9fa] border-b border-gray-200">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover product-image-zoom" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[11px] font-black text-[#ff5a1f] uppercase tracking-wider mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-[18px] md:text-[20px] font-black text-black leading-snug line-clamp-2 mb-3 group-hover:text-[#ff5a1f] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[14px] text-black/70 leading-relaxed line-clamp-3 mb-6 flex-1 font-medium">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                    <span className="text-[12px] text-black/60 font-bold">{article.date}</span>
                    <span className="text-[13px] font-black text-[#ff5a1f] uppercase tracking-widest group-hover:text-[#3b2e2a] transition-colors">Read More →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
