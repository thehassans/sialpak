const { MongoMemoryReplSet } = require('mongodb-memory-server');
const { execSync } = require('child_process');

async function build() {
  console.log("Starting MongoMemoryReplSet...");
  const replSet = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
  
  const uri = replSet.getUri();
  process.env.DATABASE_URL = uri;
  console.log("Memory Mongo Started at:", uri);
  
  try {
    console.log("Running prisma generate...");
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log("Running prisma db push...");
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    
    console.log("Running next build...");
    execSync('npx next build', { stdio: 'inherit' });
    
    console.log("Build successful!");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  } finally {
    await replSet.stop();
  }
}

build();
