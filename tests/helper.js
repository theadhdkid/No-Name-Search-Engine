import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import AutoLoad from '@fastify/autoload';
import prismaPlugin from '../plugins/prisma.js'; // ✅ Import Prisma plugin
import { PrismaClient } from '@prisma/client';

// ✅ Convert `import.meta.url` to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Automatically build and tear down Fastify instance for tests
export async function build(t) {
  const prisma = new PrismaClient();

  // ✅ Create Fastify instance
  const app = Fastify({ logger: false });

  // ✅ Register Prisma plugin before anything else
  app.register(prismaPlugin);

  // ✅ Load all non-API routes (excluding `/api`)
  app.register(AutoLoad, {
    dir: path.join(__dirname, '../routes'),
    ignorePattern: /api/, // ❌ Prevents double-loading `api/`
    options: {},
  });

  // ✅ Load API routes
  app.register(AutoLoad, {
    dir: path.join(__dirname, '../routes/api'),
    options: {},
  });

  // ✅ Connect to Prisma database before tests run
  await prisma.$connect();

  t.prisma = prisma;

  // ✅ Cleanup after each test (reset DB)
  t.afterEach(async () => {
    await prisma.$executeRawUnsafe('DELETE FROM Favorite');
    await prisma.$executeRawUnsafe('DELETE FROM TestUser');
  });

  // ✅ Cleanup after all tests
  t.after(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  // ✅ Print loaded routes for debugging
  app.ready(() => {
    console.log(app.printRoutes());
  });

  return app;
}
