import { prisma } from "@/lib/prisma";
import { getSetting, DEFAULT_SETTINGS } from "@/lib/settings";
import { MOCK_ARTICLES } from "@/lib/mock-data";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import HeroBanners from "@/components/storefront/HeroBanners";
import CategoryGrid from "@/components/storefront/CategoryGrid";
import ProductGrid from "@/components/storefront/ProductGrid";
import PromoBanner from "@/components/storefront/PromoBanner";
import PremiumCollection from "@/components/storefront/PremiumCollection";
import RecentlyViewed from "@/components/storefront/RecentlyViewed";
import Articles from "@/components/storefront/Articles";
import TrustBadges from "@/components/storefront/TrustBadges";

export const revalidate = 0;

export default async function HomePage() {
  const general = await getSetting("general", DEFAULT_SETTINGS.general);

  const [banners, categories, allProducts] = await Promise.all([
    prisma.banner.findMany({ where: { isActive: true, position: "hero" }, orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } }),
    prisma.product.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        collections: { include: { collection: true } }
      }
    })
  ]);

  // Group products by collection
  const bestOffers = allProducts.filter(p =>
    p.collections.some(c => c.collection.slug === "best-offers")
  );
  const newGoods = allProducts.filter(p =>
    p.collections.some(c => c.collection.slug === "new-goods")
  );
  const beautySale = allProducts.filter(p =>
    p.collections.some(c => c.collection.slug === "beauty-essentials-sale")
  );
  const premiumProducts = allProducts.filter(p =>
    p.collections.some(c => c.collection.slug === "premium-collection")
  );

  // Fallback: if no collection products, show all products
  const displayBestOffers = bestOffers.length > 0 ? bestOffers : allProducts.slice(0, 5);
  const displayRecentlyViewed = allProducts.slice(0, 8);

  return (
    <>
      <Header
        storeName={general.storeName}
        tagline={general.tagline}
        supportPhone={general.supportPhone}
        freeShippingText={general.freeShippingText}
      />
      <main className="bg-bg">
        <HeroBanners banners={banners as any} />
        <CategoryGrid categories={categories as any} />
        <ProductGrid title="The Best Offers" products={displayBestOffers as any} viewAllHref="/#offers" accentColor="#1f6fdb" />
        {newGoods.length > 0 && (
          <ProductGrid title="New Goods" products={newGoods as any} viewAllHref="/#new" accentColor="#2fa84f" />
        )}
        <PromoBanner />
        {beautySale.length > 0 && (
          <ProductGrid title="Beauty Essentials Sale" products={beautySale as any} accentColor="#e0362c" />
        )}
        <ProductGrid title="Home Appliance" products={allProducts.slice(0, 5) as any} accentColor="#f5921f" />
        <PremiumCollection products={(premiumProducts.length > 0 ? premiumProducts : allProducts.slice(0, 4)) as any} />
        <RecentlyViewed products={displayRecentlyViewed as any} />
        <Articles articles={MOCK_ARTICLES} />
        <TrustBadges />
      </main>
      <Footer storeName={general.storeName} />
    </>
  );
}
