// lib
import { dynamodb } from '@/Tools/Utility/DynamoDBClient';
import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
  BatchGetItemCommand,
  BatchGetItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedDBRepository {
  private logger: Lib.Logger;

  constructor(
    @inject('LogTool') private logTool: Tools.ILogTool,
    @inject('RegExpVerExTool') private regExpVerEx: Tools.IRegExpVerExTool,
    @inject('DateTool') private dateTool: Tools.IDateTool,
  ) {
    this.logger = this.logTool.createLogger();
  }

  /**
   * 機関マスター検索
   *  @param id
   */
  async getOrganization(id: number) {
    try {
      this.logger.info(
        'NewsFeedDBRepository [OrganizationMaster] レコード読み取り開始',
        this.logTool.getStartDbIoParams(),
      );
      const startTime = this.dateTool.processStartTime();

      const params: GetItemCommandInput = {
        TableName: 'MediaOrganization',
        Key: {
          id: { N: id.toString() },
        },
      };

      const result = await dynamodb.send(new GetItemCommand(params));

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info(
        'NewsFeedDBRepository [OrganizationMaster] レコード読み取り完了',
        this.logTool.getSuccessDbIoParams<typeof result>(endTime, result),
      );
      return result;
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `NewsFeedDBRepository [OrganizationMaster] レコード読み取り失敗`,
          this.logTool.getFailedParams(e.name, e.stack as string),
        );
      }
    }
  }

  /**
   * レコード作成
   * @param payload
   */
  async create(payload: NewsFeed.Entity) {
    const { title, url, organization, articleCreatedAt, articleUpdatedAt } = payload;
    const organizationName = organization.name;

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード作成開始`,
        this.logTool.getStartDbIoParams(),
      );
      const startTime = this.dateTool.processStartTime();
      const command: PutItemCommandInput = {
        TableName: 'NewsFeed',
        Item: {
          title: { S: title },
          url: { S: url },
          organization_id: { S: organization.id.toString() },
          articleCreated_at: { S: articleCreatedAt },
          articleUpdated_at: { S: articleUpdatedAt ?? '' },
        },
      };
      const result = await dynamodb.send(new PutItemCommand(command));
      const endTime = this.dateTool.processEndTime(startTime);

      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード作成完了`,
        this.logTool.getSuccessDbIoParams<typeof result>(endTime, result),
      );
      return result;
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `NewsFeedDBRepository [${organizationName}] レコード作成失敗`,
          this.logTool.getFailedParams(e.name, e.stack as string),
        );
      }
    }
  }

  /**
   * レコード読み取り
   * @param url
   * @param { name } - organizationNameが入る
   */
  async read(url: string, { name }: NewsFeed.Organization) {
    const organizationName = name;

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード読み取り開始`,
        this.logTool.getStartDbIoParams(),
      );
      const startTime = this.dateTool.processStartTime();

      const command: BatchGetItemCommandInput = {
        RequestItems: {
          NewsFeed: {
            Keys: [
              {
                url: { S: url },
              },
            ],
          },
        },
      };

      const result = await dynamodb.send(new BatchGetItemCommand(command));

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード読み取り完了`,
        this.logTool.getSuccessDbIoParams<typeof result>(endTime, result),
      );

      return result;
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `NewsFeedDBRepository [${organizationName}] レコード読み取り失敗`,
          this.logTool.getFailedParams(e.name, e.stack as string),
        );
      }
    }
  }

  /**
   * レコード更新
   * @param payload
   */
  async update(payload: NewsFeed.Entity) {
    const {
      id,
      title,
      organization: { name: organizationName },
      articleUpdatedAt,
    } = payload;
    if (!articleUpdatedAt || !id) return;

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード更新開始`,
        this.logTool.getStartDbIoParams(),
      );

      const startTime = this.dateTool.processStartTime();

      const command: UpdateItemCommandInput = {
        TableName: 'NewsFeed',
        Key: {
          id: { N: id.toString() },
        },
        UpdateExpression: 'set #title = :title, #articleUpdated_at = :articleUpdated_at',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#articleUpdated_at': 'articleUpdated_at',
        },
        ExpressionAttributeValues: {
          ':title': { S: title },
          ':articleUpdated_at': { S: articleUpdatedAt },
        },
      };
      const result = await dynamodb.send(new UpdateItemCommand(command));

      const endTime = this.dateTool.processEndTime(startTime);

      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード更新完了`,
        this.logTool.getSuccessDbIoParams<typeof result>(endTime, result),
      );
      return result;
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `NewsFeedDBRepository [${organizationName}] レコード更新失敗`,
          this.logTool.getFailedParams(e.name, e.stack as string),
        );
      }
    }
  }
}
