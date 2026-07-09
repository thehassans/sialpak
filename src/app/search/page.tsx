import { PrismaClient } from "@prisma/client";
import ProductGrid from "@/components/storefront/ProductGrid";

const prisma = new PrismaClient();

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";

  // Perform a simple search on product name and description
  const products = await prisma.product.findMany({
    where: {
      status: "active",
      OR: [
        { name: { contains: query } },
        { description: { contains: query } }
      ]
    },
    take: 40
  });

  return (
    <main className="min-h-screen bg-bg">
      <div className="bg-[#0b1221] py-16 text-center">
        <h1 className="text-white text-3xl font-bold mb-4">
          {query ? `Search Results for "${query}"` : "All Products"}
        </h1>
        <p className="text-[#94a3b8]">Found {products.length} products</p>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {products.length > 0 ? (
          <ProductGrid title={query ? "Search Results" : "Shop All"} products={products as any} />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-ink mb-4">No products found</h2>
            <p className="text-sub">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </main>
  );
}
