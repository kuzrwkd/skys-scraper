import puppeteer from 'puppeteer';
import { injectable } from 'tsyringe';

import { options } from '@/util/crawlerOptions';
import { processStartTime, processEndTime, formatDate } from '@/util/date';
import logger, {
  createRandomString,
  getStartCrawlingParams,
  getProcessCrawlingParams,
  getSuccessCrawlingParams,
  getFailedParams,
} from '@/util/log';

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  async handle(u: string, organization: NewsFeed.Organization, tracking_id: string) {
    const { name: organizationName } = organization;
    const listCrawlerTrackingId = `${tracking_id}-lc-${createRandomString()}`;
    const data: NewsFeed.NewsFeedCrawlerResult[] = [];
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const preliminaryReportUrl: string[] = [];

    try {
      logger.info(`[${organizationName}] クローリング開始`, getStartCrawlingParams({ tracking_id }));

      const startTime = processStartTime();
      await page.goto(u);
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');

      logger.info(
        `[${organizationName}] クローリング実行`,
        getProcessCrawlingParams({ tracking_id: listCrawlerTrackingId, url: u }),
      );

      const endTime = processEndTime(startTime);

      for (const link of preliminaryReportLinkList) {
        const url: string | undefined = await (await link.getProperty('href'))?.jsonValue();
        if (url) {
          preliminaryReportUrl.push(url);
        }
      }

      logger.info(
        `[${organizationName}] クローリング完了`,
        getSuccessCrawlingParams<string[]>({
          tracking_id: listCrawlerTrackingId,
          time: endTime,
          result: preliminaryReportUrl,
        }),
      );
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          e.message,
          getFailedParams({
            tracking_id: tracking_id,
            exception_class: e.name,
            stacktrace: e.stack as string,
          }),
        );
      }
      return null;
    }

    try {
      const crawlingData = (
        await Promise.allSettled(
          preliminaryReportUrl.map(async (url: string) => {
            const individualCrawlerTrackingId = `${listCrawlerTrackingId}-ic-${createRandomString()}`;
            const page = await browser.newPage();
            logger.info(
              `[${organizationName}] クローリング開始`,
              getStartCrawlingParams({ tracking_id: individualCrawlerTrackingId }),
            );
            const startTime = processStartTime();

            await page.goto(url, { timeout: 0 });
            await page.waitForSelector('div[class^="container_"] > main > article');

            const title = await page.$('h1[class^="title_"]');
            const createdAt = await page.$('[class^="TimeStamp_"] > time');
            const updateAt = await page.$('[class^="TimeStamp_"] > span > time');

            logger.info(
              `[${organizationName}] クローリング実行`,
              getProcessCrawlingParams({ tracking_id: individualCrawlerTrackingId, url }),
            );

            const endTime = processEndTime(startTime);
            const result: NewsFeed.NewsFeedCrawlerResult = {
              id: individualCrawlerTrackingId,
              title: (await (await title?.getProperty('textContent'))?.jsonValue()) as string,
              url,
              article_created_at: formatDate((await (await createdAt?.getProperty('dateTime'))?.jsonValue()) as string),
              article_updated_at:
                !updateAt || typeof updateAt == 'undefined'
                  ? undefined
                  : formatDate((await (await updateAt?.getProperty('dateTime'))?.jsonValue()) as string),
            };

            if (!result.title) {
              logger.info(
                `[${organizationName}] 記事タイトルが見つかりませんでした`,
                getProcessCrawlingParams({ tracking_id: individualCrawlerTrackingId, url }),
              );
            }

            if (!result.article_created_at) {
              logger.info(
                `[${organizationName}] 記事投稿日時が見つかりませんでした`,
                getProcessCrawlingParams({ tracking_id: individualCrawlerTrackingId, url }),
              );
            }

            if (!result.article_updated_at) {
              logger.info(
                `[${organizationName}] 記事更新日が見つかりませんでした`,
                getProcessCrawlingParams({ tracking_id: individualCrawlerTrackingId, url }),
              );
            }

            logger.info(
              `[${organizationName}] クローリング完了`,
              getSuccessCrawlingParams<NewsFeed.NewsFeedCrawlerResult>({
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
        logger.error(
          e.message,
          getFailedParams({
            tracking_id: tracking_id,
            exception_class: e.name,
            stacktrace: e.stack as string,
          }),
        );
      }
      return null;
    }
  }
}
