"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

interface Category { id: string; name: string }
interface Collection { id: string; name: string; color: string }

interface ProductFormValues {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  comparePrice: string;
  costPrice: string;
  sku: string;
  stock: string;
  images: string[];
  categoryId: string;
  collectionIds: string[];
  status: string;
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
}

export default function ProductForm({
  categories,
  collections,
  initial
}: {
  categories: Category[];
  collections: Collection[];
  initial?: Partial<ProductFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({
    name: initial?.name || "",
    slug: initial?.slug || "",
    description: initial?.description || "",
    price: initial?.price?.toString() || "",
    comparePrice: initial?.comparePrice?.toString() || "",
    costPrice: initial?.costPrice?.toString() || "",
    sku: initial?.sku || "",
    stock: initial?.stock?.toString() || "0",
    images: initial?.images || [],
    categoryId: initial?.categoryId || "",
    collectionIds: initial?.collectionIds || [],
    status: initial?.status || "active",
    isFeatured: initial?.isFeatured || false,
    seoTitle: initial?.seoTitle || "",
    seoDescription: initial?.seoDescription || "",
    id: initial?.id
  });
  const [saving, setSaving] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [localCollections, setLocalCollections] = useState(collections);

  function toggleCollection(id: string) {
    setValues((v) => ({
      ...v,
      collectionIds: v.collectionIds.includes(id) ? v.collectionIds.filter((c) => c !== id) : [...v.collectionIds, id]
    }));
  }

  function addImage(url: string) {
    if (!url) return;
    setValues((v) => ({ ...v, images: [...v.images, url] }));
  }

  function removeImage(idx: number) {
    setValues((v) => ({ ...v, images: v.images.filter((_, i) => i !== idx) }));
  }

  async function createCollectionInline() {
    if (!newCollectionName.trim()) return;
    const res = await fetch("/api/admin/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCollectionName })
    });
    if (res.ok) {
      const col = await res.json();
      setLocalCollections((prev) => [...prev, col]);
      setValues((v) => ({ ...v, collectionIds: [...v.collectionIds, col.id] }));
      setNewCollectionName("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const isNew = !values.id;
    const res = await fetch(isNew ? "/api/admin/products" : `/api/admin/products/${values.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-5">
        <div className="admin-card space-y-4">
          <h3 className="font-extrabold text-ink">Basic Information</h3>
          <div>
            <label className="admin-label">Product Name</label>
            <input required className="admin-input" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Slug (URL) — optional, auto-generated</label>
            <input className="admin-input" value={values.slug} onChange={(e) => setValues({ ...values, slug: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Description</label>
            <textarea className="admin-input" rows={5} value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} />
          </div>
        </div>

        <div className="admin-card space-y-4">
          <h3 className="font-extrabold text-ink">Pricing & Inventory</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="admin-label">Price</label>
              <input required type="number" step="0.01" className="admin-input" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Compare-at Price</label>
              <input type="number" step="0.01" className="admin-input" value={values.comparePrice} onChange={(e) => setValues({ ...values, comparePrice: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Cost Price</label>
              <input type="number" step="0.01" className="admin-input" value={values.costPrice} onChange={(e) => setValues({ ...values, costPrice: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="admin-label">SKU</label>
              <input className="admin-input" value={values.sku} onChange={(e) => setValues({ ...values, sku: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Stock Quantity</label>
              <input type="number" className="admin-input" value={values.stock} onChange={(e) => setValues({ ...values, stock: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="admin-card space-y-3">
          <h3 className="font-extrabold text-ink">Images</h3>
          <div className="grid grid-cols-4 gap-3">
            {values.images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-line group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-white/90 rounded-full w-6 h-6 text-danger font-bold text-xs opacity-0 group-hover:opacity-100 transition">✕</button>
              </div>
            ))}
          </div>
          <ImageUploader value="" onChange={addImage} label="Add another image" />
        </div>

        <div className="admin-card space-y-4">
          <h3 className="font-extrabold text-ink">SEO for this Product</h3>
          <div>
            <label className="admin-label">SEO Title</label>
            <input className="admin-input" value={values.seoTitle} onChange={(e) => setValues({ ...values, seoTitle: e.target.value })} placeholder={values.name} />
          </div>
          <div>
            <label className="admin-label">SEO Meta Description</label>
            <textarea className="admin-input" rows={2} value={values.seoDescription} onChange={(e) => setValues({ ...values, seoDescription: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="admin-card space-y-4">
          <h3 className="font-extrabold text-ink">Organize</h3>
          <div>
            <label className="admin-label">Status</label>
            <select className="admin-select" value={values.status} onChange={(e) => setValues({ ...values, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Category</label>
            <select className="admin-select" value={values.categoryId} onChange={(e) => setValues({ ...values, categoryId: e.target.value })}>
              <option value="">— None —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={values.isFeatured} onChange={(e) => setValues({ ...values, isFeatured: e.target.checked })} />
            Featured product
          </label>
        </div>

        <div className="admin-card space-y-3">
          <h3 className="font-extrabold text-ink">Collections</h3>
          <p className="text-xs text-sub -mt-2">e.g. Beauty Essentials Sale, The Best Offers, New Goods</p>
          <div className="space-y-2">
            {localCollections.map((c) => (
              <label key={c.id} className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" checked={values.collectionIds.includes(c.id)} onChange={() => toggleCollection(c.id)} />
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: c.color }} />
                {c.name}
              </label>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <input className="admin-input" placeholder="New collection name" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} />
            <button type="button" onClick={createCollectionInline} className="btn-secondary shrink-0 px-3">Add</button>
          </div>
        </div>

        <button disabled={saving} className="btn-primary w-full justify-center py-3">
          {saving ? "Saving..." : values.id ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
