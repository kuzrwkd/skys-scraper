import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';
import { Exception } from '@/Tools/Exceptions';
import { options } from '@/Products/Driver/Crawler/config';

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;

  constructor(@inject('Log') private log: Tools.ILog, @inject('DayJs') private dayjs: Tools.IDayJs) {
    this.logger = log.createLogger;
  }

  /**
   * 日経速報のクローラー
   * @throws Crawler クローリングに失敗した時
   */
  async crawler() {
    try {
      const data: NewsFeed.PreliminaryReport[] = [];
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();
      this.logger.info('クローリング開始', this.log.crawlingStart('https://www.nikkei.com/news/category/markets/'));
      await page.goto('https://www.nikkei.com/news/category/markets/');
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');

      if (preliminaryReportLinkList.length === 0) {
        this.logger.error(
          'クローリング失敗',
          this.log.crawlingFailed('https://www.nikkei.com/news/category/markets/', {}),
        );
        this.sendCrawlingErrorMessage('クローリング失敗');
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
            this.logger.info('クローリング開始', this.log.crawlingStart(url));
            const page = await browser.newPage();
            await page.goto(url);

            const title = (await page.$('h1.title_tyodebu')) ?? null;
            const createdAt = (await page.$('[class^="TimeStamp_"] > time')) ?? null;
            const updateAt = (await page.$('[class^="TimeStamp_"] > span > time')) ?? null;

            const result = {
              title: (await (await title.getProperty('textContent')).jsonValue()) as string,
              url,
              articleCreatedAt: this.dayjs.formatDate(
                (await (await createdAt.getProperty('dateTime')).jsonValue()) as string,
              ),
              articleUpdatedAt:
                updateAt == null || typeof updateAt == 'undefined'
                  ? null
                  : this.dayjs.formatDate((await (await updateAt.getProperty('dateTime')).jsonValue()) as string),
            };

            if (result.title == null && result.articleCreatedAt == null) {
              this.logger.error('クローリング失敗', this.log.crawlingFailed(url, result));
              this.sendCrawlingErrorMessage('クローリング失敗');
              return;
            }

            this.logger.info('クローリング完了', this.log.crawlingSuccess(url, result));
            return result;
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
        this.logger.error(e.message);
      }
      if (e instanceof Exception.CrawlingError) {
        this.logger.error(e.message);
      }
      return null;
    }
  }

  sendCrawlingErrorMessage(msg: string) {
    throw new Exception.CrawlingError(msg);
  }
}
