import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import AutoLoad from '@fastify/autoload';
import fs from 'fs';
import cors from '@fastify/cors';  // new import

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// DO NOT TOUCH ANY OF THIS CODE!!!!!!!!!!!!!!
const fastify = Fastify({ logger: true });
console.log('✨ Starting Fastify server... Let’s build something amazing! 🚀');


fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
});



fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: {},
});
console.log('📌 Plugins loaded! Every great app starts with solid building blocks. 💪');

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
  const fullPath = path.join(routesPath, file);

  if (fs.statSync(fullPath).isDirectory() && file !== 'api') {
    fastify.register(AutoLoad, {
      dir: fullPath,
      options: {},
    });
  }
});

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes/api'),
  options: {},
});

fastify.ready(() => {
  console.log(fastify.printRoutes());
});
console.log('🛤️ Routes loaded! Your API is ready to handle requests. 🌍');

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
