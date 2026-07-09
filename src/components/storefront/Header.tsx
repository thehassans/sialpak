import Link from "next/link";
import { Search, Heart, ShoppingCart, ChevronDown, Menu } from "lucide-react";

export default function Header({ storeName, tagline, supportPhone, freeShippingText }: { storeName: string; tagline: string; supportPhone: string; freeShippingText: string; }) {
  return (
    <>
      {/* Top Utility Bar */}
      <div className="hidden md:block bg-navy text-[#c9d4ea] text-[13px]">
        <div className="max-w-[1280px] mx-auto px-6 h-[38px] flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <span>{tagline}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Follow us and get a chance to win 80% off</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-line">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-6 py-4">
          <button className="md:hidden text-ink shrink-0">
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/" className="flex items-center shrink-0">
            <img src="/uploads/logo.png" alt="BuySial" className="h-20 w-auto object-contain" />
          </Link>

          <form action="/search" className="flex-1 hidden md:flex max-w-[640px] border-2 border-brand rounded-full overflow-hidden bg-white h-11 items-center px-2">
            <input name="q" placeholder="Search products..." className="flex-1 border-none px-4 py-2 text-sm outline-none min-w-0" />
            <button className="bg-brand hover:bg-brand-dark text-white rounded-full p-2 transition flex items-center justify-center shrink-0">
              <Search className="w-5 h-5" />
            </button>
          </form>

          <div className="flex items-center gap-6 shrink-0 ml-auto">
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right">
                <span className="text-[12px] text-sub block">24 Support</span>
                <b className="block text-ink text-[14px]">{supportPhone}</b>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right">
                <span className="text-[12px] text-sub block">Worldwide</span>
                <b className="block text-ink text-[14px]">{freeShippingText}</b>
              </div>
            </div>

            <div className="flex items-center gap-4 border-l border-line pl-6">
              <Link href="/wishlist" className="relative text-ink hover:text-brand transition" aria-label="Wishlist">
                <Heart className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-2 text-ink hover:text-brand transition group" aria-label="Cart">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                </div>
                <div className="hidden sm:block text-sm">
                  <span className="text-sub block text-[11px]">Your Cart</span>
                  <span className="font-extrabold group-hover:text-brand transition">PKR 0.00</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-brand-pale border-b border-line hidden md:block">
        <div className="max-w-[1280px] mx-auto px-6 h-[46px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[14px] font-bold text-brand relative pb-[13px] pt-[13px]">
              Home
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brand rounded-t-md"></span>
            </Link>
            <Link href="/#offers" className="text-[14px] font-semibold text-ink hover:text-brand transition">Shop</Link>
            <Link href="/wishlist" className="text-[14px] font-semibold text-ink hover:text-brand transition">My Favorites</Link>
            <Link href="/#footer" className="text-[14px] font-semibold text-ink hover:text-brand transition">Contacts</Link>
          </div>
          
          <div className="flex items-center gap-2 cursor-pointer hover:bg-white/50 px-2 py-1 rounded transition">
            <span className="text-[13px] font-bold text-ink">PKR</span>
            <ChevronDown className="w-4 h-4 text-sub" />
          </div>
        </div>
      </nav>
    </>
  );
}
