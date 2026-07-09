"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StorefrontLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/customer/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    setLoading(false);
    if (res.ok) {
      router.push("/account");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-[420px]">
          <Link href="/" className="inline-block mb-12">
            <img src="/uploads/logo.png" alt="BuySial" className="h-10 w-auto object-contain" />
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3 leading-tight">Welcome back</h1>
          <p className="text-sub text-[14px] mb-8 font-medium">Please enter your details to sign in to your account.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-50 border border-red-100 text-red-500 text-[13px] rounded-lg px-4 py-3 font-medium">{error}</div>}

            <div>
              <label className="block text-[12px] uppercase tracking-wider text-ink font-bold mb-2">Email Address</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-white border border-line rounded-xl px-4 py-3.5 text-ink text-[14px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all placeholder:text-gray-400" 
                placeholder="hello@example.com" 
              />
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-wider text-ink font-bold mb-2">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-white border border-line rounded-xl px-4 py-3.5 text-ink text-[14px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all placeholder:text-gray-400" 
                placeholder="••••••••" 
              />
            </div>

            <button disabled={loading} className="w-full bg-brand text-white font-bold text-[14px] py-4 rounded-xl hover:bg-brand/90 transition-all shadow-[0_10px_20px_-10px_rgba(31,111,219,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(31,111,219,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
              {loading ? "Signing in..." : (
                <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[14px] text-sub">
            Don't have an account? <Link href="/register" className="text-brand font-bold hover:underline">Create account</Link>
          </div>
        </div>
      </div>

      {/* Right side - Abstract Banner */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#f4f6fa] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80")' }} />
        <div className="absolute inset-0 bg-brand/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221]/90 to-transparent flex flex-col justify-end p-16">
          <h2 className="text-white text-3xl font-extrabold mb-4 leading-tight">Elevate your<br/>shopping experience.</h2>
          <p className="text-white/80 text-lg max-w-md">Join BuySial to manage your orders, track shipments, and save your details for faster checkout.</p>
        </div>
      </div>
    </div>
  );
}
