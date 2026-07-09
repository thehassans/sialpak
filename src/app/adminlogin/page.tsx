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
    <div className="min-h-screen bg-navy flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="relative w-full max-w-[420px]">
        <div className="flex items-center justify-center mb-8 bg-white/10 p-4 rounded-xl">
          <img src="/uploads/logo.png" alt="BuySial Logo" className="h-12 w-auto object-contain" />
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-xl font-extrabold text-ink mb-1">Admin Sign In</h1>
          <p className="text-sub text-sm mb-6">Access the BuySial control panel.</p>

          {error && <div className="bg-red-50 text-danger text-sm font-semibold rounded-lg px-3.5 py-2.5 mb-4">{error}</div>}

          <label className="admin-label">Email address</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="admin-input mb-4" placeholder="admin@buysial.com" />

          <label className="admin-label">Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-input mb-6" placeholder="••••••••" />

          <button disabled={loading} className="btn-primary w-full justify-center py-3 text-[14px]">
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-[12px] text-sub mt-5">Protected area. Unauthorized access is prohibited.</p>
        </form>
      </div>
    </div>
  );
}
