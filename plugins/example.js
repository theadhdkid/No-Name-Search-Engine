module.exports = async function (fastify, opts) {
  fastify.decorate('example', () => 'Hello from plugin!');
};
