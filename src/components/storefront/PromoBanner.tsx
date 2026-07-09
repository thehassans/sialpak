"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

export default function PromoBanner() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-r from-brand to-navy min-h-[380px] flex items-center justify-center py-16 px-6">
          
          {/* Decorative floating elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[5%] top-[10%] md:left-[10%] md:top-[15%] w-32 h-32 md:w-48 md:h-48 hidden sm:block shadow-2xl rounded-full border-4 border-white/20"
          >
            <Image src="/uploads/promo_float1_1783568790973.png" alt="Decoration" fill className="object-cover rounded-full" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[5%] bottom-[10%] md:right-[10%] md:bottom-[15%] w-24 h-24 md:w-40 md:h-40 hidden sm:block shadow-xl rounded-full border-4 border-white/20"
          >
            <Image src="/uploads/promo_float2_1783568798438.png" alt="Decoration" fill className="object-cover rounded-full" />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight"
            >
              Beauty Essentials Sale
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-sm md:text-base mb-8 max-w-lg mx-auto"
            >
              Get a discount on skincare essentials and beauty products up to 25%. Limited time offer!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <CountdownTimer />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/#offers" className="inline-flex bg-white text-brand hover:bg-brand-pale font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105">
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
