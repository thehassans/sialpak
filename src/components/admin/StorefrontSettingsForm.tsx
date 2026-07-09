"use client";
import { useState } from "react";

export default function StorefrontSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState({
    heading_categories: initialSettings.heading_categories || "Popular Categories",
    heading_best_offers: initialSettings.heading_best_offers || "The Best Offers",
    heading_new_goods: initialSettings.heading_new_goods || "New Goods",
  });
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    alert("Storefront headings updated successfully!");
  }

  return (
    <div className="admin-card max-w-2xl">
      <div className="space-y-6">
        <div>
          <label className="admin-label">Categories Section Heading</label>
          <input 
            className="admin-input" 
            value={settings.heading_categories} 
            onChange={e => setSettings({ ...settings, heading_categories: e.target.value })} 
          />
        </div>
        <div>
          <label className="admin-label">Best Offers Section Heading</label>
          <input 
            className="admin-input" 
            value={settings.heading_best_offers} 
            onChange={e => setSettings({ ...settings, heading_best_offers: e.target.value })} 
          />
        </div>
        <div>
          <label className="admin-label">New Goods Section Heading</label>
          <input 
            className="admin-input" 
            value={settings.heading_new_goods} 
            onChange={e => setSettings({ ...settings, heading_new_goods: e.target.value })} 
          />
        </div>
        
        <button onClick={save} disabled={saving} className="btn-primary mt-4">
          {saving ? "Saving..." : "Save Headings"}
        </button>
      </div>
    </div>
  );
}
