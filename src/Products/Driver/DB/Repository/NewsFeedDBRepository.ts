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
          id: { N: id.toString() },
        },
      };

      const { Item } = await dynamodb.send(new GetItemCommand(command));

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info(
        'NewsFeedDBRepository [MediaOrganization] レコード読み取り完了',
        this.logTool.getSuccessDbIoParams<typeof Item>({ tracking_id, time: endTime, result: Item }),
      );

      return { id: Item?.id.N, name: Item?.name.S };
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
        TableName: 'NikkeiNewsFeed',
        Item: {
          id: { S: tracking_id },
          title: { S: title },
          url: { S: url },
          organization_id: { N: organization.id.toString() },
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
        TableName: 'NikkeiNewsFeed',
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

      if (!Items || Items.length === 0) {
        return undefined;
      }

      const result = Items[0];

      return {
        id: result.id.S,
        title: result.title.S,
        url: result.url.S,
        organization,
        article_created_at: result.article_created_at.S,
        article_updated_at: result.article_updated_at.S,
        created_at: result.created_at.S,
      };
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
  async update(payload: NewsFeed.Entity & { created_at: string; updated_at?: string }, tracking_id: string) {
    const {
      id,
      title,
      organization: { name: organizationName },
      article_created_at,
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
        TableName: 'NikkeiNewsFeed',
        Key: {
          id: { S: id },
          article_created_at: { S: article_created_at },
        },
        UpdateExpression: 'set #title = :title, #article_updated_at = :article_updated_at, #updated_at = :updated_at',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#article_updated_at': 'article_updated_at',
          '#updated_at': 'updated_at',
        },
        ExpressionAttributeValues: {
          ':title': { S: title },
          ':article_updated_at': { S: article_updated_at },
          ':updated_at': { S: this.dateTool.getUtc() },
        },
        ReturnValues: 'ALL_NEW',
        ConditionExpression: 'attribute_exists(#article_updated_at)',
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
