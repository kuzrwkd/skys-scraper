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
class MediaOrganizationTableMigration {
  private logger: Lib.Logger;

  constructor(@inject('LogTool') private logTool: Tools.ILogTool) {
    this.logger = this.logTool.createLogger();
  }

  async up() {
    try {
      const command: CreateTableCommandInput = {
        TableName: 'MediaOrganization',
        KeySchema: [{ AttributeName: 'organization_id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'organization_id', AttributeType: 'N' }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
        TableClass: 'STANDARD',
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
        TableName: 'MediaOrganization',
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
