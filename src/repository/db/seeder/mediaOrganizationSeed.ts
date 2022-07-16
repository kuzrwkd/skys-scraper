import { BatchWriteCommand, BatchWriteCommandInput } from '@aws-sdk/lib-dynamodb';
import { injectable } from 'tsyringe';

import { dynamodbDocument } from '@/util/dynamoDBClient';
import logger from '@/util/log';

@injectable()
class MediaOrganizationSeed {
  async install() {
    try {
      const command: BatchWriteCommandInput = {
        RequestItems: {
          MediaOrganization: [
            {
              PutRequest: {
                Item: {
                  id: 1,
                  name: '日本経済新聞',
                },
              },
            },
            {
              PutRequest: {
                Item: {
                  id: 2,
                  name: 'Reuters',
                },
              },
            },
            {
              PutRequest: {
                Item: {
                  id: 3,
                  name: 'Bloomberg',
                },
              },
            },
          ],
        },
      };

      logger.info('MediaOrganizationTable レコード作成開始');
      await dynamodbDocument.send(new BatchWriteCommand(command));
      logger.info('MediaOrganizationTable レコード作成完了');
    } catch (e) {
      logger.error(e);
    }
  }
}

export default MediaOrganizationSeed;
