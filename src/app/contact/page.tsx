export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg py-20 px-6">
      <div className="max-w-[800px] mx-auto bg-white p-12 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold text-ink mb-6">Contact Us</h1>
        <p className="text-sub leading-relaxed mb-8">
          We would love to hear from you. Please send us a message below or email us directly at support@buysial.com.
        </p>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="border border-line rounded p-3" />
          <input type="email" placeholder="Your Email" className="border border-line rounded p-3" />
          <textarea placeholder="Message" rows={5} className="border border-line rounded p-3"></textarea>
          <button className="bg-[#0b1221] text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest self-start">Send Message</button>
        </form>
      </div>
    </div>
  );
}
