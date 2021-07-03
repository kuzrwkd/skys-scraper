// lib
import { inject, injectable } from 'tsyringe'

@injectable()
export class NewsFeedRepository {
  constructor(@inject('BaseDBRepository') private baseDBRepository: DBBase.IBaseDBRepository) {}

  async create(entityData: NewsFeed.Entity[]) {
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

  async read(url: string) {
    const prisma = this.baseDBRepository.getClient()
    try {
      const record = await prisma.newsFeed.findFirst({
        where: {
          url,
        },
      })
      await prisma.$disconnect()
      return record
    } catch (e) {}
  }

  async update(entityData: NewsFeed.Entity) {
    const prisma = this.baseDBRepository.getClient()
    try {
      await prisma.newsFeed.update({
        where: {
          // TODO: 後で直す
          // @ts-ignore
          url: entityData.url,
        },
        data: {
          title: entityData.title,
          articleUpdatedAt: entityData.articleUpdatedAt,
        },
      })
    } catch (e) {}
    await prisma.$disconnect()
  }
}
