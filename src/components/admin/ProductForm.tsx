"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { Trash2, Plus } from "lucide-react";

interface Category { id: string; name: string }
interface Collection { id: string; name: string; color: string }

export interface ProductFormValues {
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
  hasVariants: boolean;
  options: { name: string; values: string[] }[];
  variants: { sku: string; price: string; stock: string; optionChoices: Record<string, string> }[];
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
    hasVariants: initial?.hasVariants || false,
    options: initial?.options || [],
    variants: initial?.variants || [],
    seoTitle: initial?.seoTitle || "",
    seoDescription: initial?.seoDescription || "",
    id: initial?.id
  });

  const [saving, setSaving] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [localCollections, setLocalCollections] = useState(collections);

  // Auto-generate variants when options change
  useEffect(() => {
    if (!values.hasVariants || values.options.length === 0) return;
    
    // Check if options have actual values
    if (values.options.every(o => o.values.length === 0)) return;

    const generateCombinations = (options: {name: string; values: string[]}[]) => {
      let results: Record<string, string>[] = [{}];
      for (const opt of options) {
        if (opt.values.length === 0) continue;
        const newResults: Record<string, string>[] = [];
        for (const res of results) {
          for (const val of opt.values) {
            newResults.push({ ...res, [opt.name]: val });
          }
        }
        results = newResults;
      }
      return results;
    };

    const combinations = generateCombinations(values.options);
    
    // Merge with existing variants to preserve inputted prices/stocks
    const newVariants = combinations.map(combo => {
      const existing = values.variants.find(v => JSON.stringify(v.optionChoices) === JSON.stringify(combo));
      if (existing) return existing;
      return { sku: "", price: values.price || "0", stock: values.stock || "0", optionChoices: combo };
    });

    setValues(prev => ({ ...prev, variants: newVariants }));
  }, [values.options, values.hasVariants]); // We don't include values.variants in dep array intentionally!

  function toggleCollection(id: string) {
    if (values.collectionIds.includes(id)) {
      setValues({ ...values, collectionIds: values.collectionIds.filter(x => x !== id) });
    } else {
      setValues({ ...values, collectionIds: [...values.collectionIds, id] });
    }
  }

  async function createCollectionInline() {
    if (!newCollectionName) return;
    const res = await fetch("/api/admin/collections", {
      method: "POST",
      body: JSON.stringify({ name: newCollectionName })
    });
    if (res.ok) {
      const coll = await res.json();
      setLocalCollections([...localCollections, coll]);
      setValues({ ...values, collectionIds: [...values.collectionIds, coll.id] });
      setNewCollectionName("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = values.id ? `/api/admin/products/${values.id}` : "/api/admin/products";
    const method = values.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        price: parseFloat(values.price || "0"),
        comparePrice: values.comparePrice ? parseFloat(values.comparePrice) : null,
        costPrice: values.costPrice ? parseFloat(values.costPrice) : null,
        stock: parseInt(values.stock || "0", 10),
      })
    });

    setSaving(false);
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert("Failed to save product");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6 items-start pb-20">
      <div className="lg:col-span-2 space-y-5">
        <div className="admin-card space-y-4">
          <h3 className="font-extrabold text-ink">Basic Details</h3>
          <div>
            <label className="admin-label">Product Name *</label>
            <input className="admin-input" required value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="e.g. Premium White T-Shirt" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">SKU</label>
              <input className="admin-input" value={values.sku} onChange={(e) => setValues({ ...values, sku: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Slug</label>
              <input className="admin-input" value={values.slug} onChange={(e) => setValues({ ...values, slug: e.target.value })} placeholder="Leave empty to auto-generate" />
            </div>
          </div>
          <div>
            <label className="admin-label">Description (HTML supported)</label>
            <textarea className="admin-input" rows={6} value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} />
          </div>
        </div>

        <div className="admin-card space-y-4">
          <h3 className="font-extrabold text-ink">Media</h3>
          <p className="text-xs text-sub -mt-2 mb-2">The first image will be used as the main product thumbnail.</p>
          <div className="flex flex-wrap gap-4 mb-4">
            {values.images.map((img, i) => (
              <div key={i} className="relative w-24 h-24 border rounded overflow-hidden bg-gray-50">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setValues({...values, images: values.images.filter((_, idx) => idx !== i)})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 leading-none shadow">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
          <ImageUploader value="" onChange={(url) => setValues({ ...values, images: [...values.images, url] })} />
        </div>

        <div className="admin-card space-y-4">
          <h3 className="font-extrabold text-ink">Pricing & Inventory</h3>
          {!values.hasVariants && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="admin-label">Price (PKR) *</label>
                  <input type="number" step="0.01" className="admin-input" required={!values.hasVariants} value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} />
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
              <div>
                <label className="admin-label">Stock Quantity *</label>
                <input type="number" className="admin-input" required={!values.hasVariants} value={values.stock} onChange={(e) => setValues({ ...values, stock: e.target.value })} />
              </div>
            </>
          )}

          <div className="pt-4 border-t border-line">
            <label className="flex items-center gap-2 text-sm font-semibold mb-4">
              <input type="checkbox" checked={values.hasVariants} onChange={(e) => setValues({ ...values, hasVariants: e.target.checked })} />
              This product has options, like size or color
            </label>

            {values.hasVariants && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {values.options.map((opt, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-line">
                      <div className="flex justify-between items-center mb-3">
                        <input 
                          className="admin-input w-1/3 bg-white" 
                          placeholder="Option name (e.g. Size)" 
                          value={opt.name} 
                          onChange={(e) => {
                            const newOpts = [...values.options];
                            newOpts[idx].name = e.target.value;
                            setValues({ ...values, options: newOpts });
                          }} 
                        />
                        <button type="button" onClick={() => {
                          const newOpts = values.options.filter((_, i) => i !== idx);
                          setValues({ ...values, options: newOpts });
                        }} className="text-red-500 p-2"><Trash2 size={16}/></button>
                      </div>
                      <div>
                        <label className="admin-label text-[10px]">Option Values (Comma separated)</label>
                        <input 
                          className="admin-input bg-white" 
                          placeholder="e.g. Small, Medium, Large" 
                          value={opt.values.join(", ")}
                          onChange={(e) => {
                            const vals = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                            const newOpts = [...values.options];
                            newOpts[idx].values = vals;
                            setValues({ ...values, options: newOpts });
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                  
                  <button type="button" onClick={() => setValues({ ...values, options: [...values.options, { name: "", values: [] }] })} className="text-[13px] font-bold text-brand flex items-center gap-1">
                    <Plus size={16} /> Add another option
                  </button>
                </div>

                {values.variants.length > 0 && (
                  <div>
                    <h4 className="font-bold text-sm text-ink mb-3">Generated Variants</h4>
                    <div className="overflow-x-auto border border-line rounded-lg">
                      <table className="w-full text-left text-[13px]">
                        <thead className="bg-gray-50 border-b border-line">
                          <tr>
                            <th className="p-3 font-semibold text-sub">Variant</th>
                            <th className="p-3 font-semibold text-sub w-24">Price</th>
                            <th className="p-3 font-semibold text-sub w-20">Stock</th>
                            <th className="p-3 font-semibold text-sub w-28">SKU</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {values.variants.map((v, i) => (
                            <tr key={i}>
                              <td className="p-3 font-medium text-ink">
                                {Object.values(v.optionChoices).join(" / ")}
                              </td>
                              <td className="p-2">
                                <input className="admin-input p-1.5 h-8 text-xs" type="number" required value={v.price} onChange={(e) => {
                                  const newVars = [...values.variants];
                                  newVars[i].price = e.target.value;
                                  setValues({ ...values, variants: newVars });
                                }} />
                              </td>
                              <td className="p-2">
                                <input className="admin-input p-1.5 h-8 text-xs" type="number" required value={v.stock} onChange={(e) => {
                                  const newVars = [...values.variants];
                                  newVars[i].stock = e.target.value;
                                  setValues({ ...values, variants: newVars });
                                }} />
                              </td>
                              <td className="p-2">
                                <input className="admin-input p-1.5 h-8 text-xs" placeholder="SKU" value={v.sku} onChange={(e) => {
                                  const newVars = [...values.variants];
                                  newVars[i].sku = e.target.value;
                                  setValues({ ...values, variants: newVars });
                                }} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="admin-card space-y-4">
          <h3 className="font-extrabold text-ink">Search Engine Optimization</h3>
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
