const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    if (p.description && p.description.includes('UK')) {
      const newDesc = p.description.replace(/Fast UK Shipping/ig, 'Fast Shipping across Pakistan').replace(/UK Shipping/ig, 'Shipping Across Pakistan');
      await prisma.product.update({
        where: { id: p.id },
        data: { description: newDesc }
      });
      console.log('Updated ' + p.name);
    }
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
