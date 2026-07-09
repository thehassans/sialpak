import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Update categories
  await prisma.category.update({
    where: { slug: "beauty" },
    data: { image: "/uploads/category_beauty_1783566888080.png" }
  });
  await prisma.category.update({
    where: { slug: "fashion" },
    data: { image: "/uploads/category_fashion_1783566898450.png" }
  });
  await prisma.category.update({
    where: { slug: "electronics" },
    data: { image: "/uploads/category_electronics_1783566905767.png" }
  });
  await prisma.category.update({
    where: { slug: "pet-supplies" },
    data: { image: "/uploads/category_pets_1783566921774.png" }
  });
  await prisma.category.update({
    where: { slug: "home-kitchen" },
    data: { image: "/uploads/category_home_1783566928591.png" }
  });
  await prisma.category.update({
    where: { slug: "skin-care" },
    data: { image: "/uploads/category_skincare_1783566937972.png" }
  });
  await prisma.category.update({
    where: { slug: "health" },
    data: { image: "/uploads/category_health_1783566951828.png" }
  });

  // Update banners
  const banners = await prisma.banner.findMany();
  for (const b of banners) {
    if (b.title.includes("Skin Care")) {
      await prisma.banner.update({
        where: { id: b.id },
        data: { image: "/uploads/banner_skincare_1783566960587.png" }
      });
    } else if (b.title.includes("Cat Care")) {
      await prisma.banner.update({
        where: { id: b.id },
        data: { image: "/uploads/banner_cats_1783566968451.png" }
      });
    }
  }

  console.log("Images updated successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
