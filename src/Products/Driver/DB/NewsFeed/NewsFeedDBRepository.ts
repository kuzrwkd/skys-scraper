// lib
import { filterInsertRegex, filterSelectRegex, filterUpdateRegex, prisma } from '@/Products/Driver/DB/config';
import { injectable, inject } from 'tsyringe';

/**
 * Tools
 */
import { Exception } from '@/Tools/Utility/Exceptions';

@injectable()
export class NewsFeedDBRepository {
  private logger: Lib.Logger;
  private dbErrorObject;
  private organizationName: string;

  constructor(
    @inject('Log') private log: Tools.ILog,
    @inject('RegExpVerEx') private regExpVerEx: Tools.IRegExpVerEx,
    @inject('DayJs') private dayjs: Tools.IDayJs,
  ) {
    this.logger = this.log.createLogger();
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
          this.log.processDbIo(e.query),
        );
      }

      const urlRegExp = this.regExpVerEx.urlRegExp();
      if (filterSelectRegex.test(e.query) && urlRegExp.test(JSON.parse(e.params)[0])) {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード読み取り実行`,
          this.log.processDbIo(e.query),
        );
      }

      if (filterUpdateRegex.test(e.query)) {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード更新実行`,
          this.log.processDbIo(e.query),
        );
      }
    });
  }

  /**
   * 機関マスター検索
   *  @param id - number
   */
  async findOrganization(id: number) {
    this.logger.info('NewsFeedDBRepository [OrganizationMaster] レコード読み取り開始', this.log.startDbIo());
    const startTime = this.dayjs.processStartTime();
    const record = prisma.organizationMaster.findFirst({
      where: {
        id,
      },
    });
    const endTime = this.dayjs.processEndTime(startTime);
    this.logger.info('NewsFeedDBRepository [OrganizationMaster] レコード読み取り完了', this.log.successDbIo(endTime));
    return record;
  }

  /**
   * コンテンツマスター検索
   * @param id - number
   */
  async findContents(id: number) {
    this.logger.info('NewsFeedDBRepository [ContentsMaster] レコード読み取り開始', this.log.startDbIo());
    const startTime = this.dayjs.processStartTime();
    const record = prisma.contentsMaster.findFirst({
      where: {
        id,
      },
    });
    const endTime = this.dayjs.processEndTime(startTime);
    this.logger.info('NewsFeedDBRepository [ContentsMaster] レコード読み取り完了', this.log.successDbIo(endTime));
    return record;
  }

  /**
   * レコード作成
   * @param data - NewsFeed.Entity
   */
  async create(data: NewsFeed.Entity) {
    try {
      this.organizationName = data.organization.name;
      this.logger.info(`NewsFeedDBRepository [${this.organizationName}] レコード作成開始`, this.log.startDbIo());
      const startTime = this.dayjs.processStartTime();
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
      const endTime = this.dayjs.processEndTime(startTime);

      if (typeof record.id !== 'number') {
        (() => {
          this.dbErrorObject = { time: endTime };
          throw new Exception.DBCreateError();
        })();
      } else {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード作成完了`,
          this.log.successDbIo(endTime),
        );
        return record;
      }
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.log.failed(err.constructor.name, err.stack));
      }
      if (err instanceof Exception.DBCreateError) {
        this.logger.error(
          `NewsFeedDBRepository [${this.organizationName}] レコード作成失敗`,
          this.log.failedDbIo(this.dbErrorObject.time, err.constructor.name, err.stack),
        );
      }
    }
  }

  /**
   * レコード読み取り
   * @param url - string
   * @param organization - NewsFeed.Organization
   */
  async read(url, organization) {
    try {
      this.organizationName = organization.name;
      this.logger.info(`NewsFeedDBRepository [${this.organizationName}] レコード読み取り開始`, this.log.startDbIo());
      const startTime = this.dayjs.processStartTime();
      const record = await prisma.newsFeed.findFirst({
        where: {
          url,
        },
      });

      const endTime = this.dayjs.processEndTime(startTime);
      this.logger.info(
        `NewsFeedDBRepository [${this.organizationName}] レコード読み取り完了`,
        this.log.successDbIo(endTime),
      );
      return record;
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.log.failed(err.constructor.name, err.stack));
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
      this.logger.info(`NewsFeedDBRepository [${this.organizationName}] レコード更新開始`, this.log.startDbIo());
      const startTime = this.dayjs.processStartTime();
      const record = await prisma.newsFeed.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          articleUpdatedAt: data.articleUpdatedAt,
        },
      });
      const endTime = this.dayjs.processEndTime(startTime);

      if (typeof record.id !== 'number') {
        (() => {
          this.dbErrorObject = { time: endTime };
          throw new Exception.DBUpdateError();
        })();
      } else {
        this.logger.info(
          `NewsFeedDBRepository [${this.organizationName}] レコード更新完了`,
          this.log.successDbIo(endTime),
        );
        return record;
      }
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.log.failed(err.constructor.name, err.stack));
      }
      if (err instanceof Exception.DBUpdateError) {
        this.logger.error(
          `NewsFeedDBRepository [${this.organizationName}] レコード更新失敗`,
          this.log.failedDbIo(this.dbErrorObject.time, err.constructor.name, err.stack),
        );
      }
    }
  }
}
