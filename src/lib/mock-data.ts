import type { ArticleType } from "./types";

export const MOCK_ARTICLES: ArticleType[] = [
  {
    id: "1",
    title: "Best Skincare Routine for Dry Skin in Winter",
    excerpt: "Discover the ultimate skincare regimen to keep your skin hydrated and glowing during the cold months. Expert-approved tips and products inside.",
    image: "https://picsum.photos/seed/article1/600/400",
    category: "Skin Care",
    date: "Jun 28, 2025",
    slug: "skincare-routine-dry-skin"
  },
  {
    id: "2",
    title: "Buying Guide: HVAC Systems for Pakistan Climate",
    excerpt: "Everything you need to know about choosing the right heating and cooling system for your home in Pakistan's diverse climate zones.",
    image: "https://picsum.photos/seed/article2/600/400",
    category: "Home & Living",
    date: "Jun 22, 2025",
    slug: "hvac-buying-guide"
  },
  {
    id: "3",
    title: "Fashion Trends: What to Wear This Summer",
    excerpt: "From breezy linens to bold prints, explore the top fashion trends dominating the summer season. Stay stylish and comfortable in the heat.",
    image: "https://picsum.photos/seed/article3/600/400",
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
