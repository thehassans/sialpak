import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.banner.updateMany({
    where: { eyebrow: "SKIN CARE" },
    data: { image: "/uploads/banner_skincare_1783568776197.png" }
  });

  await prisma.banner.updateMany({
    where: { eyebrow: "PET CARE" },
    data: { image: "/uploads/banner_petcare_1783568784398.png" }
  });

  console.log("Hero banners updated successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
