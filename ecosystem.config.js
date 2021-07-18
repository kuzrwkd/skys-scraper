module.exports = {
  apps: [
    {
      name: 'skys-scraper-app',
      script: 'npm run start:dev',
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
      script: 'npm run start:batch',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '*/3 * * * *',
      watch: false,
      autorestart: false,
    },
  ],
};
