import Image from "next/image";
import Link from "next/link";
import { fmtCurrency } from "@/lib/utils";

interface Prod { id: string; name: string; slug: string; price: number; comparePrice: number | null; images: string; }

export default function ProductGrid({ title, products, viewAllHref }: { title: string; products: Prod[]; viewAllHref?: string }) {
  return (
    <section className="py-6" id="offers">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl font-extrabold">{title}</h2>
          {viewAllHref && <Link href={viewAllHref} className="text-[13.5px] font-bold text-brand">More Products →</Link>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((p) => {
            const img = JSON.parse(p.images || "[]")[0] || "https://placehold.co/500x500";
            return (
              <Link href={`/product/${p.slug}`} key={p.id} className="bg-white border border-line rounded-xl overflow-hidden flex flex-col hover:shadow-lg2 hover:-translate-y-0.5 transition">
                <div className="relative aspect-square bg-[#f4f6fa]">
                  <Image src={img} alt={p.name} fill className="object-cover" />
                  {p.comparePrice && (
                    <span className="absolute top-2.5 left-2.5 bg-warn text-white text-[10.5px] font-extrabold px-2 py-0.5 rounded">
                      -{Math.round(100 - (p.price / p.comparePrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-3.5 flex flex-col gap-1.5 flex-1">
                  <div className="text-[14px] font-bold leading-snug line-clamp-2">{p.name}</div>
                  <div className="mt-auto text-[16px] font-extrabold">
                    {p.comparePrice && <span className="font-medium text-sub line-through text-[13px] mr-1.5">{fmtCurrency(p.comparePrice)}</span>}
                    {fmtCurrency(p.price)}
                  </div>
                  <span className="w-full text-center bg-brand hover:bg-brand-dark text-white py-2.5 rounded-md font-bold text-[12.5px] transition mt-1">Add To Cart</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
