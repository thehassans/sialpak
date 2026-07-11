const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Define categories
  const categoriesToCreate = [
    { name: 'Skincare', slug: 'skincare' },
    { name: 'Haircare', slug: 'haircare' },
    { name: "Men's Health", slug: 'mens-health' },
    { name: 'Treatments', slug: 'treatments' }
  ];

  const categoryMap = {};
  for (const cat of categoriesToCreate) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (existing) {
      categoryMap[cat.slug] = existing.id;
    } else {
      const created = await prisma.category.create({ data: cat });
      categoryMap[cat.slug] = created.id;
    }
  }

  const products = await prisma.product.findMany();

  for (const p of products) {
    const name = p.name.toLowerCase();
    let categoryId = null;

    if (name.includes('anua') || name.includes('cream') || name.includes('skincare')) {
      categoryId = categoryMap['skincare'];
    }
    if (name.includes('hair') || name.includes('nutrafol') || name.includes('k18')) {
      categoryId = categoryMap['haircare'];
    }
    if (name.includes('testosterone') || name.includes('male') || name.includes('member xxl') || name.includes('biomanix')) {
      categoryId = categoryMap['mens-health'];
    }
    if (name.includes('treatment') || name.includes('piles') || name.includes('eczema') || name.includes('melasma')) {
      categoryId = categoryMap['treatments'];
    }

    if (categoryId) {
      await prisma.product.update({
        where: { id: p.id },
        data: {
          categoryId: categoryId
        }
      });
      console.log(`Categorized ${p.name}`);
    }
  }

  // Delete Uncategorized category if it exists
  const uncat = await prisma.category.findUnique({ where: { slug: 'uncategorized' } });
  if (uncat) {
    await prisma.category.delete({ where: { slug: 'uncategorized' } });
    console.log('Deleted Uncategorized category');
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
