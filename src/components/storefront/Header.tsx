import Link from "next/link";

export default function Header({ storeName, tagline, supportPhone, freeShippingText }: { storeName: string; tagline: string; supportPhone: string; freeShippingText: string; }) {
  return (
    <>
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
      <header className="bg-white border-b border-line">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-6 py-4">
          <Link href="/" className="flex items-center shrink-0">
            <img src="/uploads/logo.png" alt="BuySial" className="h-10 w-auto object-contain" />
          </Link>
          <form action="/search" className="flex-1 hidden md:flex max-w-[640px] border border-line rounded-md overflow-hidden bg-white">
            <input name="q" placeholder="Search products..." className="flex-1 border-none px-4 py-3 text-sm outline-none min-w-0" />
            <button className="bg-brand hover:bg-brand-dark px-5 text-white transition">Search</button>
          </form>
          <div className="flex items-center gap-5 shrink-0 ml-auto">
            <div className="hidden lg:flex items-center gap-2.5 text-[13px] text-sub">
              <div>
                <span>24 Support</span>
                <b className="block text-ink text-sm">{supportPhone}</b>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2.5 text-[13px] text-sub">
              <div>
                <span>Worldwide</span>
                <b className="block text-ink text-sm">{freeShippingText}</b>
              </div>
            </div>
            <Link href="/cart" className="font-bold text-sm text-ink">Cart (0)</Link>
          </div>
        </div>
      </header>
      <nav className="bg-brand-pale border-b border-line">
        <div className="max-w-[1280px] mx-auto px-6 h-12 flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold hover:text-brand">Home</Link>
          <Link href="/#offers" className="text-sm font-semibold hover:text-brand">Shop</Link>
          <Link href="/#articles" className="text-sm font-semibold hover:text-brand">Blog</Link>
          <Link href="/#footer" className="text-sm font-semibold hover:text-brand">Delivery &amp; Return</Link>
          <Link href="/#footer" className="text-sm font-semibold hover:text-brand">Our Contacts</Link>
        </div>
      </nav>
    </>
  );
}
