// lib
import { inject, injectable } from 'tsyringe'

// type
import { IBaseDBRepository } from '@/Adapter/Gateway/DB/Base/IBaseDBRepository'
import { Entity } from '@/Entity/NewsFeed/INewsFeedEntity'

@injectable()
export class NewsFeedRepository {
  constructor(@inject('BaseDBRepository') private baseDBRepository: IBaseDBRepository) {}

  async create(entityData: Entity[]) {
    const prisma = this.baseDBRepository.getClient()
    try {
      for (const item of entityData) {
        await prisma.newsFeed.create({
          data: {
            title: item.title,
            url: item.url,
            articleCreatedAt: item.articleCreatedAt,
            articleUpdatedAt: item.articleUpdatedAt,
          },
        })
      }
    } catch (e) {}

    await prisma.$disconnect()
  }
}
