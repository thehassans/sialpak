"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    setLoading(false);
    if (res.ok) {
      router.push(params.get("next") || "/admin/dashboard");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Invalid email or password");
    }
  }

  return (
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#f8f9fa]">
      {/* Light Premium Image Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-70"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600164318721-a39cce6d2890?auto=format&fit=crop&q=80")' }}
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      <div className="relative w-full max-w-[440px] z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white/70 backdrop-blur-xl border border-white rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <img src="/uploads/logo.png" alt="BuySial Logo" className="h-10 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-light text-[#0b1221] tracking-[0.2em] uppercase">Control Panel</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-2xl border border-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-10">
          <h2 className="text-xl font-bold text-[#0b1221] mb-2">Welcome back</h2>
          <p className="text-[#64748b] text-[13px] mb-8 font-medium">Sign in to manage your premium storefront.</p>

          {error && <div className="bg-red-50 border border-red-100 text-red-500 text-[13px] rounded-lg px-4 py-3 mb-6 font-medium">{error}</div>}

          <div className="mb-5">
            <label className="block text-[11px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 text-[#0b1221] text-[14px] outline-none focus:border-[#d4af37] focus:bg-white transition-all placeholder:text-gray-400 shadow-sm" 
              placeholder="admin@buysial.com" 
            />
          </div>

          <div className="mb-8">
            <label className="block text-[11px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 text-[#0b1221] text-[14px] outline-none focus:border-[#d4af37] focus:bg-white transition-all placeholder:text-gray-400 shadow-sm" 
              placeholder="••••••••" 
            />
          </div>

          <button disabled={loading} className="w-full bg-[#0b1221] text-white font-bold text-[13px] uppercase tracking-widest py-4 rounded-xl hover:bg-[#d4af37] transition-colors shadow-lg">
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
