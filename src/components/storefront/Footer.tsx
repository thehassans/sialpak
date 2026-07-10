import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer({ storeName }: { storeName: string }) {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-black" id="footer">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Top Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Brand & Newsletter (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-8">
                <span className="text-2xl font-bold tracking-tight">{storeName}</span>
              </Link>
              <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-sm mb-12">
                Elevating your lifestyle with curated, high-quality products. Experience seamless shopping and unparalleled customer service.
              </p>
            </div>
            
            <div className="max-w-md">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a1a1aa] mb-4">Newsletter</h4>
              <div className="flex border-b border-[#3f3f46] pb-2 group focus-within:border-white transition-colors">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent border-none outline-none w-full text-[13px] text-white placeholder:text-[#52525b]"
                />
                <button className="text-[#a1a1aa] group-focus-within:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Links (Col 6-12) */}
          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a1a1aa] mb-6">Shop</h4>
              <ul className="space-y-4">
                <li><Link href="/category/beauty" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Beauty</Link></li>
                <li><Link href="/category/fashion" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Fashion</Link></li>
                <li><Link href="/category/electronics" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Electronics</Link></li>
                <li><Link href="/category/home" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Home</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a1a1aa] mb-6">Support</h4>
              <ul className="space-y-4">
                <li><Link href="/contact" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/faqs" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="/shipping-policy" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Shipping</Link></li>
                <li><Link href="/return-policy" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a1a1aa] mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-[13px] text-[#e4e4e7] hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#a1a1aa] text-[11px] tracking-wide">
            &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-[#a1a1aa] hover:text-white text-[11px] uppercase tracking-[0.1em] transition-colors">Terms</Link>
            <Link href="/privacy" className="text-[#a1a1aa] hover:text-white text-[11px] uppercase tracking-[0.1em] transition-colors">Privacy</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
