import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/mock-data";

export default function Footer({ storeName }: { storeName: string }) {
  return (
    <footer className="bg-navy pt-16" id="footer">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-8 pb-14">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="block mb-5">
              <img src="/uploads/logo.png" alt="BuySial" className="h-14 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-[13.5px] leading-relaxed text-[#8b98b8] mb-6">
              Your everyday shopping destination for beauty, fashion, electronics and more — delivered fast, worldwide. Experience the best in online retail.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h5 className="text-white font-extrabold text-[13px] uppercase tracking-wider mb-5">Categories</h5>
            <ul className="space-y-3">
              {FOOTER_LINKS.categories.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-[#a9b6d3] hover:text-brand transition-colors text-[13.5px] font-medium">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h5 className="text-white font-extrabold text-[13px] uppercase tracking-wider mb-5">Useful Links</h5>
            <ul className="space-y-3">
              {FOOTER_LINKS.useful.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-[#a9b6d3] hover:text-brand transition-colors text-[13.5px] font-medium">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h5 className="text-white font-extrabold text-[13px] uppercase tracking-wider mb-5">Support</h5>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-[#a9b6d3] hover:text-brand transition-colors text-[13.5px] font-medium">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h5 className="text-white font-extrabold text-[13px] uppercase tracking-wider mb-5">Newsletter</h5>
            <p className="text-[#a9b6d3] text-[13.5px] mb-4 leading-relaxed">
              Subscribe to our newsletter and get 10% off your first purchase.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-[14px] text-white outline-none focus:border-brand transition-colors"
                required
              />
              <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-md transition-colors text-[14px]">
                Subscribe
              </button>
            </form>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[13px] text-[#8b98b8]">
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white rounded px-2.5 py-1 text-xs font-bold text-navy">Visa</span>
            <span className="bg-white rounded px-2.5 py-1 text-xs font-bold text-navy">MasterCard</span>
            <span className="bg-white rounded px-2.5 py-1 text-xs font-bold text-navy">JazzCash</span>
            <span className="bg-white rounded px-2.5 py-1 text-xs font-bold text-navy">EasyPaisa</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
