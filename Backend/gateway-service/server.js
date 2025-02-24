const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Habilitar CORS
fastify.register(cors, {
  origin: '*', // Permitir todas as origens, ajuste conforme necessário
});

// Proxy para auth-service
fastify.register(require('fastify-http-proxy'), {
  upstream: 'http://localhost:3001',
  prefix: '/auth', // todas as rotas de /auth serão redirecionadas para auth-service
  rewritePrefix: '/auth',
  onError: (err, req, res) => {
    fastify.log.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  },
});

// Proxy para audio-service
fastify.register(require('fastify-http-proxy'), {
  upstream: 'http://localhost:3002',
  prefix: '/audio', // todas as rotas de /audio serão redirecionadas para audio-service
  rewritePrefix: '/audio',
  onError: (err, req, res) => {
    fastify.log.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  },
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
