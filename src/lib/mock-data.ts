import type { ArticleType } from "./types";

export const MOCK_ARTICLES: ArticleType[] = [
  {
    id: "1",
    title: "Best Skincare Routine for Dry Skin in Winter",
    excerpt: "Discover the ultimate skincare regimen to keep your skin hydrated and glowing during the cold months. Expert-approved tips and products inside.",
    content: "<h2>Introduction</h2><p>Winter can be harsh on your skin, especially if you already struggle with dryness. The cold air outside combined with indoor heating strips your skin of its natural moisture. But don't worry, we have the perfect routine to keep your skin plump and hydrated.</p><h2>1. Gentle Cleansing</h2><p>Start your day with a hydrating, cream-based cleanser. Avoid foaming cleansers that can strip natural oils.</p><h2>2. Hyaluronic Acid</h2><p>Apply hyaluronic acid on damp skin to lock in moisture.</p><h2>3. Rich Moisturizer</h2><p>Seal it all in with a thick ceramide-rich moisturizer. This creates a barrier against the harsh winter wind.</p>",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop",
    category: "Skin Care",
    date: "Jun 28, 2025",
    slug: "skincare-routine-dry-skin"
  },
  {
    id: "2",
    title: "Buying Guide: HVAC Systems for Pakistan Climate",
    excerpt: "Everything you need to know about choosing the right heating and cooling system for your home in Pakistan's diverse climate zones.",
    content: "<h2>Understanding Pakistan's Climate</h2><p>From the scorching summers of Sindh and Punjab to the freezing winters of Gilgit-Baltistan, choosing the right HVAC system is crucial.</p><h2>Inverter ACs</h2><p>For most plains, a DC Inverter AC provides the best balance of cooling and energy efficiency. They adjust their speed according to the room temperature, saving up to 60% on electricity bills.</p><h2>Heating Solutions</h2><p>For northern areas, consider heat pump technology or reliable gas heaters for the intense winters. Always ensure proper ventilation.</p>",
    image: "https://images.unsplash.com/photo-1581094722510-7201c10d32bb?q=80&w=1200&auto=format&fit=crop",
    category: "Home & Living",
    date: "Jun 22, 2025",
    slug: "hvac-buying-guide"
  },
  {
    id: "3",
    title: "Fashion Trends: What to Wear This Summer",
    excerpt: "From breezy linens to bold prints, explore the top fashion trends dominating the summer season. Stay stylish and comfortable in the heat.",
    content: "<h2>Embrace the Linen</h2><p>Linen is the ultimate summer fabric. It's breathable, lightweight, and effortlessly chic. Opt for pastel linen shirts or wide-leg trousers.</p><h2>Bold Prints</h2><p>This summer is all about making a statement. Tropical prints, oversized florals, and geometric patterns are everywhere.</p><h2>Comfort is Key</h2><p>Swap tight jeans for relaxed fits. Flowy dresses and relaxed-fit cotton pants are not just comfortable but highly stylish.</p>",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
    category: "Fashion",
    date: "Jun 15, 2025",
    slug: "fashion-trends-summer"
  }
];

export const FOOTER_LINKS = {
  categories: [
    { label: "Beauty", href: "/category/beauty" },
    { label: "Fashion", href: "/category/fashion" },
    { label: "Electronics", href: "/category/electronics" },
    { label: "Pet Supplies", href: "/category/pet-supplies" },
    { label: "Home & Kitchen", href: "/category/home-kitchen" },
    { label: "Skin Care", href: "/category/skin-care" },
    { label: "Health", href: "/category/health" }
  ],
  useful: [
    { label: "Track Order", href: "#" },
    { label: "Shipping & Delivery", href: "#" },
    { label: "Returns & Refunds", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" }
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Live Chat", href: "#" },
    { label: "FAQs", href: "#" }
  ]
};

export const TRUST_BADGES = [
  { icon: "Truck", title: "Free Shipping", subtitle: "On orders over PKR 2,500" },
  { icon: "RotateCcw", title: "Easy Returns", subtitle: "30-day return policy" },
  { icon: "Shield", title: "Secure Payments", subtitle: "100% protected checkout" },
  { icon: "Headphones", title: "24/7 Support", subtitle: "Dedicated help center" }
];
