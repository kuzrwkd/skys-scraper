module.exports = {
  apps: [
    {
      name: 'skys-scraper-app',
      script: 'dist/Products/Driver/Web/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'skys-scraper-cron-app',
      script: 'dist/Products/Driver/Batch/index.js',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '*/3 * * * *',
      watch: false,
      wait_ready: true,
      listen_timeout: 100000,
      autorestart: false,
    },
  ],
};
