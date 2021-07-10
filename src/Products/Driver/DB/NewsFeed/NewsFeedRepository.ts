// lib
import { prisma } from '@/Products/Driver/DB/config';
import { injectable, inject } from 'tsyringe';

/**
 * Tools
 */
import { Exception } from '@/Tools/Exceptions';

@injectable()
export class NewsFeedRepository {
  private logger: Lib.Logger;
  private dbErrorObject;

  constructor(@inject('Log') private log: Tools.ILog) {
    this.logger = this.log.createLogger;
  }

  /**
   * レコード作成
   * @param data
   */
  async create(data) {
    try {
      this.logger.info('レコード作成 開始', this.log.startDbIo());

      const record = await prisma.newsFeed.create({
        data: {
          title: data.title,
          url: data.url,
          organizationId: data.organizationId,
          articleCreatedAt: data.articleCreatedAt,
          articleUpdatedAt: data.articleUpdatedAt,
        },
      });

      if (typeof record.id !== 'number') {
        (() => {
          this.dbErrorObject = { query: '', query_result: '', time: '' };
          throw new Exception.DBCreateError();
        })();
      } else {
        this.logger.info('レコード作成 完了', this.log.successDbIo('', '', ''));
        return record;
      }
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.log.failed(err.constructor.name, err.stack));
      }
      if (err instanceof Exception.DBCreateError) {
        this.logger.error(
          'レコード作成 失敗',
          this.log.failedDbIo(
            this.dbErrorObject.query,
            this.dbErrorObject.queryResult,
            this.dbErrorObject.time,
            err.constructor.name,
            err.stack,
          ),
        );
      }
    }
  }

  /**
   * レコード読み取り
   * @param url
   */
  async read(url) {
    try {
      this.logger.info('レコード読み取り 開始', this.log.startDbIo());

      const record = await prisma.newsFeed.findFirst({
        where: {
          url,
        },
      });

      this.logger.info('レコード読み取り 完了', this.log.successDbIo('', '', ''));
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
      this.logger.info('レコード更新 開始', this.log.startDbIo());

      const record = await prisma.newsFeed.update({
        where: {
          url: entityData.url,
        },
        data: {
          title: entityData.title,
          articleUpdatedAt: entityData.articleUpdatedAt,
        },
      });

      if (typeof record.id !== 'number') {
        (() => {
          this.dbErrorObject = { query: '', query_result: '', time: '' };
          throw new Exception.DBUpdateError();
        })();
      } else {
        this.logger.info('レコード更新 完了', this.log.successDbIo('', '', ''));
        return record;
      }
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, this.log.failed(err.constructor.name, err.stack));
      }
      if (err instanceof Exception.DBUpdateError) {
        this.logger.error(
          'レコード更新 失敗',
          this.log.failedDbIo(
            this.dbErrorObject.query,
            this.dbErrorObject.queryResult,
            this.dbErrorObject.time,
            err.constructor.name,
            err.stack,
          ),
        );
      }
    }
  }
}
