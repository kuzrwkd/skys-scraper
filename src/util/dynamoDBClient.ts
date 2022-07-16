import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const dynamodb = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION ?? 'ap-northeast-1',
  endpoint: `http://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID ?? 'test',
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY ?? 'test',
  },
});

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

export const dynamodbDocument = DynamoDBDocumentClient.from(dynamodb, translateConfig);
