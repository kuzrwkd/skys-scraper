/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';

/**
 * Options
 */
import { options } from '@/Products/Driver/Crawler/config';

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;

  constructor(@inject('Log') private logTool: Tools.ILogTool, @inject('DateTool') private dateTool: Tools.IDateTool) {
    this.logger = logTool.createLogger();
  }

  /**
   * 日経速報のクローラー
   * @param u - urlが入る
   * @param { name } - organizationNameが入る
   */
  async crawler(u: string, { name }: NewsFeed.Organization) {
    const organizationName = name;

    try {
      const data: NewsFeed.NewsFeedCrawlerResult[] = [];
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();

      this.logger.info(`[${organizationName}] クローリング開始`, this.logTool.startCrawling());

      const startTime = this.dateTool.processStartTime();
      await page.goto(u);
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');

      this.logger.info(`[${organizationName}] クローリング実行`, this.logTool.processCrawling(u));

      const endTime = this.dateTool.processEndTime(startTime);
      const preliminaryReportUrl: string[] = [];

      for (const link of preliminaryReportLinkList) {
        const url: string | null = (await (await link.getProperty('href'))?.jsonValue()) ?? null;
        if (url != null) {
          preliminaryReportUrl.push(url);
        }
      }

      this.logger.info(
        `[${organizationName}] クローリング完了`,
        this.logTool.successCrawling<string[]>(preliminaryReportUrl, endTime),
      );

      // 各記事ページのタイトル投稿日時、更新日時を取得
      const crawlingData = (
        await Promise.allSettled(
          preliminaryReportUrl.map(async (url: string) => {
            const page = await browser.newPage();
            this.logger.info(`[${organizationName}] クローリング開始`, this.logTool.startCrawling());
            const startTime = this.dateTool.processStartTime();
            await page.goto(url);

            const title = (await page.$('h1[class^="title_"]')) ?? null;
            const createdAt = (await page.$('[class^="TimeStamp_"] > time')) ?? null;
            const updateAt = (await page.$('[class^="TimeStamp_"] > span > time')) ?? null;

            this.logger.info(`[${organizationName}] クローリング実行`, this.logTool.processCrawling(url));

            const endTime = this.dateTool.processEndTime(startTime);
            const result: NewsFeed.NewsFeedCrawlerResult = {
              title: ((await (await title?.getProperty('textContent'))?.jsonValue()) as string) ?? null,
              url,
              articleCreatedAt: this.dateTool.formatDate(
                ((await (await createdAt?.getProperty('dateTime'))?.jsonValue()) as string) ?? null,
              ),
              articleUpdatedAt:
                updateAt == null || typeof updateAt == 'undefined'
                  ? null
                  : this.dateTool.formatDate(
                      (await (await updateAt?.getProperty('dateTime'))?.jsonValue()) as string,
                    ) ?? null,
            };

            if (result.title == null) {
              this.logger.info(
                `[${organizationName}] 記事タイトルが見つかりませんでした`,
                this.logTool.processCrawling(url),
              );
            }

            if (result.articleCreatedAt == null) {
              this.logger.info(
                `[${organizationName}] 記事投稿日時が見つかりませんでした`,
                this.logTool.processCrawling(url),
              );
            }

            if (result.articleUpdatedAt == null) {
              this.logger.info(
                `[${organizationName}] 記事更新日が見つかりませんでした`,
                this.logTool.processCrawling(url),
              );
            }

            this.logger.info(
              `[${organizationName}] クローリング完了`,
              this.logTool.successCrawling<NewsFeed.NewsFeedCrawlerResult>(result, endTime),
            );
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
        if (typeof item !== 'undefined') {
          data.push(item);
        }
      }

      await browser.close();
      return data;
    } catch (err) {
      this.logger.error(err.message, this.logTool.failed(err.constructor.name, err.stack as string));
      return null;
    }
  }
}
