"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StorefrontRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/customer/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    setLoading(false);
    if (res.ok) {
      router.push("/account");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to create account");
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-row-reverse">
      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-[420px]">
          <Link href="/" className="inline-block mb-12">
            <img src="/uploads/logo.png" alt="BuySial" className="h-10 w-auto object-contain" />
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3 leading-tight">Create an account</h1>
          <p className="text-sub text-[14px] mb-8 font-medium">Join BuySial for a premium shopping experience.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="bg-red-50 border border-red-100 text-red-500 text-[13px] rounded-lg px-4 py-3 font-medium">{error}</div>}

            <div>
              <label className="block text-[12px] uppercase tracking-wider text-ink font-bold mb-2">Full Name</label>
              <input required type="text" value={name} onChange={(e) => setName(e.target.value)} 
                className="w-full bg-white border border-line rounded-xl px-4 py-3.5 text-ink text-[14px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all placeholder:text-gray-400" 
                placeholder="John Doe" 
              />
            </div>

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
                minLength={8}
              />
            </div>

            <button disabled={loading} className="w-full bg-brand text-white font-bold text-[14px] py-4 rounded-xl hover:bg-brand/90 transition-all shadow-[0_10px_20px_-10px_rgba(31,111,219,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(31,111,219,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group mt-2">
              {loading ? "Creating..." : (
                <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[14px] text-sub">
            Already have an account? <Link href="/login" className="text-brand font-bold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>

      {/* Left side - Premium Banner */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#0b1221] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2564&auto=format&fit=crop")' }} />
        
        {/* Complex gradients to give it that ultra-premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1221] via-transparent to-brand/20 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] via-[#0b1221]/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-20 z-10">
          <div className="w-16 h-1 bg-brand mb-8 rounded-full"></div>
          <h2 className="text-white text-4xl font-black mb-6 leading-tight tracking-tight">Curated luxury,<br/>delivered to you.</h2>
          <p className="text-[#94a3b8] text-lg max-w-lg leading-relaxed">Discover premium products across beauty, fashion, electronics, and home. Elevate your everyday with BuySial.</p>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-40 left-20 w-64 h-64 bg-brand/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
