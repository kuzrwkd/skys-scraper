import { inject, injectable } from 'tsyringe'
import puppeteer from 'puppeteer'
import { IBaseCrawlerRepository } from '@/Adapter/Gateway/Crawler/Base/IBaseCrawlerRepository'
import { Entity } from '@/Entity/NewsFeed/INewsFeedEntity'

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  constructor(@inject('BaseCrawlerRepository') private baseCrawlerRepository: IBaseCrawlerRepository) {}

  async crawler() {
    try {
      const options = this.baseCrawlerRepository.getOptions

      const data: Entity[] = []
      const browser = await puppeteer.launch(options)
      const page = await browser.newPage()
      await page.goto('https://www.nikkei.com/news/category/')
      await page.waitForSelector('#CONTENTS_MAIN')
      const preliminaryReportList = await page.$$('.m-miM09')
      for (const item of preliminaryReportList) {
        const titleElm = await item.$('.m-miM09_titleL')
        const linkElm = await item.$('.m-miM09_title > a')
        const dateElm = await item.$('.m-miM09_date')

        data.push({
          title: await (await titleElm.getProperty('textContent')).jsonValue(),
          url: await (await linkElm.getProperty('href')).jsonValue(),
          articleCreatedAt: await (await dateElm.getProperty('textContent')).jsonValue(),
          articleUpdatedAt: await (async () => {
            const regexpUpdate = new RegExp('更新')
            const updateAt: string = await (await dateElm.getProperty('textContent')).jsonValue()
            if (regexpUpdate.test(updateAt.toString())) {
              return updateAt
            }
            return null
          })(),
        })
      }

      await browser.close()
      return data
    } catch (e) {
      return null
    }
  }
}
