import {convertISO8601ToEpochMillis, getEpochMillis, convertEpochMillisToISO8601} from '@kuzrwkd/skys-core/date';
import logger, {
  startLogger,
  successLogger,
  processLogger,
  failedLogger,
  processStartTime,
  processEndTime,
} from '@kuzrwkd/skys-core/logger';
import playwright from 'playwright-core';
import {ICrawler, CrawlerItem, CrawlerParams} from '@/crawlers';
import {options} from '@/utils/crawlerOptions';

export class NikkeiNewsCrawler implements ICrawler {
  async handle(params: CrawlerParams) {
    const {media, url: categoryUrl, category} = params;
    const {media_id: mediaId, domain} = media;
    const {category_id: categoryId} = category;
    const startTime = processStartTime();
    logger.info(`Start nikkei ${category.name} category crawling.`, startLogger());

    try {
      const browser = await playwright.chromium.launch(options);
      const page = await browser.newPage();
      await page.goto(categoryUrl);
      const newsItems = await page.locator('article[class^="sokuhoCard_"]').all();
      const makeNewsLinks = newsItems.map(async item => {
        const linkElement = item.locator('div[class^="textArea_"] > a');
        const timeElement = item.locator('div[class^="dateContainer_"] time');
        const lastUpdateDate =
          (await timeElement.getAttribute('datetime')) ?? convertEpochMillisToISO8601(getEpochMillis());
        const title = await linkElement.innerText();
        const relativeUrl = (await linkElement.getAttribute('href')) ?? undefined;
        const absoluteUrl = relativeUrl ? `${domain}${relativeUrl}` : undefined;
        if (!absoluteUrl) {
          throw new Error('Invalid absoluteUrl.');
        }
        const result = {
          title,
          url: absoluteUrl,
          media_id: mediaId,
          category_id: categoryId,
          last_publish_date: convertISO8601ToEpochMillis(lastUpdateDate),
        } as CrawlerItem;
        logger.info(`Processing nikkei ${category.name} category crawling.`, processLogger());
        return result;
      });
      const newsLinks = await Promise.all(makeNewsLinks);
      await browser.close();
      const endTime = processEndTime(startTime);
      logger.info(
        `Successfully nikkei ${category.name} category crawling.`,
        successLogger({result: newsLinks, time: endTime}),
      );
      return newsLinks;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Failed to nikkei ${category.name} category crawling.`, failedLogger({result: error}));
      }
    }
  }
}
