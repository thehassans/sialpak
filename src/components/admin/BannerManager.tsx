"use client";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { cx } from "@/lib/utils";

interface Banner {
  id: string; title: string; subtitle: string | null; eyebrow: string | null; image: string; mobileImage: string | null;
  link: string; position: string; bgColorFrom: string; bgColorTo: string; textColor: string; buttonText: string;
  sortOrder: number; isActive: boolean; collectionId: string | null;
}

const EMPTY: Omit<Banner, "id"> = {
  title: "New Banner Title", subtitle: "Add a supporting line here.", eyebrow: "EYEBROW", image: "https://placehold.co/360x420/173a63/ffffff?text=Banner",
  mobileImage: null, link: "#", position: "hero", bgColorFrom: "#0f2542", bgColorTo: "#173963", textColor: "#ffffff", buttonText: "Shop Now",
  sortOrder: 0, isActive: true, collectionId: null
};

export default function BannerManager({ initialBanners, collections }: { initialBanners: Banner[], collections: { id: string; name: string }[] }) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [editing, setEditing] = useState<Banner | (Omit<Banner, "id"> & { id?: string }) | null>(initialBanners[0] || null);
  const [saving, setSaving] = useState(false);

  function startNew() {
    setEditing({ ...EMPTY });
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    const isNew = !("id" in editing) || !editing.id;
    const res = await fetch(isNew ? "/api/admin/banners" : `/api/admin/banners/${(editing as Banner).id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing)
    });
    setSaving(false);
    if (res.ok) {
      const saved = await res.json();
      setBanners((prev) => {
        const exists = prev.find((b) => b.id === saved.id);
        return exists ? prev.map((b) => (b.id === saved.id ? saved : b)) : [...prev, saved];
      });
      setEditing(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this banner?")) return;
    const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    if (res.ok) setBanners((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-6">
      <div className="admin-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-ink">All Banners</h3>
          <button onClick={startNew} className="btn-primary py-1.5 px-3 text-xs">+ New Banner</button>
        </div>
        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
          {banners.map((b) => (
            <button
              key={b.id}
              onClick={() => setEditing(b)}
              className={cx(
                "w-full text-left border rounded-lg p-3 flex items-center gap-3 transition",
                editing && "id" in editing && editing.id === b.id ? "border-brand ring-2 ring-brand/20" : "border-line hover:border-brand/40"
              )}
            >
              <div className="w-12 h-12 rounded-md bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${b.image})` }} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold truncate">{b.title}</div>
                <div className="text-[11px] text-sub">{b.position} · order {b.sortOrder} · {b.isActive ? "Active" : "Hidden"}</div>
              </div>
              <span
                onClick={(e) => { e.stopPropagation(); remove(b.id); }}
                className="text-danger text-xs font-bold shrink-0 px-1.5"
              >
                ✕
              </span>
            </button>
          ))}
          {banners.length === 0 && <p className="text-sub text-sm text-center py-8">No banners yet. Create your first one.</p>}
        </div>
      </div>

      <div className="admin-card">
        {!editing ? (
          <div className="h-full flex items-center justify-center text-sub text-sm py-20">Select a banner to edit, or create a new one.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-extrabold text-ink">Edit Banner</h3>
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input className="admin-input" value={editing.eyebrow || ""} onChange={(e) => setEditing({ ...editing, eyebrow: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Title</label>
                <input className="admin-input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Subtitle</label>
                <textarea className="admin-input" rows={2} value={editing.subtitle || ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Button Text</label>
                <input className="admin-input" value={editing.buttonText} onChange={(e) => setEditing({ ...editing, buttonText: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Link URL</label>
                <input className="admin-input" value={editing.link} onChange={(e) => setEditing({ ...editing, link: e.target.value })} />
              </div>
              <ImageUploader value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} label="Banner Image" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Gradient From</label>
                  <input type="color" className="w-full h-10 rounded-lg border border-line" value={editing.bgColorFrom} onChange={(e) => setEditing({ ...editing, bgColorFrom: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Gradient To</label>
                  <input type="color" className="w-full h-10 rounded-lg border border-line" value={editing.bgColorTo} onChange={(e) => setEditing({ ...editing, bgColorTo: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Text Color</label>
                  <input type="color" className="w-full h-10 rounded-lg border border-line" value={editing.textColor} onChange={(e) => setEditing({ ...editing, textColor: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Position</label>
                  <select className="admin-select" value={editing.position} onChange={(e) => setEditing({ ...editing, position: e.target.value })}>
                    <option value="hero">Hero (Top)</option>
                    <option value="promo">Promo Strip</option>
                    <option value="strip">Sale Strip / Premium</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Associated Collection (Optional)</label>
                <select className="admin-select" value={editing.collectionId || ""} onChange={(e) => setEditing({ ...editing, collectionId: e.target.value || null })}>
                  <option value="">None (Link only)</option>
                  {collections.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="admin-label">Sort Order</label>
                  <input type="number" className="admin-input" value={editing.sortOrder} onChange={(e) => setEditing({ ...editing, sortOrder: Number(e.target.value) })} />
                </div>
                <label className="flex items-center gap-2 text-sm font-semibold pb-2.5">
                  <input type="checkbox" checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
                  Active on storefront
                </label>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={save} disabled={saving} className="btn-primary">{saving ? "Saving..." : "Save Banner"}</button>
                <button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-ink mb-3">Live Preview</h3>
              
              {editing.position === "promo" ? (
                <div className="relative overflow-hidden min-h-[160px] flex items-center justify-center p-8 sticky top-6 shadow-sm border border-line"
                  style={{ background: `linear-gradient(90deg, ${editing.bgColorFrom}, ${editing.bgColorTo})`, color: editing.textColor }}
                >
                  <div className="relative z-10 text-center flex flex-col items-center">
                    {editing.eyebrow && <span className="uppercase text-[10px] font-bold tracking-[0.2em] mb-3 opacity-90">{editing.eyebrow}</span>}
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{editing.title}</h2>
                    <span className="inline-flex items-center justify-center px-8 py-3 bg-white text-ink text-[13.5px] font-bold transition-transform hover:scale-105 shadow-md">
                      {editing.buttonText}
                    </span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editing.image} alt="" className="absolute left-0 bottom-0 h-full w-auto object-cover opacity-30 mix-blend-overlay" />
                </div>
              ) : editing.position === "strip" ? (
                <div className="relative overflow-hidden min-h-[300px] flex items-center p-8 sticky top-6 shadow-sm border border-line bg-ink text-white"
                  style={{ background: editing.bgColorFrom, color: editing.textColor }}
                >
                  <div className="relative z-10 max-w-[50%]">
                    {editing.eyebrow && <p className="text-[11px] font-bold text-brand uppercase tracking-wider mb-2">{editing.eyebrow}</p>}
                    <h3 className="text-2xl font-bold mb-3">{editing.title}</h3>
                    {editing.subtitle && <p className="text-[13px] opacity-80 mb-6">{editing.subtitle}</p>}
                    <span className="inline-block border border-white/20 px-6 py-2.5 text-[13px] font-bold hover:bg-white hover:text-ink transition-colors">{editing.buttonText}</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editing.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                </div>
              ) : (
                <div
                  className="rounded-2xl overflow-hidden relative min-h-[280px] flex items-center p-8 sticky top-6 shadow-sm"
                  style={{ background: `linear-gradient(120deg, ${editing.bgColorFrom}, ${editing.bgColorTo})`, color: editing.textColor }}
                >
                  <div className="relative z-10 max-w-[280px]">
                    {editing.eyebrow && <p className="text-[13px] font-bold tracking-wide opacity-85 mb-2">{editing.eyebrow}</p>}
                    <h3 className="text-[28px] leading-tight font-extrabold mb-3.5">{editing.title}</h3>
                    {editing.subtitle && <p className="opacity-80 text-[13.5px] mb-4">{editing.subtitle}</p>}
                    <span className="inline-flex items-center gap-2 bg-brand text-white font-bold text-[13.5px] px-5 py-2.5 rounded-md">{editing.buttonText}</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editing.image} alt="" className="absolute right-0 bottom-0 h-[85%] w-auto object-contain opacity-95" />
                </div>
              )}
              
              <p className="text-[11px] text-sub mt-4 text-center">This preview adapts automatically based on the selected Position.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
