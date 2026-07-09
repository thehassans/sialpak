import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    if (p.name.includes("Cat Grooming")) {
      await prisma.product.update({
        where: { id: p.id },
        data: { images: JSON.stringify(["/uploads/product_catkit_1783567212120.png"]) }
      });
      console.log("Fixed Cat Grooming Kit image!");
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
