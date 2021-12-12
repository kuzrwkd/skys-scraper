import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const dynamodb = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION ?? 'ap-northeast-1',
  endpoint: `http://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID ?? 'FAKE',
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY ?? 'FAKE',
  },
});
