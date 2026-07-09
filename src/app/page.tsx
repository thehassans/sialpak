import { prisma } from "@/lib/prisma";
import { getSetting, DEFAULT_SETTINGS } from "@/lib/settings";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import HeroBanners from "@/components/storefront/HeroBanners";
import CategoryGrid from "@/components/storefront/CategoryGrid";
import ProductGrid from "@/components/storefront/ProductGrid";

export const revalidate = 0;

export default async function HomePage() {
  const general = await getSetting("general", DEFAULT_SETTINGS.general);

  const [banners, categories, bestOffers, newGoods, beautySale] = await Promise.all([
    prisma.banner.findMany({ where: { isActive: true, position: "hero" }, orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } }),
    prisma.product.findMany({ where: { status: "active", collections: { some: { collection: { slug: "best-offers" } } } }, take: 5, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ where: { status: "active", collections: { some: { collection: { slug: "new-goods" } } } }, take: 5, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ where: { status: "active", collections: { some: { collection: { slug: "beauty-essentials-sale" } } } }, take: 5, orderBy: { createdAt: "desc" } })
  ]);

  const fallbackProducts = bestOffers.length === 0
    ? await prisma.product.findMany({ where: { status: "active" }, take: 5, orderBy: { createdAt: "desc" } })
    : bestOffers;

  return (
    <>
      <Header storeName={general.storeName} tagline={general.tagline} supportPhone={general.supportPhone} freeShippingText={general.freeShippingText} />
      <main>
        <HeroBanners banners={banners as any} />
        <CategoryGrid categories={categories as any} />
        <ProductGrid title="The Best Offers" products={fallbackProducts as any} />
        {newGoods.length > 0 && <ProductGrid title="New Goods" products={newGoods as any} viewAllHref="/#offers" />}
        {beautySale.length > 0 && <ProductGrid title="Beauty Essentials Sale" products={beautySale as any} />}
      </main>
      <Footer storeName={general.storeName} />
    </>
  );
}
