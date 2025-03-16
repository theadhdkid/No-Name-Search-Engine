const Fastify = require('fastify');
const path = require('path');
const AutoLoad = require('@fastify/autoload');

// ✅ Initialize Fastify with logging enabled
const fastify = Fastify({ logger: true });

console.log('✨ Starting Fastify server... Let’s build something amazing! 🚀');

// ✅ Load all plugins
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: {},
});
console.log('📌 Plugins loaded! Every great app starts with solid building blocks. 💪');

// ✅ Load all routes
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: {},
});
console.log('🛤️ Routes loaded! Your API is ready to handle requests. 🌍');

// ✅ Add a test route to confirm the server works
fastify.get('/', async (request, reply) => {
  return { message: 'Fastify is running! Keep pushing forward! 🚀' };
});

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
