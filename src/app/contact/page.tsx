import { Mail, Phone, MapPin, Send } from "lucide-react";
import StorefrontLayout from "@/components/ui/StorefrontLayout";

export default function ContactPage() {
  return (
    <StorefrontLayout>
      <div className="min-h-screen bg-[#f8fafc] pb-24">
      {/* Premium Hero */}
      <div className="bg-[#0b1221] pt-32 pb-48 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-[#94a3b8] font-medium tracking-wide text-lg max-w-2xl mx-auto">
            We would love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-black/[0.04] flex items-start gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">Our Location</h3>
                <p className="text-[#475569] leading-relaxed">
                  156-C, SABZAZAR, NEAR LIAQUAT CHOWK<br/>
                  UBL BANK, Lahore Iqbal Town
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-black/[0.04] flex items-start gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">Phone Number</h3>
                <p className="text-[#475569] leading-relaxed mb-1">
                  <a href="tel:+923001234567" className="hover:text-brand transition-colors">+92 300 1234567</a>
                </p>
                <p className="text-sm text-[#94a3b8]">Mon-Sat 9am to 6pm</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-black/[0.04] flex items-start gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">Email Address</h3>
                <p className="text-[#475569] leading-relaxed mb-1">
                  <a href="mailto:support@buysial.com" className="hover:text-brand transition-colors">support@buysial.com</a>
                </p>
                <p className="text-sm text-[#94a3b8]">We reply within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-black/[0.04] h-full">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0f172a]">First Name</label>
                    <input type="text" placeholder="John" className="w-full bg-[#f8fafc] border border-line rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-[#0f172a]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0f172a]">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full bg-[#f8fafc] border border-line rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-[#0f172a]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0f172a]">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-[#f8fafc] border border-line rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-[#0f172a]" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0f172a]">Message</label>
                  <textarea placeholder="How can we help you?" rows={6} className="w-full bg-[#f8fafc] border border-line rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-[#0f172a] resize-none"></textarea>
                </div>

                <button type="button" className="w-full bg-[#0b1221] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-brand transition-colors flex items-center justify-center gap-2 group">
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
    </StorefrontLayout>
  );
}
