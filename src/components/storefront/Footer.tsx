import Link from "next/link";
import { Globe, MessageCircle, Camera, Video } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/mock-data";

export default function Footer({ storeName }: { storeName: string }) {
  return (
    <footer className="bg-[#0b1221] pt-20 relative overflow-hidden" id="footer">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1f6fdb] to-transparent opacity-50"></div>
      <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-[#1f6fdb] opacity-[0.03] blur-3xl pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 pb-16">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 lg:col-span-1 pr-4">
            <Link href="/" className="block mb-6">
              {/* Keeping original logo but removing brightness-0 invert so its natural premium colors shine, unless it's dark text on dark bg. We will add a very subtle glow behind it just in case it has dark text. */}
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-white opacity-20 blur-xl rounded-full"></div>
                <img src="/uploads/logo.png" alt="BuySial" className="h-16 w-auto object-contain relative z-10" />
              </div>
            </Link>
            <p className="text-[14px] leading-relaxed text-[#94a3b8] mb-8 font-light">
              Your everyday shopping destination for beauty, fashion, electronics and more — delivered fast, worldwide. Experience the best in online retail.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded bg-[#1e293b]/50 border border-[#334155]/50 flex items-center justify-center text-white hover:bg-[#1f6fdb] hover:border-[#1f6fdb] transition-all duration-300 shadow-sm"><Globe className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded bg-[#1e293b]/50 border border-[#334155]/50 flex items-center justify-center text-white hover:bg-[#1f6fdb] hover:border-[#1f6fdb] transition-all duration-300 shadow-sm"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded bg-[#1e293b]/50 border border-[#334155]/50 flex items-center justify-center text-white hover:bg-[#1f6fdb] hover:border-[#1f6fdb] transition-all duration-300 shadow-sm"><Camera className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded bg-[#1e293b]/50 border border-[#334155]/50 flex items-center justify-center text-white hover:bg-[#1f6fdb] hover:border-[#1f6fdb] transition-all duration-300 shadow-sm"><Video className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h5 className="text-white font-bold text-[14px] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1f6fdb]"></span>
              Categories
            </h5>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.categories.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-[#94a3b8] hover:text-white transition-colors text-[14px] font-light flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#1f6fdb]">&rsaquo;</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h5 className="text-white font-bold text-[14px] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1f6fdb]"></span>
              Useful Links
            </h5>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.useful.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-[#94a3b8] hover:text-white transition-colors text-[14px] font-light flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#1f6fdb]">&rsaquo;</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h5 className="text-white font-bold text-[14px] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1f6fdb]"></span>
              Support
            </h5>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-[#94a3b8] hover:text-white transition-colors text-[14px] font-light flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#1f6fdb]">&rsaquo;</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h5 className="text-white font-bold text-[14px] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1f6fdb]"></span>
              Newsletter
            </h5>
            <p className="text-[#94a3b8] text-[14px] mb-5 font-light leading-relaxed">
              Subscribe to our newsletter and get <strong className="text-white font-medium">10% off</strong> your first purchase.
            </p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-[#1e293b]/30 border border-[#334155]/50 rounded px-4 py-3.5 text-[14px] text-white outline-none focus:border-[#1f6fdb] transition-colors shadow-inner"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#1f6fdb] to-[#1856ac] hover:from-[#1856ac] hover:to-[#124282] text-white font-semibold py-3.5 rounded transition-all duration-300 text-[14px] shadow-lg shadow-[#1f6fdb]/20">
                Subscribe Now
              </button>
            </form>
          </div>

        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-[#1e293b] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748b] text-[13px] font-light">
            &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-4 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
