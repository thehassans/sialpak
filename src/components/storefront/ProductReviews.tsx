"use client";
import { useState } from "react";
import { Star, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductReviews({ 
  productId, 
  reviews, 
  customerSession 
}: { 
  productId: string; 
  reviews: any[];
  customerSession: any;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerSession) return;
    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, title, content })
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTitle("");
      setContent("");
      setRating(5);
      router.refresh();
    }
  }

  return (
    <div className="mt-16 pt-16 border-t border-line">
      <h2 className="text-2xl font-extrabold text-ink mb-10">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Left Side - Form */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-bold text-ink mb-4">Write a Review</h3>
          {customerSession ? (
            success ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-[14px]">
                Thank you for your review! It has been submitted for moderation.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-ink mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setRating(star)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${rating >= star ? 'bg-brand text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-ink mb-2">Review Title</label>
                  <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white border border-line rounded-lg px-4 py-3 outline-none focus:border-brand text-[14px]" placeholder="Summarize your experience" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-ink mb-2">Review Content</label>
                  <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="w-full bg-white border border-line rounded-lg px-4 py-3 outline-none focus:border-brand text-[14px] resize-none" placeholder="Tell us what you liked or disliked" />
                </div>
                <button disabled={loading} className="w-full bg-ink text-white font-bold text-[13px] uppercase tracking-widest py-3.5 rounded-lg hover:bg-brand transition-colors">
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )
          ) : (
            <div className="bg-gray-50 border border-line rounded-xl p-6 text-center">
              <p className="text-sub text-[14px] mb-4">You must be logged in to write a review.</p>
              <a href="/login" className="inline-block bg-brand text-white font-bold text-[13px] uppercase tracking-widest px-6 py-2.5 rounded-lg">Sign In</a>
            </div>
          )}
        </div>

        {/* Right Side - Reviews List */}
        <div className="md:col-span-2 space-y-6">
          {reviews.length === 0 ? (
            <p className="text-sub">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl border border-line p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">
                      {review.customer.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-[14px] text-ink">{review.customer.name}</div>
                      <div className="text-[12px] text-sub">{new Date(review.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${review.rating >= star ? 'text-brand fill-brand' : 'text-gray-200 fill-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <h4 className="font-bold text-[15px] text-ink mb-2">{review.title}</h4>
                <p className="text-sub leading-relaxed text-[14px]">{review.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
