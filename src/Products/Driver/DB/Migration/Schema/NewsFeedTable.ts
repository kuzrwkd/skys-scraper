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
class NewsFeedTableMigration {
  private logger: Lib.Logger;

  constructor(@inject('LogTool') private logTool: Tools.ILogTool) {
    this.logger = this.logTool.createLogger();
  }

  async up() {
    try {
      const params: CreateTableCommandInput = {
        TableName: 'NewsFeed',
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
          { AttributeName: 'created_at', KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
          { AttributeName: 'created_at', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
        TableClass: 'STANDARD',
      };
      this.logger.info('NewsFeedTable マイグレーション開始');
      const result = dynamodb.send(new CreateTableCommand(params));
      this.logger.info('NewsFeedTable マイグレーション終了', result);
    } catch (e) {}
  }

  async down() {
    try {
      const command: DeleteTableCommandInput = {
        TableName: 'NewsFeed',
      };
      this.logger.info('NewsFeedTable テーブル削除開始');
      const result = await dynamodb.send(new DeleteTableCommand(command));
      this.logger.info('NewsFeedTable テーブル削除終了', result);
    } catch (e) {
      this.logger.error(e);
    }
  }
}

export default NewsFeedTableMigration;
