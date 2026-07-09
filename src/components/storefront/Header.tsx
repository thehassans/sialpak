import Link from "next/link";
import { Search, Heart, ShoppingCart, ChevronDown, Menu } from "lucide-react";

export default function Header({ 
  storeName, tagline, supportPhone, freeShippingText, marqueeText = "Follow us and get a chance to win 80% off", marqueeSpeed = 20
}: { 
  storeName: string; tagline: string; supportPhone: string; freeShippingText: string; marqueeText?: string; marqueeSpeed?: number;
}) {
  return (
    <>
      {/* Top Utility Bar - Ultra Premium Dark */}
      <div className="hidden md:block bg-[#0b1221] text-[#94a3b8] text-[12px] uppercase tracking-widest font-medium overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 h-[40px] flex items-center justify-between relative">
          <div className="flex gap-4 items-center z-10 bg-[#0b1221] pr-4">
            <span>{tagline}</span>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div 
              className="text-[#d4af37] whitespace-nowrap inline-block animate-marquee"
              style={{ animationDuration: `${marqueeSpeed}s` }}
            >
              <span className="mr-12">{marqueeText}</span>
              <span className="mr-12">{marqueeText}</span>
              <span className="mr-12">{marqueeText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-[#f0f0f0] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-8 py-5">
          <button className="md:hidden text-[#0b1221] shrink-0 hover:text-[#d4af37] transition-colors">
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
          
          <Link href="/" className="flex items-center shrink-0">
            <img src="/uploads/logo.png" alt="BuySial" className="h-16 w-auto object-contain" />
          </Link>

          {/* Minimalist Search Bar */}
          <form action="/search" className="flex-1 hidden md:flex max-w-[500px] border border-[#e2e8f0] rounded-full overflow-hidden bg-[#f8fafc] h-12 items-center px-4 transition-all focus-within:border-[#0b1221] focus-within:bg-white focus-within:shadow-sm mx-auto">
            <Search className="w-4 h-4 text-[#94a3b8]" strokeWidth={2} />
            <input name="q" placeholder="Search for premium products..." className="flex-1 bg-transparent border-none px-3 py-2 text-[14px] text-[#0b1221] placeholder:text-[#94a3b8] outline-none min-w-0" />
          </form>

          <div className="flex items-center gap-8 shrink-0 ml-auto">
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-[#64748b] uppercase tracking-widest block mb-0.5">24/7 Support</span>
                <b className="block text-[#0b1221] text-[14px] font-semibold tracking-wide">{supportPhone}</b>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/wishlist" className="relative text-[#0b1221] hover:text-[#d4af37] transition-colors" aria-label="Wishlist">
                <Heart className="w-6 h-6" strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-2 bg-[#d4af37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">0</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-3 text-[#0b1221] group" aria-label="Cart">
                <div className="relative group-hover:text-[#d4af37] transition-colors">
                  <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-2 bg-[#d4af37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">0</span>
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-[#64748b] block text-[11px] uppercase tracking-widest mb-0.5">Cart</span>
                  <span className="font-bold text-[14px] group-hover:text-[#d4af37] transition-colors tracking-wide">PKR 0.00</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Clean & Minimal */}
        <nav className="hidden md:block border-t border-[#f8fafc]">
          <div className="max-w-[1280px] mx-auto px-6 h-[50px] flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Link href="/" className="text-[13px] font-bold text-[#0b1221] uppercase tracking-widest relative py-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d4af37]">
                Home
              </Link>
              <Link href="/search" className="text-[13px] font-medium text-[#64748b] uppercase tracking-widest hover:text-[#0b1221] transition-colors py-4">Shop</Link>
              <Link href="/wishlist" className="text-[13px] font-medium text-[#64748b] uppercase tracking-widest hover:text-[#0b1221] transition-colors py-4">My Favorites</Link>
              <Link href="/contact" className="text-[13px] font-medium text-[#64748b] uppercase tracking-widest hover:text-[#0b1221] transition-colors py-4">Contacts</Link>
            </div>
            
            <div className="flex items-center gap-2 cursor-pointer text-[#64748b] hover:text-[#0b1221] transition-colors">
              <span className="text-[12px] font-semibold uppercase tracking-widest">PKR</span>
              <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
