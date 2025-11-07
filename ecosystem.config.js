/**
 * PM2 Ecosystem Configuration
 * Manages both API and Frontend services in one container
 */
module.exports = {
  apps: [
    {
      name: 'hris-api',
      script: 'pnpm',
      args: '--filter @hris/api start',
      cwd: '/app',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: '/tmp/pm2-api-error.log',
      out_file: '/tmp/pm2-api-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
    {
      name: 'hris-web',
      script: 'pnpm',
      args: '--filter @hris/web start',
      cwd: '/app',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/tmp/pm2-web-error.log',
      out_file: '/tmp/pm2-web-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
  ],
};

