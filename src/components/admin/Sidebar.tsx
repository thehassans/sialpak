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
  LogOut,
  History,
  UserCircle,
  Ticket,
  Palette
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/analytics", label: "Analytics", icon: <LineChart size={18} /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingBag size={18} /> },
  { href: "/admin/products", label: "Products", icon: <Package size={18} /> },
  { href: "/admin/categories", label: "Categories", icon: <Tags size={18} /> },
  { href: "/admin/banners", label: "Banners", icon: <ImageIcon size={18} /> },
  { href: "/admin/celebrities", label: "Celebrities", icon: <UserCircle size={18} /> },
  { href: "/admin/seo", label: "SEO & Pixels", icon: <Search size={18} /> },
  { href: "/admin/articles", label: "Articles", icon: <FileText size={18} /> },
  { href: "/admin/discounts", label: "Discounts", icon: <Ticket size={18} /> },
  { href: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
  { href: "/admin/recovery", label: "Cart Recovery", icon: <History size={18} /> },
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
    <aside className="w-64 shrink-0 bg-[#fcfcfc] text-[#111827] flex flex-col h-screen sticky top-0 border-r border-gray-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.01)]">
      <div className="flex items-center justify-between px-6 py-8 border-b border-gray-100 relative">
        <img src="/uploads/logo.png" alt="BuySial Logo" className="h-7 w-auto object-contain opacity-90" />
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400">Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {NAV.map((item) => {
          const isActive = pathname.startsWith(item.href) && (item.href !== "/admin" || pathname === "/admin");
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-300",
                isActive 
                  ? "bg-gray-100/80 text-[#0f172a] shadow-sm font-semibold" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className={cx("w-[18px] h-[18px] shrink-0 transition-colors", isActive ? "text-brand" : "text-gray-400")}>{item.icon}</div>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
        <div className="px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">Store User</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs font-bold shrink-0">{userName.charAt(0).toUpperCase()}</div>
            <div className="text-[13px] font-semibold text-gray-800 truncate">{userName}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2">
          <LogOut className="w-4 h-4 shrink-0 text-red-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
