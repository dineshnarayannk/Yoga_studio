import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Environment variable validation
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`[WARNING] Database configuration missing: ${envVar} is not set in environment variables.`);
  }
}

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '4000', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'yoga_studio',
  
  // TiDB Cloud requires SSL
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, '../../cert/ca.pem'))
  },
  
  // Reasonable connection limits
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  // Connection timeout
  connectTimeout: 10000, // 10 seconds
  
  // Ensure we can use TiDB effectively
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection and verify database name
export const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Verify current database
    const [rows] = await connection.query('SELECT DATABASE() as db');
    const dbName = (rows as any[])[0].db;
    
    connection.release();
    
    if (dbName !== 'yoga_studio') {
      throw new Error(`CRITICAL: Connected to incorrect database '${dbName}'. Expected 'yoga_studio'. Initialization stopped.`);
    }
    
    return {
      connected: true,
      database: dbName,
      message: 'Successfully connected to database'
    };
  } catch (error: any) {
    console.error('[Error] Database connection failed:', error.message);
    return {
      connected: false,
      database: null,
      message: error.message
    };
  }
};

export const closeDatabasePool = async () => {
  try {
    await pool.end();
    console.log('Database pool closed safely.');
  } catch (error) {
    console.error('[Error] Error closing database pool:', error);
  }
};

export default pool;
