const postgres = require('postgres');
require('dotenv').config();

async function test() {
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  try {
    const result = await sql`SELECT 1 as connected`;
    console.log('Successfully connected:', result);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await sql.end();
  }
}

test();
