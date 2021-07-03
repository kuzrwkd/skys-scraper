import { PrismaClient } from '@prisma/client'

export interface IBaseDBRepository {
  getClient(): PrismaClient
}
