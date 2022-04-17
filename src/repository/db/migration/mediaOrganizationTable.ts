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
class MediaOrganizationTableMigration {
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

      logger.info('MediaOrganizationTable マイグレーション開始');
      const result = await dynamodb.send(new CreateTableCommand(command));
      logger.info('MediaOrganizationTable マイグレーション終了', result);
    } catch (e) {
      logger.error(e);
    }
  }

  async down() {
    try {
      const command: DeleteTableCommandInput = {
        TableName: process.env.MEDIA_ORGANIZATION_TABLE_NAME,
      };
      logger.info('MediaOrganizationTable テーブル削除開始');
      const result = await dynamodb.send(new DeleteTableCommand(command));
      logger.info('MediaOrganizationTable テーブル削除終了', result);
    } catch (e) {
      logger.error(e);
    }
  }
}

export default MediaOrganizationTableMigration;
