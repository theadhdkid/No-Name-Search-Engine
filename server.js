import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url'; // Required for __dirname equivalent in ESM
import AutoLoad from '@fastify/autoload';
import fs from 'fs';
import prismaPlugin from './plugins/prisma.js'; // Adjust the path as needed




// ✅ Define `__dirname` manually (since it's not available in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize Fastify with logging enabled
const fastify = Fastify({ logger: true });

console.log('✨ Starting Fastify server... Let’s build something amazing! 🚀');


// ✅ Load all plugins
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: {},
});
console.log('📌 Plugins loaded! Every great app starts with solid building blocks. 💪');

// ✅ Load all non-API routes (excluding `/api` directory)
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
  const fullPath = path.join(routesPath, file);

  // ✅ Ensure it's a directory before registering
  if (fs.statSync(fullPath).isDirectory() && file !== 'api') {
    fastify.register(AutoLoad, {
      dir: fullPath,
      options: {},
    });
  }
});

// ✅ Load API routes (WITHOUT adding `/api` again)
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes/api'),
  options: {}, // ❌ Remove prefix to avoid double `/api`
});

fastify.ready(() => {
  console.log(fastify.printRoutes());
});
console.log('🛤️ Routes loaded! Your API is ready to handle requests. 🌍');

// ✅ Start the Fastify server
const start = async () => {
  try {
    await fastify.listen({ port: 5001, host: '0.0.0.0' });
    console.log('🚀 Server is live at http://localhost:5001');
    console.log('🔥 Every great project starts with a single step. Keep going! 💯');
  } catch (err) {
    console.error('❌ Oops! Something went wrong:', err);
    process.exit(1);
  }
};

start();
