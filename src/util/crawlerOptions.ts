export const options = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
};
