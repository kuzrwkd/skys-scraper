// lib
import { filterInsertRegex, filterSelectRegex, filterUpdateRegex, prisma } from '@/Products/Driver/DB/config';
import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedDBRepository {
  private logger: Lib.Logger;
  private organizationName: string | null = null;

  constructor(
    @inject('LogTool') private logTool: Tools.ILogTool,
    @inject('RegExpVerExTool') private regExpVerEx: Tools.IRegExpVerExTool,
    @inject('DateTool') private dateTool: Tools.IDateTool,
  ) {
    this.logger = this.logTool.createLogger();
    this.processLogging();
  }

  /**
   * DB処理実行中のlogging
   */
  processLogging() {
    prisma.$on<any>('query', (e: any) => {
      if (filterInsertRegex.test(e.query)) {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード作成実行`,
          this.logTool.getProcessDbIoParams(e.query),
        );
      }

      const urlRegExp = this.regExpVerEx.urlRegExp();
      if (filterSelectRegex.test(e.query) && urlRegExp.test(JSON.parse(e.params)[0])) {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード読み取り実行`,
          this.logTool.getProcessDbIoParams(e.query),
        );
      }

      if (filterUpdateRegex.test(e.query)) {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード更新実行`,
          this.logTool.getProcessDbIoParams(e.query),
        );
      }
    });
  }

  /**
   * 機関マスター検索
   *  @param id
   */
  async findOrganization(id: number) {
    this.logger.info(
      'NewsFeedDBRepository [OrganizationMaster] レコード読み取り開始',
      this.logTool.getStartDbIoParams(),
    );
    const startTime = this.dateTool.processStartTime();
    const record = prisma.organizationMaster.findFirst({
      where: {
        id,
      },
    });
    const endTime = this.dateTool.processEndTime(startTime);
    this.logger.info(
      'NewsFeedDBRepository [OrganizationMaster] レコード読み取り完了',
      this.logTool.getSuccessDbIoParams<typeof record>(endTime, record),
    );
    return record;
  }

  /**
   * コンテンツマスター検索
   * @param id
   */
  async findContents(id: number) {
    this.logger.info('NewsFeedDBRepository [ContentsMaster] レコード読み取り開始', this.logTool.getStartDbIoParams());
    const startTime = this.dateTool.processStartTime();
    const record = prisma.contentsMaster.findFirst({
      where: {
        id,
      },
    });
    const endTime = this.dateTool.processEndTime(startTime);
    this.logger.info(
      'NewsFeedDBRepository [ContentsMaster] レコード読み取り完了',
      this.logTool.getSuccessDbIoParams<typeof record>(endTime, record),
    );
    return record;
  }

  /**
   * レコード作成
   * @param { title, url, organization, contents, articleCreatedAt, articleUpdatedAt } - NewsFeed.Entityのプロパティ
   */
  async create({ title, url, organization, contents, articleCreatedAt, articleUpdatedAt }: NewsFeed.Entity) {
    const organizationName = organization.name;
    this.organizationName = organizationName; // prismaのloggingで利用

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード作成開始`,
        this.logTool.getStartDbIoParams(),
      );
      const startTime = this.dateTool.processStartTime();
      const record = await prisma.newsFeed.create({
        data: {
          title,
          url,
          organizationId: organization.id,
          contentsId: contents.id,
          articleCreatedAt,
          articleUpdatedAt,
        },
      });
      const endTime = this.dateTool.processEndTime(startTime);

      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード作成完了`,
        this.logTool.getSuccessDbIoParams<typeof record>(endTime, record),
      );
      return record;
    } catch (err) {
      this.logger.error(
        `NewsFeedDBRepository [${organizationName}] レコード作成失敗`,
        this.logTool.getFailedParams(err.constructor.name, err.stack as string),
      );
    }
  }

  /**
   * レコード読み取り
   * @param url
   * @param { name } - organizationNameが入る
   */
  async read(url: string, { name }: NewsFeed.Organization) {
    const organizationName = name;
    this.organizationName = organizationName; // prismaのloggingで利用

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード読み取り開始`,
        this.logTool.getStartDbIoParams(),
      );
      const startTime = this.dateTool.processStartTime();
      const record = await prisma.newsFeed.findFirst({
        where: {
          url,
        },
      });

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード読み取り完了`,
        this.logTool.getSuccessDbIoParams<typeof record>(endTime, record),
      );

      return record;
    } catch (err) {
      this.logger.error(
        `NewsFeedDBRepository [${organizationName}] レコード読み取り失敗`,
        this.logTool.getFailedParams(err.constructor.name, err.stack as string),
      );
    }
  }

  /**
   * レコード更新
   * @param { id, title, organization, articleUpdatedAt } - NewsFeed.Entityのプロパティ
   */
  async update({ id, title, organization, articleUpdatedAt }: NewsFeed.Entity) {
    const organizationName = organization.name;
    this.organizationName = organizationName; // prismaのloggingで利用

    try {
      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード更新開始`,
        this.logTool.getStartDbIoParams(),
      );

      const startTime = this.dateTool.processStartTime();
      const record = await prisma.newsFeed.update({
        where: {
          id,
        },
        data: {
          title,
          articleUpdatedAt,
        },
      });
      const endTime = this.dateTool.processEndTime(startTime);

      this.logger.info(
        `NewsFeedDBRepository [${organizationName}] レコード更新完了`,
        this.logTool.getSuccessDbIoParams<typeof record>(endTime, record),
      );
      return record;
    } catch (err) {
      this.logger.error(
        `NewsFeedDBRepository [${organizationName}] レコード更新失敗`,
        this.logTool.getFailedParams(err.constructor.name, err.stack as string),
      );
    }
  }
}
