import {formatDate} from '@kuzrwkd/skys-core/date';
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

    const startTime = processStartTime();
    logger.info(`[${mediaName}] Start crawling`, startLogger({categoryUrl}));

    const browser = await playwright.chromium.launch(options);
    const page = await browser.newPage();
    await page.goto(categoryUrl, {timeout: 0});
    await page.waitForSelector('main[class^="main_"]');
    const articles = await page.locator('article[class^="sokuhoCard_"]').all();

    const crawlingData = (
      await Promise.allSettled(
        articles.map(async item => {
          try {
            const link = item.locator('div[class^="textArea_"] > a');
            const title = (await link?.innerText()) ?? undefined;
            const url = (await link?.getAttribute('href')) ?? undefined;
            const date = item.locator('div[class^="dateContainer_"] time');
            const lastPostDate = (await date?.getAttribute('datetime')) ?? undefined;

            const result: CrawlerItem = {
              id: createUuid(),
              title,
              url,
              media_id: mediaId,
              category_id: categoryId,
              last_post_date: lastPostDate ? formatDate(lastPostDate) : lastPostDate,
            };

            logger.info(`[${mediaName}] Process crawling`, processLogger({result}));
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
          }
        }),
      )
    ).map(e => {
      if (e.status === 'fulfilled' && e.value) {
        return e.value;
      }
    });

    await browser.close();

    const endTime = processEndTime(startTime);
    logger.info(`[${mediaName}] End crawling`, successLogger({time: endTime}));

    const newsfeedCrawlerResults: CrawlerItem[] = [];

    for (const item of crawlingData) {
      if (item) {
        newsfeedCrawlerResults.push(item);
      }
    }
    return newsfeedCrawlerResults;
  }
}
