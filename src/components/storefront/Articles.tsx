"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ArticleType } from "@/lib/types";

export default function Articles({ articles }: { articles: ArticleType[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="py-12 bg-bg" id="articles">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-ink section-accent">Our Articles</h2>
          <Link href="/blog" className="text-[13.5px] font-bold text-brand hover:underline">
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
              <Link href={`/blog/${article.slug}`} className="block bg-white rounded-xl border border-line overflow-hidden group hover:shadow-lg2 transition-shadow h-full flex flex-col">
                <div className="relative aspect-[3/2] overflow-hidden bg-[#f4f6fa]">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover product-image-zoom" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[11px] font-bold text-brand uppercase tracking-wider mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-[16px] md:text-[18px] font-bold text-ink leading-snug line-clamp-2 mb-3 group-hover:text-brand transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[13.5px] text-sub leading-relaxed line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-line">
                    <span className="text-[12px] text-sub font-medium">{article.date}</span>
                    <span className="text-[13px] font-bold text-brand group-hover:underline">Read More →</span>
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
