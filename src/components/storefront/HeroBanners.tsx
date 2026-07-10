"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BannerType } from "@/lib/types";

export default function HeroBanners({ banners, isEditMode = false }: { banners: BannerType[], isEditMode?: boolean }) {
  if (!banners || banners.length === 0) return null;

  const leftBanner = banners[0];
  const rightBanner = banners.length > 1 ? banners[1] : null;

  const handleTextUpdate = async (id: string, field: string, value: string) => {
    if (!isEditMode) return;
    try {
      await fetch(`/api/admin/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file || !isEditMode) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        await fetch(`/api/admin/banners/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: url })
        });
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDrop = async (e: React.DragEvent, id: string) => {
    if (!isEditMode) return;
    e.preventDefault();
    const url = e.dataTransfer.getData("text/plain");
    if (url && url.startsWith("/")) {
      await fetch(`/api/admin/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: url })
      });
      window.location.reload();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isEditMode) e.preventDefault();
  };

  return (
    <section className="bg-white pt-6 pb-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[540px]">
          
          {/* Main Hero Banner (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onDrop={(e: any) => handleDrop(e, leftBanner.id)}
            onDragOver={handleDragOver}
            className={`lg:col-span-8 relative rounded-2xl overflow-hidden group min-h-[400px] lg:min-h-full bg-[#0b1221] ${isEditMode ? 'ring-2 ring-transparent hover:ring-brand/50 transition-all cursor-pointer' : ''}`}
            onClick={(e) => {
              if (isEditMode && (e.target as HTMLElement).tagName !== 'SPAN' && (e.target as HTMLElement).tagName !== 'H2' && (e.target as HTMLElement).tagName !== 'P') {
                document.getElementById(`upload-${leftBanner.id}`)?.click();
              }
            }}
          >
            <input type="file" id={`upload-${leftBanner.id}`} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, leftBanner.id)} />
            {isEditMode && <div className="absolute top-4 right-4 z-50 bg-black/70 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-lg pointer-events-none">Click or Drop image</div>}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <Image 
                src={leftBanner.image || "/placeholder.png"} 
                alt={leftBanner.title} 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80"
                priority
              />
              {/* Premium Dark Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1221] via-[#0b1221]/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221]/90 via-transparent to-transparent md:hidden"></div>
            </div>

            <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center max-w-xl">
              <span 
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextUpdate(leftBanner.id, 'eyebrow', e.currentTarget.textContent || "")}
                className={`inline-block text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.3em] mb-4 ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
              >
                {leftBanner.eyebrow}
              </span>
              <h2 
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextUpdate(leftBanner.id, 'title', e.currentTarget.textContent || "")}
                className={`text-[38px] md:text-[54px] font-bold text-white leading-[1.1] mb-5 tracking-tight ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
              >
                {leftBanner.title}
              </h2>
              <p 
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextUpdate(leftBanner.id, 'subtitle', e.currentTarget.textContent || "")}
                className={`text-[16px] md:text-[18px] text-[#cbd5e1] mb-10 font-light leading-relaxed ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
              >
                {leftBanner.subtitle}
              </p>
              <div>
                <Link href={leftBanner.link !== "#" ? leftBanner.link : "/search"} onClick={(e) => isEditMode && e.preventDefault()} className="inline-block bg-white text-[#0b1221] hover:bg-[#d4af37] hover:text-white font-bold text-[13px] uppercase tracking-widest px-10 py-4 rounded-sm transition-all duration-300">
                  <span
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onBlur={(e) => handleTextUpdate(leftBanner.id, 'buttonText', e.currentTarget.textContent || "")}
                    className={isEditMode ? 'outline-dashed outline-1 outline-black/30 hover:outline-black p-1' : ''}
                  >
                    {leftBanner.buttonText || "Shop Now"}
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Secondary Hero Banner (Right) */}
          {rightBanner && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              onDrop={(e: any) => handleDrop(e, rightBanner.id)}
              onDragOver={handleDragOver}
              className={`lg:col-span-4 relative rounded-2xl overflow-hidden group min-h-[400px] lg:min-h-full bg-[#0b1221] ${isEditMode ? 'ring-2 ring-transparent hover:ring-brand/50 transition-all cursor-pointer' : ''}`}
              onClick={(e) => {
                if (isEditMode && (e.target as HTMLElement).tagName !== 'SPAN' && (e.target as HTMLElement).tagName !== 'H3' && (e.target as HTMLElement).tagName !== 'P') {
                  document.getElementById(`upload-${rightBanner.id}`)?.click();
                }
              }}
            >
              <input type="file" id={`upload-${rightBanner.id}`} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, rightBanner.id)} />
              {isEditMode && <div className="absolute top-4 right-4 z-50 bg-black/70 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-lg pointer-events-none">Click or Drop image</div>}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <Image 
                  src={rightBanner.image || "/placeholder.png"} 
                  alt={rightBanner.title} 
                  fill 
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-70"
                  priority
                />
                {/* Premium Dark Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] via-[#0b1221]/60 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end text-center items-center">
                <span 
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextUpdate(rightBanner.id, 'eyebrow', e.currentTarget.textContent || "")}
                  className={`inline-block text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.3em] mb-3 ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
                >
                  {rightBanner.eyebrow}
                </span>
                <h3 
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextUpdate(rightBanner.id, 'title', e.currentTarget.textContent || "")}
                  className={`text-[28px] md:text-[34px] font-bold text-white leading-tight mb-3 tracking-tight ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
                >
                  {rightBanner.title}
                </h3>
                <p 
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextUpdate(rightBanner.id, 'subtitle', e.currentTarget.textContent || "")}
                  className={`text-[14px] text-[#cbd5e1] mb-8 font-light max-w-[250px] mx-auto ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
                >
                  {rightBanner.subtitle}
                </p>
                <Link href={rightBanner.link !== "#" ? rightBanner.link : "/search"} onClick={(e) => isEditMode && e.preventDefault()} className="inline-block bg-transparent border border-white text-white hover:bg-white hover:text-[#0b1221] font-bold text-[12px] uppercase tracking-widest px-8 py-3 rounded-sm transition-all duration-300">
                  <span
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onBlur={(e) => handleTextUpdate(rightBanner.id, 'buttonText', e.currentTarget.textContent || "")}
                    className={isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}
                  >
                    {rightBanner.buttonText || "Discover"}
                  </span>
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
