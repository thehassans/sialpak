"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cx } from "@/lib/utils";
import { 
  LayoutDashboard, 
  LineChart,
  ShoppingBag, 
  Package, 
  Tags, 
  ImageIcon, 
  Search, 
  FileText, 
  CreditCard, 
  Star, 
  Truck, 
  Settings, 
  Store, 
  Mail,
  LogOut
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/analytics", label: "Analytics", icon: <LineChart size={18} /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingBag size={18} /> },
  { href: "/admin/products", label: "Products", icon: <Package size={18} /> },
  { href: "/admin/categories", label: "Categories", icon: <Tags size={18} /> },
  { href: "/admin/banners", label: "Banners", icon: <ImageIcon size={18} /> },
  { href: "/admin/seo", label: "SEO & Pixels", icon: <Search size={18} /> },
  { href: "/admin/articles", label: "Articles", icon: <FileText size={18} /> },
  { href: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
  { href: "/admin/reviews", label: "Reviews", icon: <Star size={18} /> },
  { href: "/admin/logistics", label: "Logistics", icon: <Truck size={18} /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
  { href: "/admin/settings/storefront", label: "Storefront UI", icon: <Store size={18} /> },
  { href: "/admin/settings/email", label: "Email (Brevo)", icon: <Mail size={18} /> }
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
              <div className="w-[18px] h-[18px] shrink-0">{item.icon}</div>
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
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
