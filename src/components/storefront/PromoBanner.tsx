"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronRight, Calendar } from "lucide-react";
import type { ProductType } from "./ProductCard";
import { fmtCurrency } from "@/lib/utils";
import BannerProductCard from "./BannerProductCard";

// Ultra Premium Mini Countdown
function MiniCountdown({ banner, isEditMode }: { banner: any, isEditMode: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (!banner.endsAt) return;
    
    const calculateTimeLeft = () => {
      const difference = new Date(banner.endsAt).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [banner.endsAt]);

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await fetch(`/api/admin/banners/${banner.id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endsAt: e.target.value ? new Date(e.target.value).toISOString() : null })
      });
      window.location.reload();
    } catch (err) { console.error(err); }
  };

  if (!banner.endsAt && !isEditMode) return null;

  return (
    <div className={`relative flex items-center justify-center ${banner.alignLeft ? 'md:justify-start' : 'md:justify-end'} gap-3 md:gap-6 mt-8 mb-10 text-white w-full group/countdown`}>
      {isEditMode && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:-top-8 md:translate-x-0 md:left-auto md:right-0 opacity-0 group-hover/countdown:opacity-100 transition-opacity z-50 bg-black/80 rounded p-2 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-white" />
          <input 
            type="datetime-local" 
            className="bg-transparent text-white text-xs outline-none" 
            defaultValue={banner.endsAt ? new Date(new Date(banner.endsAt).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
            onChange={handleDateChange}
          />
        </div>
      )}
      {!banner.endsAt && isEditMode ? (
        <div className="text-white/50 text-sm font-semibold uppercase tracking-widest border border-dashed border-white/30 p-4 rounded-lg">
          Click calendar icon above to set countdown
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-light tracking-wider">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[10px] md:text-[11px] text-[#a9b6d3] uppercase tracking-[0.2em] mt-1 font-semibold">Days</span>
          </div>
          <span className="text-xl md:text-2xl font-light text-white/20 -mt-5">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-light tracking-wider">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] md:text-[11px] text-[#a9b6d3] uppercase tracking-[0.2em] mt-1 font-semibold">Hours</span>
          </div>
          <span className="text-xl md:text-2xl font-light text-white/20 -mt-5">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-light tracking-wider">{String(timeLeft.mins).padStart(2, '0')}</span>
            <span className="text-[10px] md:text-[11px] text-[#a9b6d3] uppercase tracking-[0.2em] mt-1 font-semibold">Mins</span>
          </div>
          <span className="text-xl md:text-2xl font-light text-white/20 -mt-5">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-light tracking-wider">{String(timeLeft.secs).padStart(2, '0')}</span>
            <span className="text-[10px] md:text-[11px] text-[#a9b6d3] uppercase tracking-[0.2em] mt-1 font-semibold">Secs</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function PromoBanner({ banner, products = [], isEditMode = false }: { banner: any, products?: ProductType[], isEditMode?: boolean }) {
  const displayProducts = products.slice(0, 4);

  if (!banner) return null;

  const handleTextUpdate = async (field: string, value: string) => {
    if (!isEditMode) return;
    try {
      await fetch(`/api/admin/banners/${banner.id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isEditMode) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { credentials: "include", method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        const fieldToUpdate = window.innerWidth < 768 ? "mobileImage" : "image";
        await fetch(`/api/admin/banners/${banner.id}`, {
          credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [fieldToUpdate]: url })
        });
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { credentials: "include", method: "POST", body: fd });
        if (res.ok) {
          const { url } = await res.json();
          const fieldToUpdate = window.innerWidth < 768 ? "mobileImage" : "image";
          await fetch(`/api/admin/banners/${banner.id}`, {
            credentials: "include",
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [fieldToUpdate]: url })
          });
          window.location.reload();
        }
      } catch (err) { console.error(err); }
      return;
    }

    let url = e.dataTransfer.getData("text/plain");
    if (url && url.startsWith("http")) { try { url = new URL(url).pathname; } catch (e) {} }
    if (url && url.startsWith("/")) {
      const fieldToUpdate = window.innerWidth < 768 ? "mobileImage" : "image";
      await fetch(`/api/admin/banners/${banner.id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [fieldToUpdate]: url })
      });
      window.location.reload();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isEditMode) e.preventDefault();
  };

  const toggleField = async (field: string, value: any) => {
    if (!isEditMode) return;
    try {
      await fetch(`/api/admin/banners/${banner.id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value })
      });
      window.location.reload();
    } catch (err) { console.error(err); }
  };

  return (
    <section className={`py-16 relative overflow-hidden bg-transparent ${!banner.isActive && !isEditMode ? 'hidden' : ''}`}>
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Main Ultra Premium Banner */}
        <div 
          className={`relative min-h-[500px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm ${isEditMode ? 'ring-2 ring-transparent hover:ring-[#ff5a1f]/50 transition-all cursor-pointer' : ''} ${!banner.isActive ? 'opacity-70' : ''}`}
          style={{ background: `linear-gradient(90deg, ${banner.bgColorFrom}, ${banner.bgColorTo})`, color: banner.textColor }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={(e) => {
            if (isEditMode && (e.target as HTMLElement).tagName !== 'SPAN' && (e.target as HTMLElement).tagName !== 'H2' && (e.target as HTMLElement).tagName !== 'P' && (e.target as HTMLElement).tagName !== 'BUTTON') {
              document.getElementById(`upload-${banner.id}`)?.click();
            }
          }}
        >
          <input type="file" id={`upload-${banner.id}`} className="hidden" accept="image/*" onChange={handleImageUpload} />
          
          {isEditMode && (
            <div className="absolute top-4 right-4 z-50 flex items-center gap-1 bg-black/80 p-1 rounded-lg backdrop-blur-sm shadow-xl">
              <button onClick={(e) => { e.stopPropagation(); toggleField('isActive', !banner.isActive); }} className={`px-3 py-1.5 text-[10px] font-bold text-white uppercase hover:bg-white/20 rounded transition-colors ${!banner.isActive ? 'text-red-400' : ''}`}>
                {banner.isActive ? 'Hide' : 'Show'}
              </button>
              <button onClick={(e) => { e.stopPropagation(); toggleField('alignLeft', !banner.alignLeft); }} className="px-3 py-1.5 text-[10px] font-bold text-white uppercase hover:bg-white/20 rounded border-l border-white/20 transition-colors">
                {banner.alignLeft ? 'Align Right' : 'Align Left'}
              </button>
              <button onClick={(e) => { e.stopPropagation(); toggleField('imageFit', banner.imageFit === 'contain' ? 'cover' : 'contain'); }} className="px-3 py-1.5 text-[10px] font-bold text-white uppercase hover:bg-white/20 rounded border-l border-white/20 transition-colors">
                {banner.imageFit === 'contain' ? 'Cover' : 'Contain'}
              </button>
            </div>
          )}

          {!banner.isActive && isEditMode && (
            <div className="absolute inset-0 bg-black/40 z-40 flex items-center justify-center pointer-events-none">
              <span className="text-white text-4xl md:text-6xl font-black tracking-widest uppercase opacity-50 rotate-[-15deg] drop-shadow-xl">Hidden</span>
            </div>
          )}
          
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <Image 
              src={banner.image || "/placeholder.png"} 
              alt={banner.title} 
              fill 
              className={`${banner.imageFit === 'contain' ? 'object-contain' : 'object-cover'} object-center ${banner.mobileImage ? 'hidden md:block' : ''}`} 
              priority
            />
            {banner.mobileImage && (
              <Image 
                src={banner.mobileImage} 
                alt={banner.title} 
                fill 
                className={`${banner.imageFit === 'contain' ? 'object-contain' : 'object-cover'} object-center md:hidden`} 
                priority
              />
            )}
            {/* Gradient mask */}
            <div className={`absolute inset-0 ${banner.alignLeft ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent via-[#0b1221]/80 to-[#0b1221]`} style={{ background: `linear-gradient(to ${banner.alignLeft ? 'left' : 'right'}, transparent, ${banner.bgColorTo}80, ${banner.bgColorTo})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221]/90 via-[#0b1221]/60 to-transparent md:hidden" style={{ background: `linear-gradient(to top, ${banner.bgColorTo}F2, ${banner.bgColorTo}99, transparent)` }}></div>
          </div>

          {/* Content */}
          <div className={`relative z-10 flex flex-col justify-center h-full min-h-[500px] px-6 py-12 md:px-16 w-full md:w-[55%] mx-auto ${banner.alignLeft ? 'md:mr-auto md:ml-0 text-center md:text-left' : 'md:ml-auto md:mx-0 text-center md:text-right'} mt-32 md:mt-0`}>
            
            <motion.div 
              initial={{ opacity: 0, x: banner.alignLeft ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col items-center ${banner.alignLeft ? 'md:items-start text-center md:text-left md:mr-auto' : 'md:items-end text-center md:text-right mx-auto md:ml-auto'} max-w-xl w-full`}
            >
              {banner.eyebrow && <span 
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextUpdate('eyebrow', e.currentTarget.textContent || "")}
                className={`uppercase text-[12px] md:text-[14px] font-black tracking-[0.3em] text-[#ff5a1f] mb-4 drop-shadow-md ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
              >{banner.eyebrow}</span>}
              <h2 
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextUpdate('title', e.currentTarget.textContent || "")}
                className={`text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-[1.15] md:leading-[1.1] tracking-tight drop-shadow-lg ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`} style={{ color: banner.textColor }}>
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p 
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextUpdate('subtitle', e.currentTarget.textContent || "")}
                  className={`text-base md:text-xl font-medium leading-relaxed drop-shadow opacity-90 ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`} style={{ color: banner.textColor }}>
                  {banner.subtitle}
                </p>
              )}
              
              <MiniCountdown banner={banner} isEditMode={isEditMode} />

              <div className="mt-8">
                <Link href={banner.link || "/search"} onClick={(e) => isEditMode && e.preventDefault()} className="group inline-flex items-center gap-3 bg-[#3b2e2a] hover:bg-[#ff5a1f] text-white font-black text-[14px] uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-none hover:translate-y-1">
                  <span
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onBlur={(e) => handleTextUpdate('buttonText', e.currentTarget.textContent || "")}
                    className={isEditMode ? 'outline-dashed outline-1 outline-black/30 hover:outline-black p-1' : ''}
                  >
                    {banner.buttonText}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            <BannerProductCard bannerId={banner.id} product={banner.product} isEditMode={isEditMode} />
          </div>
        </div>

        {/* Bottom Overlapping Cards - Ultra Premium Styling */}
        {displayProducts.length > 0 && (
          <div className="relative -mt-10 md:-mt-20 z-30 mx-4 md:mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 pb-6">
            {displayProducts.map((p, i) => {
              const imageList: string[] = (() => {
                try { return JSON.parse(p.images); } catch { return []; }
              })();
              const primaryImage = imageList[0] || "/placeholder.png";

              return (
                <Link href={`/product/${p.slug}`} key={p.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl p-4 flex gap-4 items-center border border-gray-200 shadow-sm hover:shadow-none hover:translate-y-1 transition-all duration-300"
                  >
                    <div className="w-[70px] h-[70px] shrink-0 rounded-2xl overflow-hidden relative bg-white border border-gray-200">
                      <Image 
                        src={primaryImage} 
                        alt={p.name} 
                        fill
                        className="object-cover mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-[15px] font-black text-black truncate mb-1.5">
                        {p.name}
                      </h4>
                      <div className="flex gap-[2px] mb-2">
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const pseudoRating = (() => {
                            let hash = 0;
                            const str = p.name || "";
                            for (let k = 0; k < str.length; k++) {
                              hash = str.charCodeAt(k) + ((hash << 5) - hash);
                            }
                            return 4.6 + (Math.abs(hash % 4) / 10);
                          })();
                          return (
                            <Star key={idx} className={`w-[13px] h-[13px] ${idx < Math.floor(pseudoRating) ? "text-amber-400 fill-amber-400" : "text-black/10"}`} />
                          );
                        })}
                      </div>
                      <div className="text-[16px] font-black text-[#ff5a1f]">
                        {fmtCurrency(p.price)}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
