import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@buysial.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { name: "Store Owner", email, passwordHash, role: "owner" }
  });

  const categories = [
    { name: "Beauty", slug: "beauty", image: "https://placehold.co///.png?text=Beauty" },
    { name: "Fashion", slug: "fashion", image: "https://placehold.co///.png?text=Fashion" },
    { name: "Electronics", slug: "electronics", image: "https://placehold.co///.png?text=Electronics" },
    { name: "Pet Supplies", slug: "pet-supplies", image: "https://placehold.co///.png?text=Pets" },
    { name: "Home & Kitchen", slug: "home-kitchen", image: "https://placehold.co///.png?text=Home" },
    { name: "Skin Care", slug: "skin-care", image: "https://placehold.co///.png?text=Skincare" },
    { name: "Health", slug: "health", image: "https://placehold.co///.png?text=Health" }
  ];
  for (const [i, c] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { ...c, sortOrder: i }
    });
  }

  const collections = [
    { name: "The Best Offers", slug: "best-offers", color: "#1f6fdb" },
    { name: "Beauty Essentials Sale", slug: "beauty-essentials-sale", color: "#e0483f" },
    { name: "New Goods", slug: "new-goods", color: "#2fa84f" },
    { name: "Premium Collection", slug: "premium-collection", color: "#7b5df0" }
  ];
  for (const [i, c] of collections.entries()) {
    await prisma.collection.upsert({
      where: { slug: c.slug },
      update: {},
      create: { ...c, sortOrder: i }
    });
  }

  const beauty = await prisma.category.findUnique({ where: { slug: "skin-care" } });
  const pets = await prisma.category.findUnique({ where: { slug: "pet-supplies" } });
  const bestOffers = await prisma.collection.findUnique({ where: { slug: "best-offers" } });
  const beautySale = await prisma.collection.findUnique({ where: { slug: "beauty-essentials-sale" } });
  const newGoods = await prisma.collection.findUnique({ where: { slug: "new-goods" } });

  const demoProducts = [
    { name: "Vitiligo Health Cream", price: 18.99, comparePrice: 24.99, cat: beauty, col: beautySale, img: "https://placehold.co///.png?text=Vitiligo+Cream" },
    { name: "Hydrating Facial Serum", price: 14.5, comparePrice: 19.99, cat: beauty, col: bestOffers, img: "https://placehold.co///.png?text=Facial+Serum" },
    { name: "Premium Cat Grooming Kit", price: 22.0, comparePrice: null, cat: pets, col: newGoods, img: "https://placehold.co///.png?text=Cat+Kit" },
    { name: "Vitamin C Brightening Cleanser", price: 11.25, comparePrice: 15.0, cat: beauty, col: beautySale, img: "https://placehold.co///.png?text=Cleanser" }
  ];
  for (const [i, p] of demoProducts.entries()) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: p.name,
        slug,
        description: `${p.name} — a top-selling BuySial product loved by customers.`,
        price: p.price,
        comparePrice: p.comparePrice ?? undefined,
        stock: 50 + i * 10,
        images: JSON.stringify([p.img]),
        categoryId: p.cat?.id,
        isFeatured: i < 2
      }
    });
    if (p.col) {
      await prisma.productCollection.upsert({
        where: { productId_collectionId: { productId: product.id, collectionId: p.col.id } },
        update: {},
        create: { productId: product.id, collectionId: p.col.id }
      });
    }
  }

  const banners = [
    { title: "Discount on all Skin Care products up to 25%", eyebrow: "SKIN CARE", subtitle: "Shop great deals on serums, cleansers, creams and more.", image: "https://placehold.co///.png?text=Skincare", position: "hero", bgColorFrom: "#0f2542", bgColorTo: "#173963", sortOrder: 0 },
    { title: "Premium Cat Care", eyebrow: "PET CARE", subtitle: "Countdown deal — limited time only.", image: "https://placehold.co///.png?text=Cat+Care", position: "hero", bgColorFrom: "#f3b3c6", bgColorTo: "#e895b3", textColor: "#3a1420", sortOrder: 1 }
  ];
  for (const b of banners) {
    const exists = await prisma.banner.findFirst({ where: { title: b.title } });
    if (!exists) await prisma.banner.create({ data: b });
  }

  const settings: Record<string, any> = {
    general: { storeName: "BuySial", tagline: "Your Everyday Shopping Destination", supportPhone: "+1 212-334-0212", currency: "USD", freeShippingText: "Worldwide Free Shipping" },
    seo: { metaTitle: "BuySial — Your Everyday Shopping Destination", metaDescription: "Shop beauty, fashion, electronics and more with fast worldwide shipping.", ogImage: "https://placehold.co///.png?text=BuySial", robotsIndex: true, sitemapEnabled: true },
    pixels: { ga4Id: "", metaPixelId: "", tiktokPixelId: "", snapPixelId: "", gtmId: "" },
    payments: {
      codEnabled: true,
      jazzcash: { enabled: false, merchantId: "", password: "", integritySalt: "", mode: "sandbox" },
      easypaisa: { enabled: false, storeId: "", accountNum: "", hashKey: "", mode: "sandbox" },
      payfast: { enabled: false, merchantId: "", secureKey: "", mode: "sandbox" },
      bankTransfer: { enabled: false, accountTitle: "", accountNumber: "", bankName: "", iban: "" }
    },
    logistics: {
      defaultCourier: "leopards",
      leopards: { enabled: true, apiKey: "", apiPassword: "" },
      tcs: { enabled: false, apiKey: "", costCenter: "" },
      postex: { enabled: false, apiKey: "" },
      mnp: { enabled: false, apiKey: "" }
    }
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({
      where: { key },
      update: {},
      create: { key, value: JSON.stringify(value) }
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login -> /adminlogin  email: ${email}  password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
