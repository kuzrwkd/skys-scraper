import { injectable } from 'tsyringe';
import puppeteer from 'puppeteer';
import { Exception } from '@/Tools/Exceptions';
import options from '@/Products/Driver/Crawler/Options';

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  /**
   * 日経速報のクローラー
   * @throws Crawler クローリングに失敗した時
   */
  async crawler() {
    try {
      const data: NewsFeed.PreliminaryReport[] = [];
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();
      await page.goto('https://www.nikkei.com/news/category/');
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');

      const preliminaryReportUrl = [];
      for (const link of preliminaryReportLinkList) {
        if (link == null) {
          this.sendCrawlingErrorMessage('日経速報のクローリングに失敗しました');
        }

        const url: string = await (await link.getProperty('href')).jsonValue();
        await preliminaryReportUrl.push(url);
      }

      // 各記事ページのタイトル投稿日時、更新日時を取得
      const crawlingData = (
        await Promise.allSettled(
          preliminaryReportUrl.map(async (url: string) => {
            const page = await browser.newPage();
            await page.goto(url);
            const title = await page.$('h1.title_tyodebu');
            const createdAt = await page.$('[class^="TimeStamp_"] > time');
            const updateAt = (await page.$('[class^="TimeStamp_"] > span > time')) ?? null;

            return {
              title: (await (await title.getProperty('textContent')).jsonValue()) as string,
              url,
              articleCreatedAt: (await (await createdAt.getProperty('dateTime')).jsonValue()) as string,
              articleUpdatedAt:
                updateAt == null ? null : ((await (await updateAt.getProperty('dateTime')).jsonValue()) as string),
            };
          }),
        )
      )
        .filter((e) => e.status === 'fulfilled')
        .map((e) => {
          if (e.status === 'fulfilled') {
            return e.value;
          }
        });

      for (const item of crawlingData) {
        await data.push(item);
      }

      await browser.close();
      return data;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      if (e instanceof Exception.CrawlingError) {
        console.error(e.message + ':' + e.name);
      }
      return null;
    }
  }

  sendCrawlingErrorMessage(msg: string) {
    throw new Exception.CrawlingError(msg);
  }
}
