import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import AutoLoad from '@fastify/autoload';
import prismaPlugin from '../plugins/prisma.js'; // ✅ Import Prisma plugin
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DO NOT TOUCH

export async function build(t) {
  const prisma = new PrismaClient();

  // CREATING FASTIFY INSTANCE
  const app = Fastify({ logger: false });

  // REGISTERING PRISMA
  app.register(prismaPlugin);

  // loading all non-API routes (excluding `/api`) (dubug)
  app.register(AutoLoad, {
    dir: path.join(__dirname, '../routes'),
    ignorePattern: /api/, // prevents double-loading `api/` (redundant but a debug and it works so dont touch)
    options: {},
  });

  // load API routes
  app.register(AutoLoad, {
    dir: path.join(__dirname, '../routes/api'),
    options: {},
  });

  // connect to Prisma database before tests run
  await prisma.$connect();

  t.prisma = prisma;

  // cleanup after each test (reset DB)
  t.afterEach(async () => {
    await prisma.$executeRawUnsafe('DELETE FROM Favorite');
  });

  //  Cleanup after all tests
  // t.after(async () => {
  //   await app.close();
  //   await prisma.$disconnect();
  // });

  // Print loaded routes for debugging
  app.ready(() => {
    console.log(app.printRoutes());
  });

  return app;
}
