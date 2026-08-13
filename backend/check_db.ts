import pool, { testDatabaseConnection } from './src/config/database';

async function run() {
  const status = await testDatabaseConnection();
  console.log('Status:', status);
  if (!status.connected || status.database !== 'yoga_studio') {
    console.error('Not connected to yoga_studio');
    process.exit(1);
  }
  const [tables] = await pool.query('SHOW TABLES');
  console.log('Existing tables:', tables);
  process.exit(0);
}
run();
