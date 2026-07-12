"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fmtCurrency } from "@/lib/utils";
import type { ProductType } from "@/lib/types";
import BannerProductCard from "./BannerProductCard";

export default function PremiumCollection({ banners = [], isEditMode = false }: { banners: any[], isEditMode?: boolean }) {
  const handleAddBanner = async () => {
    try {
      await fetch('/api/admin/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "New Premium Collection",
          subtitle: "Describe your collection here.",
          buttonText: "Shop Now",
          image: "/placeholder.png",
          position: "strip",
          bgColorFrom: "#ffffff",
          bgColorTo: "#f8f9fa",
          textColor: "#000000",
          sortOrder: banners.length
        })
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  if (!banners.length && !isEditMode) return null;

  return (
    <section className={`py-16 md:py-24 bg-[#f8f9fa] relative overflow-hidden`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f1f5f9] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[#ff5a1f] text-[12px] font-black uppercase tracking-[0.3em] mb-4 block text-center lg:text-left">
            Buysial Exclusives
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase mb-6 text-center lg:text-left">
            Premium Curations
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto lg:mx-0"></div>
        </div>

        <div className="flex flex-col gap-24">
          {banners.map((banner, i) => {
            const bannerProducts = banner.collection ? banner.collection.products.map((p: any) => p.product) : banner.product ? [banner.product] : [];
            return <PremiumCollectionItem key={banner.id} banner={banner} products={bannerProducts} isEditMode={isEditMode} />;
          })}
        </div>
        
        {isEditMode && (
          <div className="mt-16 flex justify-center">
            <button onClick={handleAddBanner} className="bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#ff5a1f] transition-colors border border-gray-200 shadow-sm">
              + Add Premium Curation
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

function PremiumCollectionItem({ banner, products = [], isEditMode = false }: { banner: any, products?: ProductType[], isEditMode?: boolean }) {
  if (!banner) return null;
  const displayProducts = products.slice(0, 3);
  const featuredProduct = displayProducts[0];
  const subProducts = displayProducts.slice(1, 3);

  const getPrimaryImage = (p: ProductType) => {
    try { return JSON.parse(p.images)[0] || "/placeholder.png"; } 
    catch { return "/placeholder.png"; }
  };

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
    <div className={`relative ${!banner.isActive && !isEditMode ? 'hidden' : ''}`}>
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${!banner.isActive ? 'opacity-70' : ''}`}>
          
          {/* Large Editorial Image */}
          <div 
            className={`relative aspect-[4/5] bg-white overflow-hidden group rounded-3xl border border-gray-200 shadow-sm ${isEditMode ? 'ring-2 ring-transparent hover:ring-[#ff5a1f]/50 transition-all cursor-pointer' : ''} ${banner.alignLeft ? 'lg:order-2' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={(e) => {
              if (isEditMode && (e.target as HTMLElement).tagName !== 'SPAN' && (e.target as HTMLElement).tagName !== 'H3' && (e.target as HTMLElement).tagName !== 'P' && (e.target as HTMLElement).tagName !== 'BUTTON') {
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
                  {banner.alignLeft ? 'Move Right' : 'Move Left'}
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleField('imageFit', banner.imageFit === 'contain' ? 'cover' : 'contain'); }} className="px-3 py-1.5 text-[10px] font-bold text-white uppercase hover:bg-white/20 rounded border-l border-white/20 transition-colors">
                  {banner.imageFit === 'contain' ? 'Cover' : 'Contain'}
                </button>
              </div>
            )}

            {!banner.isActive && isEditMode && (
              <div className="absolute inset-0 bg-black/40 z-40 flex items-center justify-center pointer-events-none">
                <span className="text-white text-3xl font-black tracking-widest uppercase opacity-50 rotate-[-15deg]">Hidden</span>
              </div>
            )}

            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#f8f9fa]">
              <Image 
                src={banner.image || "/placeholder.png"} 
                alt={banner.title} 
                fill 
                className={`${banner.imageFit === 'contain' ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-1000 ease-out ${banner.mobileImage ? 'hidden md:block' : ''}`} 
              />
              {banner.mobileImage && (
                <Image 
                  src={banner.mobileImage} 
                  alt={banner.title} 
                  fill 
                  className={`${banner.imageFit === 'contain' ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-1000 ease-out md:hidden`} 
                />
              )}
            </div>
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-10 md:p-16">
              <h3 
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextUpdate('title', e.currentTarget.textContent || "")}
                className={`text-white text-[42px] md:text-[54px] font-black tracking-tight mb-4 ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
              >
                {banner.title}
              </h3>
              {banner.subtitle && (
                <p 
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextUpdate('subtitle', e.currentTarget.textContent || "")}
                  className={`text-white/90 text-sm tracking-wide mb-8 max-w-md font-light ${isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}`}
                >
                  {banner.subtitle}
                </p>
              )}
              <Link href={banner.link || "/search"} onClick={(e) => isEditMode && e.preventDefault()} className="inline-flex items-center gap-4 bg-[#ff5a1f] hover:bg-[#3b2e2a] text-white text-[14px] font-black uppercase tracking-[0.2em] transition-all px-8 py-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-none hover:translate-y-1 self-start mt-4">
                <span
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextUpdate('buttonText', e.currentTarget.textContent || "")}
                  className={isEditMode ? 'outline-dashed outline-1 outline-white/30 hover:outline-white p-1' : ''}
                >
                  {banner.buttonText}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <BannerProductCard bannerId={banner.id} product={banner.product} isEditMode={isEditMode} alignLeft={banner.alignLeft} />
          </div>

          {/* Right Column - Product List */}
          <div className="flex flex-col gap-12">
            
            {/* Featured Product */}
            {featuredProduct && (
              <div className="flex flex-col md:flex-row gap-8 items-center group">
                <Link href={`/product/${featuredProduct.slug}`} className="relative w-full md:w-1/2 aspect-square bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                  <Image 
                    src={getPrimaryImage(featuredProduct)} 
                    alt={featuredProduct.name} 
                    fill 
                    className="object-contain mix-blend-multiply p-8 group-hover:scale-105 transition-transform duration-700" 
                  />
                </Link>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[#ff5a1f] text-[12px] font-black uppercase tracking-[0.2em] mb-3">Featured</span>
                  <Link href={`/product/${featuredProduct.slug}`} className="hover:opacity-80 transition-opacity">
                    <h4 className="text-[28px] font-black text-black mb-3 leading-snug">{featuredProduct.name}</h4>
                  </Link>
                  <p className="text-[18px] text-[#ff5a1f] font-black mb-6">{fmtCurrency(featuredProduct.price)}</p>
                  <Link href={`/product/${featuredProduct.slug}`} className="inline-flex items-center gap-3 bg-[#3b2e2a] hover:bg-[#ff5a1f] border border-gray-200 shadow-sm hover:shadow-none hover:translate-y-1 text-white text-[13px] font-black uppercase tracking-[0.1em] px-8 py-4 rounded-xl transition-all self-start">
                    Shop Now
                  </Link>
                </div>
              </div>
            )}

            <div className="h-[1px] w-full bg-[#f4f4f5]"></div>

            {/* Sub Products Grid */}
            <div className="grid grid-cols-2 gap-8">
              {subProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="flex flex-col group">
                  <div className="relative aspect-square bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-none hover:translate-y-1 transition-all duration-300 overflow-hidden mb-4">
                    <Image 
                      src={getPrimaryImage(p)} 
                      alt={p.name} 
                      fill 
                      className="object-contain mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <h5 className="text-[15px] font-black text-black mb-1 group-hover:opacity-60 transition-opacity line-clamp-1">{p.name}</h5>
                  <p className="text-[14px] text-[#ff5a1f] font-black">{fmtCurrency(p.price)}</p>
                </Link>
              ))}
          </div>

        </div>
      </div>
    </div>
  );
}
