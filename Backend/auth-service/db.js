const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'postgres',
  database: process.env.PGDATABASE || 'stories_audio_auth',
  password: process.env.PGPASSWORD || '123456',
  port: process.env.PGPORT || 5432,
});

module.exports = pool;

