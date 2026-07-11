const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    if (p.description && p.description.includes('USA')) {
      const newDesc = p.description.replace(/Fast USA Shipping/ig, 'Fast Shipping across Pakistan').replace(/USA Shipping/ig, 'Shipping Across Pakistan');
      await prisma.product.update({
        where: { id: p.id },
        data: { description: newDesc }
      });
      console.log('Updated ' + p.name);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
