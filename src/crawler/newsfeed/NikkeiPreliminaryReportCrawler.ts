import { processStartTime, processEndTime, formatDate } from '@kuzrwkd/skys-core/date';
import { MediaSchema } from '@kuzrwkd/skys-core/entities';
import logger, { startLogger, successLogger, processLogger, failedLogger } from '@kuzrwkd/skys-core/logger';
import { createUuid } from '@kuzrwkd/skys-core/v4uuid';
import puppeteer from 'puppeteer';
import { injectable } from 'tsyringe';

import { NewsfeedCrawlerResultItem } from '@/useCase/NewsfeedCrawlerUseCase';
import { options } from '@/util/crawlerOptions';

export interface INikkeiPreliminaryReportCrawler {
  handle(url: string, media: MediaSchema): Promise<NewsfeedCrawlerResultItem[] | undefined>;
}

@injectable()
export class NikkeiPreliminaryReportCrawler implements INikkeiPreliminaryReportCrawler {
  async handle(url: string, media: MediaSchema) {
    const { name: mediaName, id: mediaId } = media;
    const data: NewsfeedCrawlerResultItem[] = [];
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const preliminaryReportUrl: string[] = [];

    try {
      logger.info(`[${mediaName}] クローリング開始`, startLogger());

      const startTime = processStartTime();
      await page.goto(url);
      await page.waitForSelector('#CONTENTS_MAIN');
      const preliminaryReportLinkList = await page.$$('.m-miM09_title > a');

      logger.info(`[${mediaName}] クローリング実行`, processLogger({ url }));

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
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          error.message,
          failedLogger({
            exception_class: error.name,
            stacktrace: error.stack as string,
          }),
        );
      }
      return;
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

            const title = await page.$eval('h1[class^="title_"]', (item) => item.textContent);
            const createdAt = await page.$('[class^="TimeStamp_"] > time');
            const updateAt = await page.$('[class^="TimeStamp_"] > span > time');

            logger.info(`[${mediaName}] クローリング実行`, processLogger({ url }));

            if (!title) {
              logger.info(`[${mediaName}] 記事タイトルが見つかりませんでした`, processLogger({ url }));
              return;
            }

            if (!createdAt) {
              logger.info(`[${mediaName}] 記事投稿日時が見つかりませんでした`, processLogger({ url }));
              return;
            }

            const endTime = processEndTime(startTime);
            const result: NewsfeedCrawlerResultItem = {
              id: createUuid(),
              title,
              url,
              media_id: mediaId,
              article_created_at: formatDate((await (await createdAt?.getProperty('dateTime'))?.jsonValue()) as string),
              article_updated_at: !updateAt
                ? undefined
                : formatDate((await (await updateAt?.getProperty('dateTime'))?.jsonValue()) as string),
            };

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

      await browser.close();

      for (const item of crawlingData) {
        if (item) {
          data.push(item);
        }
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          error.message,
          failedLogger({
            exception_class: error.name,
            stacktrace: error.stack as string,
          }),
        );
      }
    }
  }
}
