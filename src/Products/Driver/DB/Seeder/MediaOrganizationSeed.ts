/**
 * Lib
 */
import { BatchWriteItemCommand, BatchWriteItemCommandInput } from '@aws-sdk/client-dynamodb';
import { inject, injectable } from 'tsyringe';

/**
 * Tools
 */
import { dynamodb } from '@/Tools/Utility/DynamoDBClient';

@injectable()
class MediaOrganizationSeed {
  private logger: Lib.Logger;

  constructor(@inject('LogTool') private logTool: Tools.ILogTool) {
    this.logger = this.logTool.createLogger();
  }

  async install() {
    try {
      const command: BatchWriteItemCommandInput = {
        RequestItems: {
          MediaOrganization: [
            {
              PutRequest: {
                Item: {
                  id: { N: '1' },
                  name: { S: '日本経済新聞' },
                },
              },
            },
            {
              PutRequest: {
                Item: {
                  id: { N: '2' },
                  name: { S: 'Reuters' },
                },
              },
            },
            {
              PutRequest: {
                Item: {
                  id: { N: '3' },
                  name: { S: 'Bloomberg' },
                },
              },
            },
          ],
        },
      };

      this.logger.info('MediaOrganizationTable レコード作成開始');
      dynamodb.send(new BatchWriteItemCommand(command));
      this.logger.info('MediaOrganizationTable レコード作成完了');
    } catch (e) {
      this.logger.error(e);
    }
  }
}

export default MediaOrganizationSeed;
