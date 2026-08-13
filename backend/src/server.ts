import app from './app';
import { closeDatabasePool } from './config/database';

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Yoga Studio API is successfully connected and running on port ${PORT} 🚀`);
});

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\nShutting down gracefully...');
  server.close(async () => {
    console.log('HTTP server closed.');
    await closeDatabasePool();
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
