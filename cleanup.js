const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Delete the dummy products from the database completely
  const dummySlugs = [
    'vitiligo-health-cream',
    'hydrating-facial-serum',
    'premium-cat-grooming-kit',
    'vitamin-c-brightening-cleanser'
  ];

  console.log("Deleting dummy products...");
  const deleteResult = await prisma.product.deleteMany({
    where: {
      slug: {
        in: dummySlugs
      }
    }
  });
  console.log(`Deleted ${deleteResult.count} dummy products.`);

  // Clean up any empty/dummy banners or banners pointing to placehold.co
  const deleteBanners = await prisma.banner.deleteMany({
    where: {
      image: {
        contains: 'placehold.co'
      }
    }
  });
  console.log(`Deleted ${deleteBanners.count} dummy banners.`);

  // Make sure the premium products are marked as active and status: 'active'
  const updateResult = await prisma.product.updateMany({
    where: {
      status: { not: 'active' }
    },
    data: {
      status: 'active'
    }
  });
  console.log(`Activated ${updateResult.count} products.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
