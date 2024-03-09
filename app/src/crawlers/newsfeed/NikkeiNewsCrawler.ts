import {convertISO8601ToUnix} from '@kuzrwkd/skys-core/date';
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
    const {name: mediaName, media_id: mediaId, domain} = media;
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
            const linkElement = item.locator('div[class^="textArea_"] > a');
            const timeElement = item.locator('div[class^="dateContainer_"] time');
            const title = await linkElement.innerText();
            const articlePath = (await linkElement.getAttribute('href')) ?? undefined;
            const url = articlePath ? `${domain}${articlePath}` : undefined;
            const lastUpdateDate = (await timeElement.getAttribute('datetime')) ?? undefined;
            if (!lastUpdateDate) {
              throw new Error('lastUpdateDate is undefined');
            }
            if (!url) {
              throw new Error('url is undefined');
            }
            const result: CrawlerItem = {
              id: createUuid(),
              title,
              url,
              media_id: mediaId,
              category_id: categoryId,
              last_update_date: convertISO8601ToUnix(lastUpdateDate),
            };
            logger.info(`[${mediaName}] Process crawling`, processLogger({result}));
            return result;
          } catch (error) {
            if (error instanceof Error) {
              logger.error(
                error.message,
                failedLogger({
                  exception_class: error.name,
                  stacktrace: error.stack,
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
