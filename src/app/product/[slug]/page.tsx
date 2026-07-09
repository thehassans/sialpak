import { prisma } from "@/lib/prisma";
import { getSetting, DEFAULT_SETTINGS } from "@/lib/settings";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import ProductReviews from "@/components/storefront/ProductReviews";
import VariantSelector from "@/components/storefront/VariantSelector";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fmtCurrency } from "@/lib/utils";
import { getCustomerSession } from "@/lib/auth";
import { Star } from "lucide-react";
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
  const p = await prisma.product.findUnique({ 
    where: { slug: params.slug }, 
    include: { 
      category: true,
      variants: true,
      reviews: {
        where: { status: "published" },
        include: { customer: { select: { name: true } } },
        orderBy: { createdAt: "desc" }
      }
    } 
  });
  if (!p) return notFound();
  
  const images: string[] = JSON.parse(p.images || "[]");
  const session = await getCustomerSession();

  const avgRating = p.reviews.length > 0 
    ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length 
    : 0;

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
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-4 h-4 ${avgRating >= star ? 'text-brand fill-brand' : 'text-gray-200 fill-gray-200'}`} />
              ))}
            </div>
            <span className="text-[13px] text-sub font-medium">
              {p.reviews.length > 0 ? `${avgRating.toFixed(1)} (${p.reviews.length} reviews)` : "No reviews yet"}
            </span>
          </div>

          <p className="text-sub leading-relaxed mb-6">{p.description}</p>
          
          <VariantSelector product={p as any} general={general} />
        </div>
      </main>
      
      <div className="max-w-[1280px] mx-auto px-6 pb-20">
        <ProductReviews productId={p.id} reviews={p.reviews as any} customerSession={session} />
      </div>

      <Footer storeName={general.storeName} />
    </>
  );
}
