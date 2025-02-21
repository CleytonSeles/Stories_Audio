const fastify = require('fastify')({ logger: true });

// Proxy para auth-service
fastify.register(require('fastify-http-proxy'), {
  upstream: 'http://localhost:3001',
  prefix: '/auth', // todas as rotas de /auth serão redirecionadas para auth-service
  rewritePrefix: '/auth',
});

// Proxy para audio-service
fastify.register(require('fastify-http-proxy'), {
  upstream: 'http://localhost:3002',
  prefix: '/audio', // todas as rotas de /audio serão redirecionadas para audio-service
  rewritePrefix: '/audio',
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
