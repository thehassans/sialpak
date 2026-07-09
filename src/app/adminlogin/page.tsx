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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0a0a0a]">
      {/* Ultra Premium Abstract Mesh Gradient Background */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#1b2a47] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#0a1128] blur-[150px]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#1e2a38] blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[440px] z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
            <img src="/uploads/logo.png" alt="BuySial Logo" className="h-10 w-auto object-contain brightness-0 invert opacity-90" />
          </div>
          <h1 className="text-2xl font-light text-white tracking-[0.2em] uppercase">Control Panel</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-10">
          <h2 className="text-xl font-medium text-white mb-2">Welcome back</h2>
          <p className="text-[#8e9bb0] text-[13px] mb-8 font-light">Sign in to manage your premium storefront.</p>

          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-lg px-4 py-3 mb-6">{error}</div>}

          <div className="mb-5">
            <label className="block text-[11px] uppercase tracking-widest text-[#8e9bb0] font-semibold mb-2">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20" 
              placeholder="admin@buysial.com" 
            />
          </div>

          <div className="mb-8">
            <label className="block text-[11px] uppercase tracking-widest text-[#8e9bb0] font-semibold mb-2">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20" 
              placeholder="••••••••" 
            />
          </div>

          <button disabled={loading} className="w-full bg-white text-black font-bold text-[13px] uppercase tracking-widest py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
