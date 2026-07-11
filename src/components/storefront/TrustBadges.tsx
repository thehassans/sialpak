"use client";
import { Truck, RotateCcw, Shield, Headphones } from "lucide-react";
import { TRUST_BADGES } from "@/lib/mock-data";

export default function TrustBadges() {
  const icons = {
    Truck: <Truck className="w-8 h-8 text-[#ff5a1f]" strokeWidth={2} />,
    RotateCcw: <RotateCcw className="w-8 h-8 text-[#ff5a1f]" strokeWidth={2} />,
    Shield: <Shield className="w-8 h-8 text-[#ff5a1f]" strokeWidth={2} />,
    Headphones: <Headphones className="w-8 h-8 text-[#ff5a1f]" strokeWidth={2} />
  };

  return (
    <div className="bg-[#ffebd5] border-y-2 border-black">
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
          {TRUST_BADGES.map((badge, i) => (
            <div key={i} className={`flex items-center gap-4 ${i === 0 || i === 1 ? 'pt-0' : 'pt-6'} md:pt-0 ${i !== 0 && 'md:pl-6'}`}>
              <div className="shrink-0">
                {icons[badge.icon as keyof typeof icons]}
              </div>
              <div>
                <h4 className="text-[15px] font-black text-black mb-0.5">{badge.title}</h4>
                <p className="text-[13px] text-black/60 font-bold leading-snug">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
