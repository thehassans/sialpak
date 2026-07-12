export interface ProductType {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  images: string; // JSON-stringified array
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  status: string;
  category?: { name: string; slug: string } | null;
}

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  _count?: { products: number };
}

export interface BannerType {
  id: string;
  title: string;
  subtitle: string | null;
  eyebrow: string | null;
  image: string;
  mobileImage?: string | null;
  link: string;
  bgColorFrom: string;
  bgColorTo: string;
  textColor: string;
  buttonText: string;
  isActive: boolean;
  alignLeft: boolean;
  imageFit: string;
  product?: ProductType | null;
}

export interface ArticleType {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

export interface CollectionType {
  id: string;
  name: string;
  slug: string;
  color: string;
}
