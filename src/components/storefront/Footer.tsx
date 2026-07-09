import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/mock-data";

export default function Footer({ storeName }: { storeName: string }) {
  return (
    <footer className="bg-[#0b1221] py-16 relative overflow-hidden" id="footer">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Minimalist Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
          <Link href="/" className="block">
            <img src="/uploads/logo.png" alt="BuySial" className="h-10 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
          </Link>

          {/* Minimalist Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 md:gap-12">
            <Link href="/category/beauty" className="text-[12px] font-semibold text-[#94a3b8] uppercase tracking-widest hover:text-white transition-colors">Beauty</Link>
            <Link href="/category/fashion" className="text-[12px] font-semibold text-[#94a3b8] uppercase tracking-widest hover:text-white transition-colors">Fashion</Link>
            <Link href="/category/electronics" className="text-[12px] font-semibold text-[#94a3b8] uppercase tracking-widest hover:text-white transition-colors">Electronics</Link>
            <Link href="/about" className="text-[12px] font-semibold text-[#94a3b8] uppercase tracking-widest hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-[12px] font-semibold text-[#94a3b8] uppercase tracking-widest hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Socials / Minimal Icons */}
          <div className="flex items-center gap-6">
             <a href="#" className="text-[#94a3b8] hover:text-white transition-colors text-[12px] font-semibold uppercase tracking-widest">IG</a>
             <a href="#" className="text-[#94a3b8] hover:text-white transition-colors text-[12px] font-semibold uppercase tracking-widest">FB</a>
             <a href="#" className="text-[#94a3b8] hover:text-white transition-colors text-[12px] font-semibold uppercase tracking-widest">X</a>
          </div>
        </div>

        {/* Minimalist Divider */}
        <div className="w-full h-px bg-white/5 mb-8"></div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748b] text-[11px] font-medium tracking-wide uppercase">
            &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-[#64748b] hover:text-white text-[11px] font-medium tracking-wide uppercase transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-[#64748b] hover:text-white text-[11px] font-medium tracking-wide uppercase transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
