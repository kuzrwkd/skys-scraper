import {
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { processStartTime, processEndTime, getUtc } from '@kuzrwkd/skys-core/date';
import logger, { startLogger, successLogger, failedLogger } from '@kuzrwkd/skys-core/logger';
import { createUuid } from '@kuzrwkd/skys-core/uuid';
import { injectable } from 'tsyringe';

import { dynamodbDocument } from '@/util/dynamoDBClient';

@injectable()
export class NewsFeedDB {
  async getMedia(id: number) {
    try {
      logger.info('NewsFeedDB [Media] レコード読み取り開始', startLogger());
      const startTime = processStartTime();

      const command: GetCommandInput = {
        TableName: process.env.MEDIA_TABLE_NAME,
        Key: {
          id,
        },
      };

      const { Item } = await dynamodbDocument.send(new GetCommand(command));

      const endTime = processEndTime(startTime);
      logger.info('NewsFeedDB [Media] レコード読み取り完了', successLogger({ time: endTime, result: Item }));

      return { id: Item?.id, name: Item?.name };
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          `NewsFeedDB [Media] レコード読み取り失敗`,
          failedLogger({ exception_class: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  async create(payload: NewsFeed.Entity) {
    const { title, url, media, article_created_at, article_updated_at } = payload;
    const mediaName = media.name;

    try {
      logger.info(`NewsFeedDB [${mediaName}] レコード作成開始`, startLogger());
      const startTime = processStartTime();
      const command: PutCommandInput = {
        TableName: process.env.NEWSFEED_TABLE_NAME,
        Item: {
          id: createUuid(),
          title,
          url,
          media_id: media.id,
          article_created_at,
          article_updated_at: article_updated_at ?? '',
          created_at: getUtc(),
        },
      };
      const result = await dynamodbDocument.send(new PutCommand(command));
      const endTime = processEndTime(startTime);

      logger.info(`NewsFeedDB [${mediaName}] レコード作成完了`, successLogger({ time: endTime, result }));
      return result;
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          `NewsFeedDB [${mediaName}] レコード作成失敗`,
          failedLogger({ exception_class: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  async read(url: string, media: NewsFeed.Media) {
    const { name: mediaName } = media;

    try {
      logger.info(`NewsFeedDB [${mediaName}] レコード読み取り開始`, startLogger());
      const startTime = processStartTime();

      const command: QueryCommandInput = {
        TableName: process.env.NEWSFEED_TABLE_NAME,
        IndexName: 'UrlIndex',
        KeyConditionExpression: '#url = :url',
        ExpressionAttributeNames: {
          '#url': 'url',
        },
        ExpressionAttributeValues: {
          ':url': url,
        },
      };

      const { Items } = await dynamodbDocument.send(new QueryCommand(command));

      const endTime = processEndTime(startTime);
      logger.info(`NewsFeedDB [${mediaName}] レコード読み取り完了`, successLogger({ time: endTime, result: Items }));

      if (!Items || Items.length === 0) {
        return undefined;
      }

      const result = Items[0];

      return {
        id: result.id.S,
        title: result.title.S,
        url: result.url.S,
        media,
        article_created_at: result.article_created_at.S,
        article_updated_at: result.article_updated_at.S,
        created_at: result.created_at.S,
      };
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          `NewsFeedDB [${mediaName}] レコード読み取り失敗`,
          failedLogger({ exception_class: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  async update(payload: NewsFeed.Entity & { created_at: string; updated_at?: string }) {
    const {
      id,
      title,
      media: { name: mediaName },
      article_created_at,
      article_updated_at,
    } = payload;
    if (!article_updated_at || !id) return;

    try {
      logger.info(`NewsFeedDB [${mediaName}] レコード更新開始`, startLogger());

      const startTime = processStartTime();

      const command: UpdateCommandInput = {
        TableName: process.env.NEWSFEED_TABLE_NAME,
        Key: {
          id,
          article_created_at,
        },
        UpdateExpression: 'set #title = :title, #article_updated_at = :article_updated_at, #updated_at = :updated_at',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#article_updated_at': 'article_updated_at',
          '#updated_at': 'updated_at',
        },
        ExpressionAttributeValues: {
          ':title': title,
          ':article_updated_at': article_updated_at,
          ':updated_at': getUtc(),
        },
        ReturnValues: 'ALL_NEW',
        ConditionExpression: 'attribute_exists(#article_updated_at)',
      };
      const result = await dynamodbDocument.send(new UpdateCommand(command));

      const endTime = processEndTime(startTime);

      logger.info(`NewsFeedDB [${mediaName}] レコード更新完了`, successLogger({ time: endTime, result }));
      return result;
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          `NewsFeedDB [${mediaName}] レコード更新失敗`,
          failedLogger({ exception_class: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }
}
