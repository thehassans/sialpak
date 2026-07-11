const fs = require('fs');
const path = require('path');

async function run() {
  console.log("=== SERVER DIAGNOSTIC START ===");
  console.log("Current working directory:", process.cwd());
  
  // 1. Check environment variables
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("NODE_ENV:", process.env.NODE_ENV);

  // 2. Check if Header.tsx has the z-index fix
  const headerPath = path.join(process.cwd(), 'src/components/storefront/Header.tsx');
  if (fs.existsSync(headerPath)) {
    const content = fs.readFileSync(headerPath, 'utf8');
    if (content.includes('z-[9999]')) {
      console.log("Header.tsx: z-index fix is PRESENT (z-[9999])");
    } else if (content.includes('z-50')) {
      console.log("Header.tsx: z-index fix is MISSING (shows old z-50)");
    } else {
      console.log("Header.tsx: Unknown content");
    }
  } else {
    console.log("Header.tsx: File not found at", headerPath);
  }

  // 3. Check database contents
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  try {
    const count = await prisma.product.count();
    console.log("Database: Connected successfully.");
    console.log("Total active products in DB:", count);
    const products = await prisma.product.findMany({ select: { name: true, price: true } });
    console.log("Products list:", products);
  } catch (err) {
    console.error("Database Connection Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
  
  console.log("=== SERVER DIAGNOSTIC END ===");
}

run().catch(console.error);
