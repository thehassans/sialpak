import { prisma } from "@/lib/prisma";
import { getSetting, DEFAULT_SETTINGS } from "@/lib/settings";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fmtCurrency } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!p) return {};
  return {
    title: p.seoTitle || p.name,
    description: p.seoDescription || p.description?.slice(0, 155)
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const general = await getSetting("general", DEFAULT_SETTINGS.general);
  const p = await prisma.product.findUnique({ where: { slug: params.slug }, include: { category: true } });
  if (!p) return notFound();
  const images: string[] = JSON.parse(p.images || "[]");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: images,
    offers: { "@type": "Offer", priceCurrency: general.currency, price: p.price, availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header storeName={general.storeName} tagline={general.tagline} supportPhone={general.supportPhone} freeShippingText={general.freeShippingText} />
      <main className="max-w-[1280px] mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        <div className="relative aspect-square bg-white border border-line rounded-xl overflow-hidden">
          <Image src={images[0] || "https://placehold.co/600x600"} alt={p.name} fill className="object-cover" />
        </div>
        <div>
          {p.category && <div className="text-sub text-sm font-semibold mb-2">{p.category.name}</div>}
          <h1 className="text-3xl font-extrabold mb-3">{p.name}</h1>
          <div className="text-2xl font-extrabold mb-4">
            {p.comparePrice && <span className="line-through text-sub font-medium text-lg mr-2">{fmtCurrency(p.comparePrice, general.currency)}</span>}
            {fmtCurrency(p.price, general.currency)}
          </div>
          <p className="text-sub leading-relaxed mb-6">{p.description}</p>
          <button className="btn-primary">Add To Cart</button>
        </div>
      </main>
      <Footer storeName={general.storeName} />
    </>
  );
}
