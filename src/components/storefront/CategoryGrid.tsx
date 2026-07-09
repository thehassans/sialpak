import Image from "next/image";
import Link from "next/link";

interface Cat { id: string; name: string; slug: string; image: string | null; _count?: { products: number } }

export default function CategoryGrid({ categories }: { categories: Cat[] }) {
  return (
    <section className="py-11" id="categories">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl font-extrabold">Popular Categories</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
          {categories.map((c) => (
            <Link href={`/category/${c.slug}`} key={c.id} className="text-center flex flex-col items-center gap-2.5 p-1.5 rounded-xl hover:bg-white hover:shadow-card transition">
              <Image src={c.image || "https://placehold.co/160x160/eef4fd/1f6fdb?text=" + encodeURIComponent(c.name)} alt={c.name} width={78} height={78} className="rounded-full object-cover bg-brand-pale" />
              <span className="text-[13.5px] font-bold">{c.name}</span>
              {c._count && <span className="text-[11.5px] text-sub">{c._count.products} items</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
