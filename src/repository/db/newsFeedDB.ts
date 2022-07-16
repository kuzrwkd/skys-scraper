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
import { injectable } from 'tsyringe';

import { processStartTime, processEndTime, getUtc } from '@/util/date';
import { dynamodbDocument } from '@/util/dynamoDBClient';
import logger, { getStartDbIoParams, getSuccessDbIoParams, getFailedParams } from '@/util/log';

@injectable()
export class NewsFeedDB {
  async getOrganization(id: number, tracking_id: string) {
    try {
      logger.info('NewsFeedDB [MediaOrganization] レコード読み取り開始', getStartDbIoParams({ tracking_id }));
      const startTime = processStartTime();

      const command: GetCommandInput = {
        TableName: process.env.MEDIA_ORGANIZATION_TABLE_NAME,
        Key: {
          id,
        },
      };

      const { Item } = await dynamodbDocument.send(new GetCommand(command));

      const endTime = processEndTime(startTime);
      logger.info(
        'NewsFeedDB [MediaOrganization] レコード読み取り完了',
        getSuccessDbIoParams<typeof Item>({ tracking_id, time: endTime, result: Item }),
      );

      return { id: Item?.id, name: Item?.name };
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          `NewsFeedDB [MediaOrganization] レコード読み取り失敗`,
          getFailedParams({ tracking_id, exception_class: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  async create(payload: NewsFeed.Entity, tracking_id: string) {
    const { title, url, organization, article_created_at, article_updated_at } = payload;
    const organizationName = organization.name;

    try {
      logger.info(`NewsFeedDB [${organizationName}] レコード作成開始`, getStartDbIoParams({ tracking_id }));
      const startTime = processStartTime();
      const command: PutCommandInput = {
        TableName: process.env.NEWSFEED_TABLE_NAME,
        Item: {
          id: tracking_id,
          title,
          url,
          organization_id: organization.id,
          article_created_at,
          article_updated_at: article_updated_at ?? '',
          created_at: getUtc(),
        },
      };
      const result = await dynamodbDocument.send(new PutCommand(command));
      const endTime = processEndTime(startTime);

      logger.info(
        `NewsFeedDB [${organizationName}] レコード作成完了`,
        getSuccessDbIoParams<typeof result>({ tracking_id, time: endTime, result }),
      );
      return result;
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          `NewsFeedDB [${organizationName}] レコード作成失敗`,
          getFailedParams({ tracking_id, exception_class: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  async read(url: string, organization: NewsFeed.Organization, tracking_id: string) {
    const { name: organizationName } = organization;

    try {
      logger.info(`NewsFeedDB [${organizationName}] レコード読み取り開始`, getStartDbIoParams({ tracking_id }));
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
      logger.info(
        `NewsFeedDB [${organizationName}] レコード読み取り完了`,
        getSuccessDbIoParams<typeof Items>({ tracking_id, time: endTime, result: Items }),
      );

      if (!Items || Items.length === 0) {
        return undefined;
      }

      const result = Items[0];

      return {
        id: result.id.S,
        title: result.title.S,
        url: result.url.S,
        organization,
        article_created_at: result.article_created_at.S,
        article_updated_at: result.article_updated_at.S,
        created_at: result.created_at.S,
      };
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          `NewsFeedDB [${organizationName}] レコード読み取り失敗`,
          getFailedParams({ tracking_id, exception_class: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  async update(payload: NewsFeed.Entity & { created_at: string; updated_at?: string }, tracking_id: string) {
    const {
      id,
      title,
      organization: { name: organizationName },
      article_created_at,
      article_updated_at,
    } = payload;
    if (!article_updated_at || !id) return;

    try {
      logger.info(`NewsFeedDB [${organizationName}] レコード更新開始`, getStartDbIoParams({ tracking_id }));

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

      logger.info(
        `NewsFeedDB [${organizationName}] レコード更新完了`,
        getSuccessDbIoParams<typeof result>({ tracking_id, time: endTime, result }),
      );
      return result;
    } catch (e) {
      if (e instanceof Error) {
        logger.error(
          `NewsFeedDB [${organizationName}] レコード更新失敗`,
          getFailedParams({ tracking_id, exception_class: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }
}
