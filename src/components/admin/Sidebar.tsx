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
  { href: "/admin/payments", label: "Payments", icon: "M2 7h20v13H2zM2 11h20" },
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
    <aside className="w-64 shrink-0 bg-navy text-white flex flex-col h-screen sticky top-0">
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <img src="/uploads/logo.png" alt="BuySial Logo" className="h-8 w-auto object-contain bg-white/10 p-1 rounded" />
        <span className="text-[10px] font-bold bg-gold text-navy px-1.5 py-0.5 rounded">ADMIN</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin/settings" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition",
                active ? "bg-brand text-white" : "text-[#c9d4ea] hover:bg-white/10 hover:text-white"
              )}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={item.icon} /></svg>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-xs font-bold">{userName?.[0] || "A"}</div>
          <div className="text-xs">
            <div className="font-bold">{userName}</div>
            <Link href="/" target="_blank" className="text-[#c9d4ea] hover:text-white">View store ↗</Link>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full text-center bg-white/10 hover:bg-white/20 rounded-lg py-2 text-xs font-bold transition">
          Log Out
        </button>
      </div>
    </aside>
  );
}
