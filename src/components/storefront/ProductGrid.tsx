'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard, { ProductType } from './ProductCard';

interface ProductGridProps {
  title: string;
  products: ProductType[];
  viewAllHref?: string;
  accentColor?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function ProductGrid({
  title,
  products,
  viewAllHref,
  accentColor,
}: ProductGridProps) {
  return (
    <section className="py-8">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Title Row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-extrabold text-ink">{title}</h2>
            {accentColor && (
              <div
                className="h-1 w-10 rounded mt-1.5"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </div>

          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              More Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
