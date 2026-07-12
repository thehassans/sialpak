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
        credentials: "include",
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
      const res = await fetch("/api/admin/upload", { credentials: "include", method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        const fieldToUpdate = window.innerWidth < 768 ? "mobileImage" : "image";
        await fetch(`/api/admin/banners/${id}`, {
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

  const handleDrop = async (e: React.DragEvent, id: string) => {
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
          await fetch(`/api/admin/banners/${id}`, {
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
      await fetch(`/api/admin/banners/${id}`, {
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

  return (
    <section className="bg-transparent pt-6 pb-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[540px]">
          
          {/* Main Hero Banner (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onDrop={(e: any) => handleDrop(e, leftBanner.id)}
            onDragOver={handleDragOver}
            className={`lg:col-span-8 relative rounded-3xl overflow-hidden group min-h-[400px] lg:min-h-full bg-white border border-gray-200 shadow-sm ${isEditMode ? 'ring-2 ring-transparent hover:ring-[#ff5a1f]/50 transition-all cursor-pointer' : ''}`}
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
                className={`object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 ${leftBanner.mobileImage ? 'hidden md:block' : ''}`}
                priority
              />
              {leftBanner.mobileImage && (
                <Image 
                  src={leftBanner.mobileImage} 
                  alt={leftBanner.title} 
                  fill 
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 md:hidden"
                  priority
                />
              )}
              {/* Premium Dark Solid Mask */}
              <div className="absolute inset-0 bg-[#3b2e2a]/45 group-hover:bg-black/55 transition-colors duration-500"></div>
            </div>

            <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center max-w-xl">
              <span 
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextUpdate(leftBanner.id, 'eyebrow', e.currentTarget.textContent || "")}
                className={`inline-block text-[#ff5a1f] text-[13px] font-black uppercase tracking-[0.3em] mb-4 ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
              >
                {leftBanner.eyebrow}
              </span>
              <h2 
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextUpdate(leftBanner.id, 'title', e.currentTarget.textContent || "")}
                className={`text-[42px] md:text-[64px] font-black text-white leading-[1.1] mb-5 tracking-tight ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
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
                <Link href={leftBanner.link !== "#" ? leftBanner.link : "/search"} onClick={(e) => isEditMode && e.preventDefault()} className="inline-block bg-[#ff5a1f] hover:bg-[#3b2e2a] border border-gray-200 shadow-sm hover:shadow-none hover:translate-y-1 text-white font-black text-[15px] uppercase tracking-widest px-10 py-4 rounded-xl transition-all duration-300">
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
              className={`lg:col-span-4 relative rounded-3xl overflow-hidden group min-h-[400px] lg:min-h-full bg-white border border-gray-200 shadow-sm ${isEditMode ? 'ring-2 ring-transparent hover:ring-[#ff5a1f]/50 transition-all cursor-pointer' : ''}`}
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
                  className={`object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-70 ${rightBanner.mobileImage ? 'hidden md:block' : ''}`}
                  priority
                />
                {rightBanner.mobileImage && (
                  <Image 
                    src={rightBanner.mobileImage} 
                    alt={rightBanner.title} 
                    fill 
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-70 md:hidden"
                    priority
                  />
                )}
                {/* Premium Dark Solid Mask */}
                <div className="absolute inset-0 bg-[#3b2e2a]/40 group-hover:bg-black/45 transition-colors duration-500"></div>
              </div>

              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end text-center items-center">
                <span 
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextUpdate(rightBanner.id, 'eyebrow', e.currentTarget.textContent || "")}
                  className={`inline-block text-[#ff5a1f] text-[12px] font-black uppercase tracking-[0.3em] mb-3 ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
                >
                  {rightBanner.eyebrow}
                </span>
                <h3 
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextUpdate(rightBanner.id, 'title', e.currentTarget.textContent || "")}
                  className={`text-[32px] md:text-[40px] font-black text-white leading-tight mb-3 tracking-tight ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
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
                <Link href={rightBanner.link !== "#" ? rightBanner.link : "/search"} onClick={(e) => isEditMode && e.preventDefault()} className="inline-block bg-[#3b2e2a] hover:bg-[#ff5a1f] border border-gray-200 shadow-sm hover:shadow-none hover:translate-y-1 text-white font-black text-[14px] uppercase tracking-widest px-8 py-3 rounded-xl transition-all duration-300">
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
