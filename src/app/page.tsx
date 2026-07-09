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

  const [banners, categories, allProducts, rawSettings, articles] = await Promise.all([
    prisma.banner.findMany({ where: { isActive: true, position: "hero" }, orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } }),
    prisma.product.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        collections: { include: { collection: true } }
      }
    }),
    prisma.setting.findMany({ where: { key: { in: ['heading_best_offers', 'heading_new_goods', 'heading_categories', 'marquee_text', 'marquee_speed'] } } }),
    prisma.article.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 })
  ]);

  const settingsMap = rawSettings.reduce((acc, s) => { acc[s.key] = s.value; return acc; }, {} as Record<string, string>);


  // Group products by collection
  const bestOffers = allProducts.filter(p =>
    p.collections.some(c => c.collection.slug === "best-offers")
  );
  const newGoods = allProducts.filter(p =>
    p.collections.some(c => c.collection.slug === "new-goods")
  );
  const displayBestOffers = bestOffers.length > 0 ? bestOffers : allProducts.slice(0, 5);
  const displayRecentlyViewed = allProducts.slice(0, 8);

  const heroBanners = banners.filter(b => b.position === "hero");
  const promoBanners = banners.filter(b => b.position === "promo");
  const stripBanners = banners.filter(b => b.position === "strip");

  return (
    <>
      <Header
        storeName={general.storeName}
        tagline={general.tagline}
        supportPhone={general.supportPhone}
        freeShippingText={general.freeShippingText}
        marqueeText={settingsMap['marquee_text'] || "FOLLOW US AND GET A CHANCE TO WIN 80% OFF"}
        marqueeSpeed={Number(settingsMap['marquee_speed']) || 20}
      />
      <main className="bg-bg">
        <HeroBanners banners={heroBanners as any} />
        <CategoryGrid categories={categories as any} title={settingsMap['heading_categories']} />
        <ProductGrid title={settingsMap['heading_best_offers'] || "The Best Offers"} products={displayBestOffers as any} viewAllHref="/search" accentColor="#1f6fdb" />
        
        {newGoods.length > 0 && (
          <ProductGrid title={settingsMap['heading_new_goods'] || "New Goods"} products={newGoods as any} viewAllHref="/search" accentColor="#2fa84f" />
        )}
        
        {promoBanners.map((banner, i) => {
          const bannerProducts = banner.collection ? banner.collection.products.map((p: any) => p.product) : [];
          return <PromoBanner key={banner.id} banner={banner} products={bannerProducts as any} />;
        })}
        
        <ProductGrid title="Home Appliance" products={allProducts.slice(0, 5) as any} accentColor="#f5921f" />
        
        {stripBanners.map((banner, i) => {
          const bannerProducts = banner.collection ? banner.collection.products.map((p: any) => p.product) : allProducts.slice(0, 4);
          return <PremiumCollection key={banner.id} banner={banner} products={bannerProducts as any} />;
        })}
        
        <RecentlyViewed products={displayRecentlyViewed as any} />
        <Articles articles={articles.map(a => ({ ...a, date: a.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })) as any} />
        <TrustBadges />
      </main>
      <Footer storeName={general.storeName} />
    </>
  );
}
