/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';

/**
 * Utils
 */
import { options } from '@/util/crawlerOptions';

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;

  constructor(@inject('LogUtil') private logUtil: Util.ILogUtil, @inject('DateUtil') private dateUtil: Util.IDateUtil) {
    this.logger = this.logUtil.createLogger();
  }

  /**
   * 日経速報のクローラー
   * @param u - urlが入る
   * @param organization
   * @param tracking_id
   */
  async handle(u: string, organization: NewsFeed.Organization, tracking_id: string) {
    const { name: organizationName } = organization;
    try {
      const listCrawlerTrackingId = `${tracking_id}-lc-${this.logUtil.createRandomString()}`;
      const data: NewsFeed.NewsFeedCrawlerResult[] = [];
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();

      this.logger.info(`[${organizationName}] クローリング開始`, this.logUtil.getStartCrawlingParams({ tracking_id }));

      const startTime = this.dateUtil.processStartTime();
      await page.goto(u);
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');

      this.logger.info(
        `[${organizationName}] クローリング実行`,
        this.logUtil.getProcessCrawlingParams({ tracking_id: listCrawlerTrackingId, url: u }),
      );

      const endTime = this.dateUtil.processEndTime(startTime);
      const preliminaryReportUrl: string[] = [];

      for (const link of preliminaryReportLinkList) {
        const url: string | undefined = await (await link.getProperty('href'))?.jsonValue();
        if (url) {
          preliminaryReportUrl.push(url);
        }
      }

      this.logger.info(
        `[${organizationName}] クローリング完了`,
        this.logUtil.getSuccessCrawlingParams<string[]>({
          tracking_id: listCrawlerTrackingId,
          time: endTime,
          result: preliminaryReportUrl,
        }),
      );

      // 各記事ページのタイトル投稿日時、更新日時を取得
      const crawlingData = (
        await Promise.allSettled(
          preliminaryReportUrl.map(async (url: string) => {
            const individualCrawlerTrackingId = `${listCrawlerTrackingId}-ic-${this.logUtil.createRandomString()}`;
            const page = await browser.newPage();
            this.logger.info(
              `[${organizationName}] クローリング開始`,
              this.logUtil.getStartCrawlingParams({ tracking_id: individualCrawlerTrackingId }),
            );
            const startTime = this.dateUtil.processStartTime();
            await page.goto(url);

            const title = await page.$('h1[class^="title_"]');
            const createdAt = await page.$('[class^="TimeStamp_"] > time');
            const updateAt = await page.$('[class^="TimeStamp_"] > span > time');

            this.logger.info(
              `[${organizationName}] クローリング実行`,
              this.logUtil.getProcessCrawlingParams({ tracking_id: individualCrawlerTrackingId, url }),
            );

            const endTime = this.dateUtil.processEndTime(startTime);
            const result: NewsFeed.NewsFeedCrawlerResult = {
              id: individualCrawlerTrackingId,
              title: (await (await title?.getProperty('textContent'))?.jsonValue()) as string,
              url,
              article_created_at: this.dateUtil.formatDate(
                (await (await createdAt?.getProperty('dateTime'))?.jsonValue()) as string,
              ),
              article_updated_at:
                !updateAt || typeof updateAt == 'undefined'
                  ? undefined
                  : this.dateUtil.formatDate((await (await updateAt?.getProperty('dateTime'))?.jsonValue()) as string),
            };

            if (!result.title) {
              this.logger.info(
                `[${organizationName}] 記事タイトルが見つかりませんでした`,
                this.logUtil.getProcessCrawlingParams({ tracking_id: individualCrawlerTrackingId, url }),
              );
            }

            if (!result.article_created_at) {
              this.logger.info(
                `[${organizationName}] 記事投稿日時が見つかりませんでした`,
                this.logUtil.getProcessCrawlingParams({ tracking_id: individualCrawlerTrackingId, url }),
              );
            }

            if (!result.article_updated_at) {
              this.logger.info(
                `[${organizationName}] 記事更新日が見つかりませんでした`,
                this.logUtil.getProcessCrawlingParams({ tracking_id: individualCrawlerTrackingId, url }),
              );
            }

            this.logger.info(
              `[${organizationName}] クローリング完了`,
              this.logUtil.getSuccessCrawlingParams<NewsFeed.NewsFeedCrawlerResult>({
                tracking_id: individualCrawlerTrackingId,
                time: endTime,
                result,
              }),
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
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          e.message,
          this.logUtil.getFailedParams({
            tracking_id: tracking_id,
            exception: e.name,
            stacktrace: e.stack as string,
          }),
        );
      }
      return null;
    }
  }
}
