const { Pool } = require('pg');
require('dotenv').config()

const {
  DATABASE_URL,
  PGUSER,
  PGPASSWORD,
  PGHOST = 'db',
  PGPORT = 5432,
  PGDATABASE,
} = process.env;

let connectionString;
if (DATABASE_URL) {
  connectionString = DATABASE_URL;
} else if (PGUSER && PGPASSWORD && PGDATABASE) {
  connectionString = `postgresql://${encodeURIComponent(PGUSER)}:${encodeURIComponent(PGPASSWORD)}@${PGHOST}:${PGPORT}/${PGDATABASE}`;
} else {
  throw new Error('Database configuration missing. Set DATABASE_URL or PGUSER/PGPASSWORD/PGDATABASE in environment.');
}

const pool = new Pool({ 
  connectionString,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  }
 });

module.exports = pool;