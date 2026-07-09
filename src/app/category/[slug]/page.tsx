import { prisma } from "@/lib/prisma";
import { getSetting, DEFAULT_SETTINGS } from "@/lib/settings";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import ProductGrid from "@/components/storefront/ProductGrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!cat) return {};
  return { title: cat.name, description: cat.description || undefined };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const general = await getSetting("general", DEFAULT_SETTINGS.general);
  const cat = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!cat) return notFound();
  const products = await prisma.product.findMany({ where: { categoryId: cat.id, status: "active" }, orderBy: { createdAt: "desc" } });

  return (
    <>
      <Header storeName={general.storeName} tagline={general.tagline} supportPhone={general.supportPhone} freeShippingText={general.freeShippingText} />
      <main>
        <ProductGrid title={cat.name} products={products as any} />
      </main>
      <Footer storeName={general.storeName} />
    </>
  );
}
