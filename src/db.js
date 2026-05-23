const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id           SERIAL PRIMARY KEY,
      title        VARCHAR(255) NOT NULL,
      slug         VARCHAR(255) UNIQUE NOT NULL,
      excerpt      TEXT,
      content      TEXT NOT NULL,
      cover_image  VARCHAR(500),
      tags         TEXT[] DEFAULT '{}',
      published    BOOLEAN DEFAULT false,
      published_at TIMESTAMP,
      created_at   TIMESTAMP DEFAULT NOW(),
      updated_at   TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS projects (
      id            SERIAL PRIMARY KEY,
      title         VARCHAR(255) NOT NULL,
      description   TEXT,
      emoji         VARCHAR(10) DEFAULT '🚀',
      tags          TEXT[] DEFAULT '{}',
      url           VARCHAR(500),
      display_order INT DEFAULT 0,
      visible       BOOLEAN DEFAULT true,
      created_at    TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT
    );

    ALTER TABLE posts     ADD COLUMN IF NOT EXISTS cover_image VARCHAR(500);
    ALTER TABLE projects  ADD COLUMN IF NOT EXISTS cover_image VARCHAR(500);
  `);
}

init().catch(err => console.error('Erro ao inicializar banco:', err.message));

module.exports = pool;
