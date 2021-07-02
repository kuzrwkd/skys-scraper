import { PrismaClient } from '@prisma/client'

export class BaseDBRepository {
  getClient(): PrismaClient {
    return new PrismaClient()
  }
}
