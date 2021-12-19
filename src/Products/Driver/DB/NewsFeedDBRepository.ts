/**
 * Lib
 */
import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb';
import { injectable, inject } from 'tsyringe';

/**
 * Tools
 */
import { dynamodb } from '@/Tools/Utility/DynamoDBClient';

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
   * @param id
   * @param tracking_id
   */
  async getOrganization(id: number, tracking_id: string) {
    try {
      this.logger.info(
        'NewsFeedDBRepository [MediaOrganization] レコード読み取り開始',
        this.logTool.getStartDbIoParams({ tracking_id }),
      );
      const startTime = this.dateTool.processStartTime();

      const command: GetItemCommandInput = {
        TableName: 'MediaOrganization',
        Key: {
          organization_id: { N: id.toString() },
        },
      };

      const { Item } = await dynamodb.send(new GetItemCommand(command));

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info(
        'NewsFeedDBRepository [MediaOrganization] レコード読み取り完了',
        this.logTool.getSuccessDbIoParams<typeof Item>({ tracking_id, time: endTime, result: Item }),
      );

      return { organization_id: Item?.organization_id.N, name: Item?.name.S };
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `NewsFeedDBRepository [MediaOrganization] レコード読み取り失敗`,
          this.logTool.getFailedParams({ tracking_id, exception: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  /**
   * レコード作成
   * @param payload
   * @param tracking_id
   */
  async create(payload: NewsFeed.Entity, tracking_id: string) {
    const { title, url, organization, article_created_at, article_updated_at } = payload;
    const organizationName = organization.name;

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード作成開始`,
        this.logTool.getStartDbIoParams({ tracking_id }),
      );
      const startTime = this.dateTool.processStartTime();
      const command: PutItemCommandInput = {
        TableName: 'NewsFeed',
        Item: {
          id: { S: tracking_id },
          title: { S: title },
          url: { S: url },
          organization_id: { S: organization.id.toString() },
          article_created_at: { S: article_created_at },
          article_updated_at: { S: article_updated_at ?? '' },
          created_at: { S: this.dateTool.getUtc() },
        },
      };
      const result = await dynamodb.send(new PutItemCommand(command));
      const endTime = this.dateTool.processEndTime(startTime);

      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード作成完了`,
        this.logTool.getSuccessDbIoParams<typeof result>({ tracking_id, time: endTime, result }),
      );
      return result;
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `NewsFeedDBRepository [${organizationName}] レコード作成失敗`,
          this.logTool.getFailedParams({ tracking_id, exception: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  /**
   * レコード読み取り
   * @param url
   * @param organization
   * @param tracking_id
   */
  async read(url: string, organization: NewsFeed.Organization, tracking_id: string) {
    const { name: organizationName } = organization;

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード読み取り開始`,
        this.logTool.getStartDbIoParams({ tracking_id }),
      );
      const startTime = this.dateTool.processStartTime();

      const command: QueryCommandInput = {
        TableName: 'NewsFeed',
        IndexName: 'UrlIndex',
        KeyConditionExpression: '#url = :url',
        ExpressionAttributeNames: {
          '#url': 'url',
        },
        ExpressionAttributeValues: {
          ':url': { S: url },
        },
      };

      const { Items } = await dynamodb.send(new QueryCommand(command));

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード読み取り完了`,
        this.logTool.getSuccessDbIoParams<typeof Items>({ tracking_id, time: endTime, result: Items }),
      );

      if (!Items) {
        return Items;
      }

      if (Items.length === 0) {
        return undefined;
      }

      return Items[0];
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `NewsFeedDBRepository [${organizationName}] レコード読み取り失敗`,
          this.logTool.getFailedParams({ tracking_id, exception: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }

  /**
   * レコード更新
   * @param payload
   * @param tracking_id
   */
  async update(payload: NewsFeed.Entity, tracking_id: string) {
    const {
      id,
      title,
      organization: { name: organizationName },
      article_updated_at,
    } = payload;
    if (!article_updated_at || !id) return;

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード更新開始`,
        this.logTool.getStartDbIoParams({ tracking_id }),
      );

      const startTime = this.dateTool.processStartTime();

      const command: UpdateItemCommandInput = {
        TableName: 'NewsFeed',
        Key: {
          id: { S: id },
        },
        UpdateExpression: 'set #title = :title, #article_updated_at = :article_updated_at',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#article_updated_at': 'article_updated_at',
        },
        ExpressionAttributeValues: {
          ':title': { S: title },
          ':article_updated_at': { S: article_updated_at },
        },
      };
      const result = await dynamodb.send(new UpdateItemCommand(command));

      const endTime = this.dateTool.processEndTime(startTime);

      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード更新完了`,
        this.logTool.getSuccessDbIoParams<typeof result>({ tracking_id, time: endTime, result }),
      );
      return result;
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `NewsFeedDBRepository [${organizationName}] レコード更新失敗`,
          this.logTool.getFailedParams({ tracking_id, exception: e.name, stacktrace: e.stack as string }),
        );
      }
    }
  }
}
