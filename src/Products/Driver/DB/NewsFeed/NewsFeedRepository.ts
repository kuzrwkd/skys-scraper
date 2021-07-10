// lib
import { filterInsertRegex, filterSelectRegex, filterUpdateRegex, prisma } from '@/Products/Driver/DB/config';
import { injectable, inject } from 'tsyringe';

/**
 * Tools
 */
import { Exception } from '@/Tools/Exceptions';

@injectable()
export class NewsFeedRepository {
  private logger: Lib.Logger;
  private dbErrorObject;
  private organizationName: string;

  constructor(
    @inject('Log') private log: Tools.ILog,
    @inject('RegExpVerEx') private regExpVerEx: Tools.IRegExpVerEx,
    @inject('DayJs') private dayjs: Tools.IDayJs,
  ) {
    this.logger = this.log.createLogger;
    this.processLogging();
  }

  /**
   * DB処理実行中のlogging
   */
  processLogging() {
    prisma.$on<any>('query', (e: any) => {
      if (filterInsertRegex.test(e.query)) {
        this.logger.info(
          `NewsFeedRepository [${this.organizationName}] レコード作成実行`,
          this.log.processDbIo(e.query),
        );
      }

      if (filterSelectRegex.test(e.query) && this.regExpVerEx.urlRegExp.test(JSON.parse(e.params)[0])) {
        this.logger.info(
          `NewsFeedRepository [${this.organizationName}] レコード読み取り実行`,
          this.log.processDbIo(e.query),
        );
      }

      if (filterUpdateRegex.test(e.query)) {
        this.logger.info(
          `NewsFeedRepository [${this.organizationName}] レコード更新実行`,
          this.log.processDbIo(e.query),
        );
      }
    });
  }

  /**
   * 機関マスター検索
   */
  async findOrganization(id: number) {
    this.logger.info('NewsFeedRepository [OrganizationMaster] レコード読み取り開始', this.log.startDbIo());
    const startTime = this.dayjs.processStartTime;
    const record = prisma.organizationMaster.findFirst({
      where: {
        id,
      },
    });
    const endTime = this.dayjs.processEndTime(startTime);
    this.logger.info('NewsFeedRepository [OrganizationMaster] レコード読み取り完了', this.log.successDbIo(endTime));
    return record;
  }

  /**
   * レコード作成
   * @param data
   */
  async create(data) {
    try {
      this.organizationName = await data.organization.name;
      this.logger.info(`NewsFeedRepository [${this.organizationName}] レコード作成開始`, this.log.startDbIo());
      const startTime = this.dayjs.processStartTime;
      const record = await prisma.newsFeed.create({
        data: {
          title: data.title,
          url: data.url,
          organizationId: data.organization.id,
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
          `NewsFeedRepository [${this.organizationName}] レコード作成完了`,
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
          `NewsFeedRepository [${this.organizationName}] レコード作成失敗`,
          this.log.failedDbIo(this.dbErrorObject.time, err.constructor.name, err.stack),
        );
      }
    }
  }

  /**
   * レコード読み取り
   * @param url
   * @param organization
   */
  async read(url, organization) {
    try {
      this.organizationName = organization.name;
      this.logger.info(`NewsFeedRepository [${this.organizationName}] レコード読み取り開始`, this.log.startDbIo());
      const startTime = this.dayjs.processStartTime;
      const record = await prisma.newsFeed.findFirst({
        where: {
          url,
        },
      });

      const endTime = this.dayjs.processEndTime(startTime);
      this.logger.info(
        `NewsFeedRepository [${this.organizationName}] レコード読み取り完了`,
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
   * @param entityData
   */
  async update(entityData) {
    try {
      this.organizationName = entityData.organization.name;
      this.logger.info(`NewsFeedRepository [${this.organizationName}] レコード更新開始`, this.log.startDbIo());
      const startTime = this.dayjs.processStartTime;
      const record = await prisma.newsFeed.update({
        where: {
          id: entityData.id,
        },
        data: {
          title: entityData.title,
          articleUpdatedAt: entityData.articleUpdatedAt,
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
          `NewsFeedRepository [${this.organizationName}] レコード更新完了`,
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
          `NewsFeedRepository [${this.organizationName}] レコード更新失敗`,
          this.log.failedDbIo(this.dbErrorObject.time, err.constructor.name, err.stack),
        );
      }
    }
  }
}
