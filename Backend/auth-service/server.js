const fastify = require('fastify')({ logger: true });
const jwt = require('fastify-jwt');
const pool = require('./db');

fastify.register(require('fastify-formbody'));
fastify.register(jwt, { secret: 'supersecret' });

fastify.post('/auth/signup', async (request, reply) => {
  const { username, password } = request.body;

  // Verificar se o usuário já existe
  const { rowCount } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (rowCount > 0) {
    return reply.status(400).send({ error: 'Usuário já existe' });
  }

  // Criar novo usuário
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
  reply.send({ message: 'Usuário criado com sucesso' });
});

fastify.post('/auth/login', async (request, reply) => {
  const { username, password } = request.body;

  // Verificar credenciais do usuário
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
  if (rows.length === 0) {
    return reply.status(400).send({ error: 'Credenciais inválidas' });
  }

  // Gerar token JWT
  const token = fastify.jwt.sign({ username });
  reply.send({ token });
});

fastify.get('/auth/me', async (request, reply) => {
  try {
    await request.jwtVerify();
    reply.send(request.user);
  } catch (err) {
    reply.send(err);
  }
});

fastify.get('/auth/users', async (request, reply) => {
  const { rows } = await pool.query('SELECT username FROM users');
  reply.send(rows);
});

const start = async () => {
  try {
    await fastify.listen(3001);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
