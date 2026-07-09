import Link from "next/link";
import Image from "next/image";

interface Banner {
  id: string; title: string; subtitle: string | null; eyebrow: string | null;
  image: string; link: string; bgColorFrom: string; bgColorTo: string; textColor: string; buttonText: string;
}

export default function HeroBanners({ banners }: { banners: Banner[] }) {
  if (banners.length === 0) return null;
  return (
    <section className="pt-6">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.55fr_1fr] gap-4">
        {banners.slice(0, 2).map((b) => (
          <Link
            href={b.link || "#"}
            key={b.id}
            className="rounded-2xl overflow-hidden relative min-h-[220px] md:min-h-[280px] flex items-center p-8 md:p-10"
            style={{ background: `linear-gradient(120deg, ${b.bgColorFrom}, ${b.bgColorTo})`, color: b.textColor }}
          >
            <div className="relative z-10 max-w-[280px]">
              {b.eyebrow && <p className="text-[13px] font-bold tracking-wide opacity-85 mb-2">{b.eyebrow}</p>}
              <h3 className="text-2xl md:text-[30px] leading-tight font-extrabold mb-3.5">{b.title}</h3>
              {b.subtitle && <p className="opacity-80 text-[13.5px] mb-4">{b.subtitle}</p>}
              <span className="btn-primary">{b.buttonText}</span>
            </div>
            <Image src={b.image} alt={b.title} width={400} height={360} className="absolute right-0 top-0 h-full w-[45%] object-cover hidden sm:block" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)' }} />
          </Link>
        ))}
      </div>
    </section>
  );
}
