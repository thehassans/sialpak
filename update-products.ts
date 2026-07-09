import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Update products
  const products = await prisma.product.findMany();
  for (const p of products) {
    let imgPath = "[]";
    if (p.name.includes("Vitiligo")) imgPath = JSON.stringify(["/uploads/product_vitiligo_1783567196262.png"]);
    else if (p.name.includes("Serum")) imgPath = JSON.stringify(["/uploads/product_serum_1783567203930.png"]);
    else if (p.name.includes("Cat Kit")) imgPath = JSON.stringify(["/uploads/product_catkit_1783567212120.png"]);
    else if (p.name.includes("Cleanser")) imgPath = JSON.stringify(["/uploads/product_cleanser_1783567227281.png"]);
    
    if (imgPath !== "[]") {
      await prisma.product.update({
        where: { id: p.id },
        data: { images: imgPath }
      });
    }
  }

  // Update setting to PKR
  const setting = await prisma.setting.findUnique({ where: { key: "general" } });
  if (setting) {
    const val = JSON.parse(setting.value);
    val.currency = "PKR";
    await prisma.setting.update({
      where: { key: "general" },
      data: { value: JSON.stringify(val) }
    });
  }

  console.log("Products and currency updated successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
