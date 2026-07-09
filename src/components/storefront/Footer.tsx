import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function Footer({ storeName }: { storeName: string }) {
  return (
    <footer className="bg-[#0b1221] text-white pt-20 pb-10 relative overflow-hidden" id="footer">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block mb-4">
              {/* If they want an ultra-premium look, a white logo variant is best on a dark bg, but since we only have one logo, we might use a text logo or a stylized variant, or just the regular logo with a white background pill */}
              <div className="bg-white/10 p-3 rounded-xl inline-block backdrop-blur-md border border-white/10">
                <img src="/uploads/logo.png" alt="BuySial" className="h-8 w-auto object-contain brightness-0 invert" />
              </div>
            </Link>
            <p className="text-[#94a3b8] text-[14px] leading-relaxed max-w-sm">
              Elevating your lifestyle with curated, high-quality products. Experience seamless shopping, guaranteed authenticity, and unparalleled customer service.
            </p>
            
            <div className="pt-4">
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-3">Subscribe to our newsletter</h4>
              <div className="flex max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 text-[14px] outline-none focus:border-brand w-full transition-colors placeholder:text-[#64748b]"
                />
                <button className="bg-brand text-white px-5 rounded-r-lg hover:bg-brand-dark transition-colors font-bold text-[14px] flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-5">
              <li>
                <a href="mailto:support@buysial.com" className="group flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                    <Mail className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-[#64748b] mb-1">Email Support</div>
                    <div className="text-[14px] font-medium group-hover:text-brand transition-colors">support@buysial.com</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+923001234567" className="group flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                    <Phone className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-[#64748b] mb-1">Phone (Mon - Sat)</div>
                    <div className="text-[14px] font-medium group-hover:text-brand transition-colors">+92 300 1234567</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-brand" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#64748b] mb-1">Headquarters</div>
                  <div className="text-[14px] font-medium text-[#cbd5e1] leading-relaxed">
                    123 Commerce Avenue<br/>Lahore, Pakistan
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/category/beauty" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">Beauty & Skincare</Link></li>
              <li><Link href="/category/fashion" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">Fashion & Apparel</Link></li>
              <li><Link href="/category/electronics" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="/category/home" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">Home & Living</Link></li>
              <li><Link href="/collections/new" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">Contact Center</Link></li>
              <li><Link href="/faq" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-[14px] text-[#94a3b8] hover:text-white transition-colors">Returns & Refunds</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[#64748b] text-[12px] font-medium">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-[#64748b] hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-[#64748b] hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors">Privacy Policy</Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8] hover:bg-brand hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8] hover:bg-brand hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8] hover:bg-brand hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
