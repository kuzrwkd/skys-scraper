module.exports = {
  apps: [
    {
      name: 'SKYS-SCRAPER-CRON-APP',
      script: 'echo "cron_app run"',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '03-59/3 * * * *', // 3で割り切れる`分`の時に起動させる（3分, 6分, 9分, 12分, ..., 57分）
      watch: true,
      listen_timeout: 100000,
      autorestart: false,
    },
  ],
};
