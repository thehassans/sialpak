import Link from "next/link";
import { Search, Heart, ShoppingCart, ChevronDown, User } from "lucide-react";
import { getCustomerSession } from "@/lib/auth";
import LiveSearchBar from "./LiveSearchBar";
import MobileSidebar from "./MobileSidebar";

export default async function Header({ 
  storeName, tagline, supportPhone, freeShippingText, marqueeText = "Follow us and get a chance to win 80% off", marqueeSpeed = 20
}: { 
  storeName: string; tagline: string; supportPhone: string; freeShippingText: string; marqueeText?: string; marqueeSpeed?: number;
}) {
  const session = await getCustomerSession();

  return (
    <>
      {/* Top Utility Bar - Ultra Premium Dark */}
      <div className="hidden md:block bg-[#3b2e2a] text-[#ffebd5] text-[12px] uppercase tracking-widest font-black overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 h-[40px] flex items-center justify-between relative">

          
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div 
              className="text-[#ffebd5] whitespace-nowrap inline-block animate-marquee"
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
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[9999] shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-8 py-5">
          <MobileSidebar supportPhone={supportPhone} />
          
          <Link href="/" className="flex items-center shrink-0">
            <img src="/uploads/logo.png" alt="BuySial" className="h-16 w-auto object-contain" />
          </Link>

          {/* Minimalist Search Bar */}
          <LiveSearchBar />

          <div className="flex items-center gap-8 shrink-0 ml-auto">
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-black/60 font-black uppercase tracking-widest block mb-0.5">24/7 Support</span>
                <b className="block text-black text-[14px] font-black tracking-wide">{supportPhone}</b>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link href={session ? "/account" : "/login"} className="relative text-black hover:text-[#ff5a1f] transition-colors flex items-center gap-2" aria-label="Account">
                <User className="w-6 h-6" strokeWidth={2} />
                <span className="hidden sm:block text-[13px] font-black">{session ? "Account" : "Sign In"}</span>
              </Link>
              <Link href="/wishlist" className="relative text-black hover:text-[#ff5a1f] transition-colors" aria-label="Wishlist">
                <Heart className="w-6 h-6" strokeWidth={2} />
                <span className="absolute -top-1.5 -right-2 bg-[#ff5a1f] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-gray-200">0</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-3 text-black group" aria-label="Cart">
                <div className="relative group-hover:text-[#ff5a1f] transition-colors">
                  <ShoppingCart className="w-6 h-6" strokeWidth={2} />
                  <span className="absolute -top-1.5 -right-2 bg-[#ff5a1f] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-gray-200">0</span>
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-black/60 font-black block text-[11px] uppercase tracking-widest mb-0.5">Cart</span>
                  <span className="font-black text-[14px] group-hover:text-[#ff5a1f] transition-colors tracking-wide">PKR 0.00</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Clean & Minimal */}
        <nav className="hidden md:block border-t border-gray-100 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 h-[50px] flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Link href="/" className="text-[13px] font-bold text-black uppercase tracking-widest relative py-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black">
                Home
              </Link>
              <Link href="/search" className="text-[13px] font-bold text-gray-500 uppercase tracking-widest hover:text-black transition-colors py-4">Shop</Link>
              <Link href="/wishlist" className="text-[13px] font-bold text-gray-500 uppercase tracking-widest hover:text-black transition-colors py-4">My Favorites</Link>
              <Link href="/contact" className="text-[13px] font-bold text-gray-500 uppercase tracking-widest hover:text-black transition-colors py-4">Contacts</Link>
            </div>
            
            <div className="flex items-center gap-2 cursor-pointer text-black/60 hover:text-black transition-colors">
              <span className="text-[12px] font-black uppercase tracking-widest">PKR</span>
              <ChevronDown className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
