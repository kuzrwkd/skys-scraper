// lib
import { filterInsertRegex, filterSelectRegex, filterUpdateRegex, prisma } from '@/Products/Driver/DB/config';
import { injectable, inject } from 'tsyringe';

/**
 * Tools
 */
import { ExceptionTool } from '@/Tools/Utility/Exceptions';

@injectable()
export class NewsFeedDBRepository {
  private logger: Lib.Logger;
  private dbErrorObject?: any;
  private organizationName: string | null = null;

  constructor(
    @inject('Log') private logTool: Tools.ILogTool,
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
          this.logTool.processDbIo(e.query),
        );
      }

      const urlRegExp = this.regExpVerEx.urlRegExp();
      if (filterSelectRegex.test(e.query) && urlRegExp.test(JSON.parse(e.params)[0])) {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード読み取り実行`,
          this.logTool.processDbIo(e.query),
        );
      }

      if (filterUpdateRegex.test(e.query)) {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード更新実行`,
          this.logTool.processDbIo(e.query),
        );
      }
    });
  }

  /**
   * 機関マスター検索
   *  @param id - number
   */
  async findOrganization(id: number) {
    this.logger.info('NewsFeedDBRepository [OrganizationMaster] レコード読み取り開始', this.logTool.startDbIo());
    const startTime = this.dateTool.processStartTime();
    const record = prisma.organizationMaster.findFirst({
      where: {
        id,
      },
    });
    const endTime = this.dateTool.processEndTime(startTime);
    this.logger.info(
      'NewsFeedDBRepository [OrganizationMaster] レコード読み取り完了',
      this.logTool.successDbIo(endTime),
    );
    return record;
  }

  /**
   * コンテンツマスター検索
   * @param id - number
   */
  async findContents(id: number) {
    this.logger.info('NewsFeedDBRepository [ContentsMaster] レコード読み取り開始', this.logTool.startDbIo());
    const startTime = this.dateTool.processStartTime();
    const record = prisma.contentsMaster.findFirst({
      where: {
        id,
      },
    });
    const endTime = this.dateTool.processEndTime(startTime);
    this.logger.info('NewsFeedDBRepository [ContentsMaster] レコード読み取り完了', this.logTool.successDbIo(endTime));
    return record;
  }

  /**
   * レコード作成
   * @param data - NewsFeed.Entity
   */
  async create(data: NewsFeed.Entity) {
    try {
      this.organizationName = data.organization.name;
      this.logger.info(`NewsFeedDBRepository [${this.organizationName}] レコード作成開始`, this.logTool.startDbIo());
      const startTime = this.dateTool.processStartTime();
      const record = await prisma.newsFeed.create({
        data: {
          title: data.title,
          url: data.url,
          organizationId: data.organization.id,
          contentsId: data.contents.id,
          articleCreatedAt: data.articleCreatedAt,
          articleUpdatedAt: data.articleUpdatedAt,
        },
      });
      const endTime = this.dateTool.processEndTime(startTime);

      if (typeof record.id !== 'number') {
        (() => {
          this.dbErrorObject = { time: endTime };
          throw new ExceptionTool.DBCreateError();
        })();
      } else {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード作成完了`,
          this.logTool.successDbIo(endTime),
        );
        return record;
      }
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.logTool.failed(err.constructor.name, err.stack as string));
      }
      if (err instanceof ExceptionTool.DBCreateError) {
        this.logger.error(
          `NewsFeedDBRepository [${this.organizationName}] レコード作成失敗`,
          this.logTool.failedDbIo(this.dbErrorObject.time, err.constructor.name, err.stack as string),
        );
      }
    }
  }

  /**
   * レコード読み取り
   * @param url
   * @param organization
   */
  async read(url: string, organization: NewsFeed.Organization) {
    try {
      this.organizationName = organization.name;
      this.logger.info(
        `NewsFeedDBRepository [${this.organizationName}] レコード読み取り開始`,
        this.logTool.startDbIo(),
      );
      const startTime = this.dateTool.processStartTime();
      const record = await prisma.newsFeed.findFirst({
        where: {
          url,
        },
      });

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info(
        `NewsFeedDBRepository [${this.organizationName}] レコード読み取り完了`,
        this.logTool.successDbIo(endTime),
      );
      return record;
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.logTool.failed(err.constructor.name, err.stack as string));
      }
    }
  }

  /**
   * レコード更新
   * @param data - NewsFeed.Entity
   */
  async update(data: NewsFeed.Entity) {
    try {
      this.organizationName = data.organization.name;
      this.logger.info(`NewsFeedDBRepository [${this.organizationName}] レコード更新開始`, this.logTool.startDbIo());
      const startTime = this.dateTool.processStartTime();
      const record = await prisma.newsFeed.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          articleUpdatedAt: data.articleUpdatedAt,
        },
      });
      const endTime = this.dateTool.processEndTime(startTime);

      if (typeof record.id !== 'number') {
        (() => {
          this.dbErrorObject = { time: endTime };
          throw new ExceptionTool.DBUpdateError();
        })();
      } else {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード更新完了`,
          this.logTool.successDbIo(endTime),
        );
        return record;
      }
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.logTool.failed(err.constructor.name, err.stack as string));
      }
      if (err instanceof ExceptionTool.DBUpdateError) {
        this.logger.error(
          `NewsFeedDBRepository [${this.organizationName}] レコード更新失敗`,
          this.logTool.failedDbIo(this.dbErrorObject.time, err.constructor.name, err.stack as string),
        );
      }
    }
  }
}
