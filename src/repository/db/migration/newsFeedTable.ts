/**
 * Lib
 */
import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DeleteTableCommandInput,
} from '@aws-sdk/client-dynamodb';

import { injectable } from 'tsyringe';

/**
 * Util
 */
import { dynamodb } from '@/util/dynamoDBClient';
import logger from '@/util/log';

@injectable()
class NewsFeedTableMigration {
  async up() {
    try {
      const params: CreateTableCommandInput = {
        TableName: process.env.NEWSFEED_TABLE_NAME,
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
          { AttributeName: 'article_created_at', KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
          { AttributeName: 'article_created_at', AttributeType: 'S' },
          { AttributeName: 'url', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
        GlobalSecondaryIndexes: [
          {
            IndexName: 'UrlIndex',
            KeySchema: [{ AttributeName: 'url', KeyType: 'HASH' }],
            Projection: { ProjectionType: 'ALL' },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          },
        ],
      };
      logger.info('NewsFeedTable マイグレーション開始');
      const result = dynamodb.send(new CreateTableCommand(params));
      logger.info('NewsFeedTable マイグレーション終了', result);
    } catch (e) {}
  }

  async down() {
    try {
      const command: DeleteTableCommandInput = {
        TableName: process.env.NEWSFEED_TABLE_NAME,
      };
      logger.info('NewsFeedTable テーブル削除開始');
      const result = await dynamodb.send(new DeleteTableCommand(command));
      logger.info('NewsFeedTable テーブル削除終了', result);
    } catch (e) {
      logger.error(e);
    }
  }
}

export default NewsFeedTableMigration;
