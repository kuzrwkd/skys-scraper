import { BatchWriteItemCommand, BatchWriteItemCommandInput } from '@aws-sdk/client-dynamodb';
import { injectable } from 'tsyringe';

import { dynamodb } from '@/util/dynamoDBClient';
import logger from '@/util/log';

@injectable()
class MediaOrganizationSeed {
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

      logger.info('MediaOrganizationTable レコード作成開始');
      await dynamodb.send(new BatchWriteItemCommand(command));
      logger.info('MediaOrganizationTable レコード作成完了');
    } catch (e) {
      logger.error(e);
    }
  }
}

export default MediaOrganizationSeed;
