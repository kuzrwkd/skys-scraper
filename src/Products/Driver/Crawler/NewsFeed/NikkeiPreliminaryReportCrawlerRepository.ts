/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';

/**
 * Products
 */
import { options } from '@/Products/Driver/Crawler/config';

/**
 * Tools
 */
import { Exception } from '@/Tools/Exceptions';

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;
  private crawlingErrorObject;

  constructor(@inject('Log') private log: Tools.ILog, @inject('DayJs') private dayjs: Tools.IDayJs) {
    this.logger = log.createLogger;
  }

  /**
   * 日経速報のクローラー
   * @param u - string
   * @throws Exception.CrawlingError クローリングに失敗した時
   */
  async crawler(u) {
    try {
      const data: NewsFeed.PreliminaryReport[] = [];
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();

      this.logger.info('クローリング開始', this.log.startCrawling(u));

      const startTime = this.dayjs.processStartTime;
      await page.goto(u);
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');
      const endTime = this.dayjs.processEndTime(startTime);
      const preliminaryReportUrl = [];

      if (preliminaryReportLinkList.length === 0) {
        (() => {
          this.crawlingErrorObject = {
            url: u,
            result: preliminaryReportLinkList,
            time: endTime,
          };
          throw new Exception.CrawlingError();
        })();
      } else {
        for (const link of preliminaryReportLinkList) {
          const url: string = await (await link.getProperty('href')).jsonValue();
          await preliminaryReportUrl.push(url);
        }

        this.logger.info('クローリング完了', this.log.successCrawling(u, preliminaryReportUrl, endTime));
      }

      // 各記事ページのタイトル投稿日時、更新日時を取得
      const crawlingData = (
        await Promise.allSettled(
          preliminaryReportUrl.map(async (url: string) => {
            const page = await browser.newPage();
            this.logger.info('クローリング開始', this.log.startCrawling(url));
            const startTime = this.dayjs.processStartTime;
            await page.goto(url);

            const title = (await page.$('h1.title_tyodebu')) ?? null;
            const createdAt = (await page.$('[class^="TimeStamp_"] > time')) ?? null;
            const updateAt = (await page.$('[class^="TimeStamp_"] > span > time')) ?? null;

            const endTime = this.dayjs.processEndTime(startTime);
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

            if (result.title == null && result.articleCreatedAt == null && result.articleUpdatedAt == null) {
              this.crawlingErrorObject = { url, result, time: endTime };
              throw new Exception.CrawlingError();
            }

            this.logger.info('クローリング完了', this.log.successCrawling(url, result, endTime));
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
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.log.failed(err.constructor.name, err.stack));
      }
      if (err instanceof Exception.CrawlingError) {
        this.logger.error(
          'クローリング失敗',
          this.log.failedCrawling(
            this.crawlingErrorObject.url,
            this.crawlingErrorObject.result,
            this.crawlingErrorObject.time,
            err.constructor.name,
            err.stack,
          ),
        );
      }
      return null;
    }
  }
}
