import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        take: 1
      }
    }
  });

  for (const cat of categories) {
    if (cat.products.length > 0) {
      const productImages = JSON.parse(cat.products[0].images);
      const firstImage = productImages[0] || "https://picsum.photos/seed/" + cat.slug + "/200/200";
      await prisma.category.update({
        where: { id: cat.id },
        data: { image: firstImage }
      });
    } else {
      // Fallback to one of the generated images if they have no products
      await prisma.category.update({
        where: { id: cat.id },
        data: { image: "/uploads/promo_float1_1783568790973.png" }
      });
    }
  }

  console.log("Categories updated with product images successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
