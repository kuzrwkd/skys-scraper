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
 * Util
 */
import { dynamodb } from '@/util/dynamoDBClient';

@injectable()
class MediaOrganizationTableMigration {
  private logger: Lib.Logger;

  constructor(@inject('LogUtil') private logUtil: Util.ILogUtil) {
    this.logger = this.logUtil.createLogger();
  }

  async up() {
    try {
      const command: CreateTableCommandInput = {
        TableName: process.env.MEDIA_ORGANIZATION_TABLE_NAME,
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };

      this.logger.info('MediaOrganizationTable マイグレーション開始');
      const result = await dynamodb.send(new CreateTableCommand(command));
      this.logger.info('MediaOrganizationTable マイグレーション終了', result);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async down() {
    try {
      const command: DeleteTableCommandInput = {
        TableName: process.env.MEDIA_ORGANIZATION_TABLE_NAME,
      };
      this.logger.info('MediaOrganizationTable テーブル削除開始');
      const result = await dynamodb.send(new DeleteTableCommand(command));
      this.logger.info('MediaOrganizationTable テーブル削除終了', result);
    } catch (e) {
      this.logger.error(e);
    }
  }
}

export default MediaOrganizationTableMigration;
