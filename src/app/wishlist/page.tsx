export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-bg py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-4xl font-bold text-ink mb-6">My Favorites</h1>
        <div className="bg-white p-12 rounded-xl shadow-sm text-center">
          <p className="text-sub leading-relaxed mb-4">
            Your wishlist is currently empty.
          </p>
          <a href="/search" className="inline-block bg-[#0b1221] text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest mt-4">Browse Products</a>
        </div>
      </div>
    </div>
  );
}
