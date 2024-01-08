import {formatDate, getUtc} from '@kuzrwkd/skys-core/date';
import logger, {
  startLogger,
  successLogger,
  processLogger,
  failedLogger,
  processStartTime,
  processEndTime,
} from '@kuzrwkd/skys-core/logger';
import {createUuid} from '@kuzrwkd/skys-core/v4uuid';
import playwright from 'playwright-core';
import {ICrawler, CrawlerItem, CrawlerParams} from '@/crawlers';
import {options} from '@/utils/crawlerOptions';

export class NikkeiNewsCrawler implements ICrawler {
  async handle(params: CrawlerParams) {
    const {media, url: categoryUrl, category} = params;
    const {name: mediaName, media_id: mediaId} = media;
    const {category_id: categoryId} = category;
    const newsUrlAndTitleList: Record<'articleUrl' | 'title', string>[] = [];

    const browser = await playwright.chromium.launch(options);

    try {
      logger.info(`[${mediaName}] クローリング開始`, startLogger({categoryUrl}));
      const page = await browser.newPage();

      const startTime = processStartTime();
      await page.goto(categoryUrl, {timeout: 0});
      await page.waitForSelector('#CONTENTS_MAIN');
      const newsLinkElements = await page.$$('.m-miM09_title > a');

      for (const link of newsLinkElements) {
        const title = await link.innerText();
        const articleUrl = (await (await link.getProperty('href'))?.jsonValue()) as string | undefined;
        if (articleUrl && title) {
          newsUrlAndTitleList.push({articleUrl, title});
        }
      }

      const endTime = processEndTime(startTime);

      logger.info(
        `[${mediaName}] クローリング完了`,
        successLogger({
          time: endTime,
          result: newsUrlAndTitleList,
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
    }

    const crawlingData = (
      await Promise.allSettled(
        newsUrlAndTitleList.map(async item => {
          const startTime = processStartTime();

          const {articleUrl, title} = item;

          try {
            logger.info(`[${mediaName}] クローリング開始`, startLogger({articleUrl}));
            const page = await browser.newPage();

            await page.goto(articleUrl, {timeout: 0});
            await page.waitForSelector('div[class^="container_"] > main > article');

            const createdAt = await page.$('[class^="timeStampOverride_"] > time');
            const updateAt = await page.$('[class^="timeStampOverride_"] > span > time');

            if (!createdAt) {
              logger.info(`[${mediaName}] 記事投稿日時が見つかりませんでした`, processLogger({articleUrl}));
            }

            const endTime = processEndTime(startTime);
            const result: CrawlerItem = {
              id: createUuid(),
              title,
              url: articleUrl,
              media_id: mediaId,
              category_id: categoryId,
              article_created_at: formatDate((await (await createdAt?.getProperty('dateTime'))?.jsonValue()) as string),
              article_updated_at: !updateAt
                ? undefined
                : formatDate((await (await updateAt?.getProperty('dateTime'))?.jsonValue()) as string),
            };

            logger.info(`[${mediaName}] クローリング完了`, successLogger({time: endTime, result}));
            return result;
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

            const endTime = processEndTime(startTime);
            const result = {
              id: createUuid(),
              media_id: mediaId,
              category_id: categoryId,
              url: articleUrl,
              article_created_at: getUtc(),
              title,
            };

            logger.info(`[${mediaName}] リカバリー`, processLogger({time: endTime, result}));
            return result;
          }
        }),
      )
    ).map(e => {
      if (e.status === 'fulfilled' && e.value) {
        return e.value;
      }
    });

    await browser.close();

    const newsfeedCrawlerResults: CrawlerItem[] = [];

    for (const item of crawlingData) {
      if (item) {
        newsfeedCrawlerResults.push(item);
      }
    }
    return newsfeedCrawlerResults;
  }
}
