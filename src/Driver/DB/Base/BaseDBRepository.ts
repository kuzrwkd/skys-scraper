import { PrismaClient } from '@prisma/client';

export class BaseDBRepository {
  /**
   * ormのclient生成関数
   */
  getClient() {
    return new PrismaClient();
  }
}
