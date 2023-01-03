export const options = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--single-process',
    '--disable-web-security',
    '--no-zygote',
  ],
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
};
