module.exports = {
  apps: [
    {
      name: 'SKYS-SCRAPER-APP',
      script: 'dist/Products/Server/main.js',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
    },
  ],
};
