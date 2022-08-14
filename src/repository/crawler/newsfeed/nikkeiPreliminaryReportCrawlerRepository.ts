import { processStartTime, processEndTime, formatDate } from '@kuzrwkd/skys-core/date';
import logger, { startLogger, successLogger, processLogger, failedLogger } from '@kuzrwkd/skys-core/logger';
import { createUuid } from '@kuzrwkd/skys-core/uuid';
import puppeteer from 'puppeteer';
import { injectable } from 'tsyringe';

import { options } from '@/util/crawlerOptions';

@injectable()
export class NikkeiPreliminaryReportCrawlerRepository {
  async handle(u: string, media: NewsFeed.Media) {
    const { name: mediaName } = media;
    const data: NewsFeed.NewsFeedCrawlerResult[] = [];
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const preliminaryReportUrl: string[] = [];

    try {
      logger.info(`[${mediaName}] クローリング開始`, startLogger());

      const startTime = processStartTime();
      await page.goto(u);
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');

      logger.info(`[${mediaName}] クローリング実行`, processLogger({ url: u }));

      const endTime = processEndTime(startTime);

      for (const link of preliminaryReportLinkList) {
        const url: string | undefined = await (await link.getProperty('href'))?.jsonValue();
        if (url) {
          preliminaryReportUrl.push(url);
        }
      }

      logger.info(
        `[${mediaName}] クローリング完了`,
        successLogger({
          time: endTime,
          result: preliminaryReportUrl,
        }),
      );
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          e.message,
          failedLogger({
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
            const page = await browser.newPage();
            logger.info(`[${mediaName}] クローリング開始`, startLogger());
            const startTime = processStartTime();

            await page.goto(url, { timeout: 0 });
            await page.waitForSelector('div[class^="container_"] > main > article');

            const title = await page.$('h1[class^="title_"]');
            const createdAt = await page.$('[class^="TimeStamp_"] > time');
            const updateAt = await page.$('[class^="TimeStamp_"] > span > time');

            logger.info(`[${mediaName}] クローリング実行`, processLogger({ url }));

            const endTime = processEndTime(startTime);
            const result: NewsFeed.NewsFeedCrawlerResult = {
              id: createUuid(),
              title: (await (await title?.getProperty('textContent'))?.jsonValue()) as string,
              url,
              article_created_at: formatDate((await (await createdAt?.getProperty('dateTime'))?.jsonValue()) as string),
              article_updated_at:
                !updateAt || typeof updateAt == 'undefined'
                  ? undefined
                  : formatDate((await (await updateAt?.getProperty('dateTime'))?.jsonValue()) as string),
            };

            if (!result.title) {
              logger.info(`[${mediaName}] 記事タイトルが見つかりませんでした`, processLogger({ url }));
            }

            if (!result.article_created_at) {
              logger.info(`[${mediaName}] 記事投稿日時が見つかりませんでした`, processLogger({ url }));
            }

            if (!result.article_updated_at) {
              logger.info(`[${mediaName}] 記事更新日が見つかりませんでした`, processLogger({ url }));
            }

            logger.info(`[${mediaName}] クローリング完了`, successLogger({ time: endTime, result }));
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
          failedLogger({
            exception_class: e.name,
            stacktrace: e.stack as string,
          }),
        );
      }
      return null;
    }
  }
}
