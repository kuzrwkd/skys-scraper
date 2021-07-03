import { inject, injectable } from 'tsyringe'
import puppeteer from 'puppeteer'
import { CrawlingError } from '@/Driver/Crawler/Exception/CrawlingError'
import { IBaseCrawlerRepository } from '@/Adapter/CrawlerGateway/Base/IBaseCrawlerRepository'
import { PreliminaryReport } from '@/Adapter/CrawlerGateway/Nikkei/INikkeiPreliminaryReportCrawlerRepository'

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  constructor(@inject('BaseCrawlerRepository') private baseCrawlerRepository: IBaseCrawlerRepository) {}

  /**
   * 日経速報のクローラー
   * @throws CrawlingError クローリングに失敗した時
   */
  async crawler() {
    try {
      const options = this.baseCrawlerRepository.getOptions

      const data: PreliminaryReport[] = []
      const browser = await puppeteer.launch(options)
      const page = await browser.newPage()
      await page.goto('https://www.nikkei.com/news/category/')
      await page.waitForSelector('#CONTENTS_MAIN')
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a')

      const preliminaryReportUrl = []
      for (const link of preliminaryReportLinkList) {
        if (link == null) {
          throw new CrawlingError('日経速報のクローリングに失敗しました')
        }

        const url: string = await (await link.getProperty('href')).jsonValue()
        await preliminaryReportUrl.push(url)
      }

      const crawlingData = (
        await Promise.allSettled(
          preliminaryReportUrl.map(async (url: string) => {
            const page = await browser.newPage()
            await page.goto(url)
            const title = await page.$('h1.title_tyodebu')
            const createdAt = await page.$('[class^="TimeStamp_"] > time')
            const updateAt = (await page.$('[class^="TimeStamp_"] > span > time')) ?? null

            return {
              title: (await (await title.getProperty('textContent')).jsonValue()) as string,
              url,
              articleCreatedAt: (await (await createdAt.getProperty('dateTime')).jsonValue()) as string,
              articleUpdatedAt:
                updateAt == null ? null : ((await (await updateAt.getProperty('dateTime')).jsonValue()) as string),
            }
          }),
        )
      )
        .filter((e) => e.status === 'fulfilled')
        .map((e) => {
          if (e.status === 'fulfilled') {
            return e.value
          }
        })

      for (const item of crawlingData) {
        await data.push(item)
      }

      await browser.close()
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
      if (e instanceof CrawlingError) {
        console.error(e.message + ':' + e.name)
      }
      return null
    }
  }
}
