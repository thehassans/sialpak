"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cx } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
  { href: "/admin/orders", label: "Orders", icon: "M4 4h16v4H4zM4 10h16v10H4z" },
  { href: "/admin/products", label: "Products", icon: "M21 8L12 3 3 8m18 0-9 5m9-5v9l-9 5m0-9L3 8m9 5v9M3 8v9l9 5" },
  { href: "/admin/categories", label: "Categories", icon: "M4 6h16M4 12h16M4 18h16" },
  { href: "/admin/banners", label: "Banners", icon: "M3 5h18v14H3zM3 9h18" },
  { href: "/admin/seo", label: "SEO & Pixels", icon: "M10 21a9 9 0 100-18 9 9 0 000 18zm0 0v-9m0 0L4 6m6 6l6-6" },
  { href: "/admin/articles", label: "Articles", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { href: "/admin/payments", label: "Payments", icon: "M2 7h20v13H2zM2 11h20" },
  { href: "/admin/reviews", label: "Reviews", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { href: "/admin/logistics", label: "Logistics", icon: "M3 16V6h11v10M14 9h4l3 3v4h-7M6 19a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z" },
  { href: "/admin/settings", label: "Settings", icon: "M12 15a3 3 0 100-6 3 3 0 000 6z" },
  { href: "/admin/settings/storefront", label: "Storefront UI", icon: "M4 5h16v14H4z M4 10h16" },
  { href: "/admin/settings/email", label: "Email (Brevo)", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
];

export default function Sidebar({ storeName, userName }: { storeName: string; userName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/adminlogin");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-[#0a0a0a] text-white flex flex-col h-screen sticky top-0 border-r border-white/5">
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 relative">
        <img src="/uploads/logo.png" alt="BuySial Logo" className="h-8 w-auto object-contain brightness-0 invert opacity-90" />
        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/50">Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV.map((item) => {
          const isActive = pathname.startsWith(item.href) && (item.href !== "/admin" || pathname === "/admin");
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200",
                isActive 
                  ? "bg-white text-[#0a0a0a] shadow-sm" 
                  : "text-[#8e9bb0] hover:bg-white/5 hover:text-white"
              )}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={item.icon} /></svg>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/5 space-y-3">
        <div className="px-4 py-3 bg-white/5 rounded-xl">
          <div className="text-[10px] font-bold tracking-wider text-white/40 uppercase mb-1">Store User</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0">{userName.charAt(0).toUpperCase()}</div>
            <div className="text-[13px] font-semibold text-white/90 truncate">{userName}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-semibold text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
