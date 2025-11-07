import { config } from 'dotenv';
import { resolve } from 'path';
import { app } from './app';
import { prisma } from '@hris/database';
import { logger } from './utils/logger';

// Load .env from root directory
config({ path: resolve(__dirname, '../../../.env') });

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connected successfully');

    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on http://localhost:${PORT}`);
      logger.info(`📚 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await prisma.$disconnect();
  process.exit(0);
});

