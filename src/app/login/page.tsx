"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

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
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sub hover:text-ink transition-colors mb-8 text-[13px] font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <Link href="/" className="inline-block mb-10">
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

      {/* Right side - Premium Banner */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#0b1221] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2564&auto=format&fit=crop")' }} />
        
        {/* Complex gradients to give it that ultra-premium feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1221] via-transparent to-brand/20 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] via-[#0b1221]/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-20 z-10">
          <div className="w-16 h-1 bg-brand mb-8 rounded-full"></div>
          <h2 className="text-white text-4xl font-black mb-6 leading-tight tracking-tight">Elevate your<br/>shopping experience.</h2>
          <p className="text-[#94a3b8] text-lg max-w-lg leading-relaxed">Join BuySial to manage your orders, track shipments, and unlock exclusive VIP access to our curated collections.</p>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
