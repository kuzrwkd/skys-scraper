import { injectable } from 'tsyringe'
import puppeteer from 'puppeteer'

@injectable()
export class NikkeiCrawler {
  crawler() {
    ;(async () => {
      const browser = await puppeteer.launch({
        // for Docker
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {
          width: 1240,
          height: 768,
          isLandscape: true,
        },
        headless: true,
      })
      const page = await browser.newPage()
      await page.goto('https://www.bloomberg.co.jp/')
      await page.screenshot({ path: 'screenshot/screenshot.png' })

      await browser.close()
    })()
    return 'nikkei'
  }
}
