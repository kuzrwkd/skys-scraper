module.exports = {
  apps: [
    {
      name: 'skys-scraper-app',
      script: 'node_modules/.bin/nest start --watch',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
