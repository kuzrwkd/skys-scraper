/**
 * Lib
 */
import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DeleteTableCommandInput,
} from '@aws-sdk/client-dynamodb';

import { inject, injectable } from 'tsyringe';

/**
 * Tool
 */
import { dynamodb } from '@/Tools/Utility/DynamoDBClient';

@injectable()
class NikkeiNewsFeedTableMigration {
  private logger: Lib.Logger;

  constructor(@inject('LogTool') private logTool: Tools.ILogTool) {
    this.logger = this.logTool.createLogger();
  }

  async up() {
    try {
      const params: CreateTableCommandInput = {
        TableName: 'NikkeiNewsFeed',
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
        TableClass: 'STANDARD',
      };
      this.logger.info('NikkeiNewsFeedTable マイグレーション開始');
      const result = dynamodb.send(new CreateTableCommand(params));
      this.logger.info('NikkeiNewsFeedTable マイグレーション終了', result);
    } catch (e) {}
  }

  async down() {
    try {
      const command: DeleteTableCommandInput = {
        TableName: 'NikkeiNewsFeed',
      };
      this.logger.info('NikkeiNewsFeedTable テーブル削除開始');
      const result = await dynamodb.send(new DeleteTableCommand(command));
      this.logger.info('NikkeiNewsFeedTable テーブル削除終了', result);
    } catch (e) {
      this.logger.error(e);
    }
  }
}

export default NikkeiNewsFeedTableMigration;
