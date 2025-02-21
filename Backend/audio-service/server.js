const fastify = require('fastify')({ logger: true });
const pool = require('./db');
const path = require('path');
const fs = require('fs');
const pump = require('util').promisify(require('stream').pipeline);

fastify.register(require('@fastify/multipart'), { attachFieldsToBody: true });

fastify.post('/audio/upload', async (request, reply) => {
  const data = await request.file();
  if (data) {
    const filePath = path.join(__dirname, 'uploads', data.filename);
    await pump(data.file, fs.createWriteStream(filePath));
    await pool.query('INSERT INTO audios (filename, user_id) VALUES ($1, $2)', [data.filename, 1]);
  }
  reply.send({ message: 'Upload successful' });
});

fastify.get('/audio/list', async (request, reply) => {
  const { rows } = await pool.query('SELECT * FROM audios');
  reply.send(rows);
});

fastify.delete('/audio/:id', async (request, reply) => {
  const { id } = request.params;
  await pool.query('DELETE FROM audios WHERE id = $1 AND user_id = $2', [id, 1]);
  reply.send({ message: 'Audio deleted' });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3002, host: '0.0.0.0' });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
