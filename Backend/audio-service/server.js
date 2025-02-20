const fastify = require('fastify')({ logger: true });
const pool = require('./db');
const path = require('path');
const fs = require('fs');

fastify.register(require('fastify-multipart'));

fastify.post('/audio/upload', async (request, reply) => {
  const parts = request.parts();
  for await (const part of parts) {
    if (part.file) {
      const filePath = path.join(__dirname, 'uploads', part.filename);
      await pump(part.file, fs.createWriteStream(filePath));
      await pool.query('INSERT INTO audios (filename, user_id) VALUES ($1, $2)', [part.filename, 1]);
    }
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
    await fastify.listen(3002);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
