"use client";
import { useState } from "react";

export default function StorefrontSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState({
    heading_categories: initialSettings.heading_categories || "Popular Categories",
    heading_best_offers: initialSettings.heading_best_offers || "The Best Offers",
    heading_new_goods: initialSettings.heading_new_goods || "New Goods",
    marquee_text: initialSettings.marquee_text || "FOLLOW US AND GET A CHANCE TO WIN 80% OFF",
    marquee_speed: initialSettings.marquee_speed || "20"
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
        <div className="pt-4 border-t border-line">
          <label className="admin-label">Header Marquee Text</label>
          <input 
            className="admin-input" 
            value={settings.marquee_text} 
            onChange={e => setSettings({ ...settings, marquee_text: e.target.value })} 
          />
        </div>
        <div>
          <label className="admin-label">Marquee Animation Speed (Seconds)</label>
          <input 
            type="number"
            className="admin-input" 
            value={settings.marquee_speed} 
            onChange={e => setSettings({ ...settings, marquee_speed: e.target.value })} 
            min="1"
          />
          <p className="text-xs text-sub mt-1">Lower is faster. Default is 20.</p>
        </div>
        
        <button onClick={save} disabled={saving} className="btn-primary mt-4">
          {saving ? "Saving..." : "Save Headings"}
        </button>
      </div>
    </div>
  );
}
