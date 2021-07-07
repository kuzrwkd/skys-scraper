import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';
import { Exception } from '@/Tools/Exceptions';
import { options } from '@/Products/Driver/Crawler/config';

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;

  constructor(@inject('Log') private log: Tools.ILog) {
    this.logger = log.createLogger;
  }

  /**
   * 日経速報のクローラー
   * @throws Crawler クローリングに失敗した時
   */
  async crawler() {
    try {
      this.logger.log({ level: 'info', message: 'クローリング開始' });
      const data: NewsFeed.PreliminaryReport[] = [];
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();
      await page.goto('https://www.nikkei.com/news/category/markets/');
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');

      if (preliminaryReportLinkList.length === 0) {
        this.sendCrawlingErrorMessage('クローリングに失敗しました');
      }

      const preliminaryReportUrl = [];
      for (const link of preliminaryReportLinkList) {
        const url: string = await (await link.getProperty('href')).jsonValue();
        await preliminaryReportUrl.push(url);
      }

      // 各記事ページのタイトル投稿日時、更新日時を取得
      const crawlingData = (
        await Promise.allSettled(
          preliminaryReportUrl.map(async (url: string) => {
            this.logger.log({ level: 'info', message: `${url}のクローリングを開始` });
            const page = await browser.newPage();
            await page.goto(url);

            const title = (await page.$('h1.title_tyodebu')) ?? null;
            const createdAt = (await page.$('[class^="TimeStamp_"] > time')) ?? null;
            const updateAt = (await page.$('[class^="TimeStamp_"] > span > time')) ?? null;

            if (title == null && createdAt == null) {
              this.sendCrawlingErrorMessage('クローリングに失敗しました');
              return;
            }

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
      this.logger.log({ level: 'info', message: 'クローリング終了' });
      return data;
    } catch (e) {
      if (e instanceof Error) {
        this.logger.log({ level: 'error', message: e.message });
      }
      if (e instanceof Exception.CrawlingError) {
        this.logger.log({ level: 'error', message: e.name + ':' + e.message });
      }
      return null;
    }
  }

  sendCrawlingErrorMessage(msg: string) {
    throw new Exception.CrawlingError(msg);
  }
}
