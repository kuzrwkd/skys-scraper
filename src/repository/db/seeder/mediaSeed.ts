import { BatchWriteCommand, BatchWriteCommandInput } from '@aws-sdk/lib-dynamodb';
import { injectable } from 'tsyringe';

import { dynamodbDocument } from '@/util/dynamoDBClient';
import logger from '@/util/log';

@injectable()
class MediaSeed {
  async install() {
    try {
      const command: BatchWriteCommandInput = {
        RequestItems: {
          Media: [
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

      logger.info('MediaTable レコード作成開始');
      await dynamodbDocument.send(new BatchWriteCommand(command));
      logger.info('MediaTable レコード作成完了');
    } catch (e) {
      logger.error(e);
    }
  }
}

export default MediaSeed;
