"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/search" },
    { name: "Beauty", href: "/category/beauty" },
    { name: "Fashion", href: "/category/fashion" },
    { name: "My Favorites", href: "/wishlist" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden text-black shrink-0 hover:text-[#ff5a1f] transition-colors"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" strokeWidth={1.5} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[85vw] max-w-[400px] bg-white z-[100000] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <img src="/uploads/logo.png" alt="BuySial" className="h-8 w-auto object-contain" />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-black transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {navLinks.map((link, i) => (
              <li 
                key={link.name} 
                className="transform transition-all duration-300"
                style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : '0ms', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(10px)' }}
              >
                <Link 
                  href={link.href} 
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-[#f8f9fa] text-black font-semibold text-[15px] group transition-colors"
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-[#f8f9fa] border-t border-gray-100">
          <Link 
            href="/account" 
            className="block w-full text-center bg-black text-white font-bold py-3 rounded-xl hover:bg-black/80 transition-colors"
          >
            Sign In / Register
          </Link>
        </div>
      </div>
    </>
  );
}
