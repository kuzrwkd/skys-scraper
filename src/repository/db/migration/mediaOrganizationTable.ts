import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DeleteTableCommandInput,
  DescribeTableInput,
  DescribeTableCommand,
} from '@aws-sdk/client-dynamodb';
import { injectable } from 'tsyringe';

import { dynamodbDocument } from '@/util/dynamoDBClient';
import logger from '@/util/log';

@injectable()
class MediaOrganizationTableMigration {
  async createTable() {
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
    const result = await dynamodbDocument.send(new CreateTableCommand(command));
    logger.info('MediaOrganizationTable マイグレーション終了', result);
  }

  async deleteTable() {
    const command: DeleteTableCommandInput = {
      TableName: process.env.MEDIA_ORGANIZATION_TABLE_NAME,
    };
    logger.info('MediaOrganizationTable テーブル削除開始');
    const result = await dynamodbDocument.send(new DeleteTableCommand(command));
    logger.info('MediaOrganizationTable テーブル削除終了', result);
  }

  async up() {
    try {
      const describeTableInput: DescribeTableInput = { TableName: process.env.MEDIA_ORGANIZATION_TABLE_NAME };
      await dynamodbDocument.send(new DescribeTableCommand(describeTableInput));
      await this.deleteTable();
    } catch (e) {
      await this.createTable();
      return;
    }

    try {
      await this.createTable();
    } catch (e) {
      logger.error(e);
    }
  }

  async down() {
    try {
      await this.deleteTable();
    } catch (e) {
      logger.error(e);
    }
  }
}

export default MediaOrganizationTableMigration;
