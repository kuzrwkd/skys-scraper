// lib
import { prisma } from '@/Products/Driver/DB/config';
import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedRepository {
  async create(entityData: NewsFeed.Entity[]) {
    try {
      for (const item of entityData) {
        await prisma.newsFeed.create({
          data: {
            title: item.title,
            url: item.url,
            organizationId: item.organizationId,
            articleCreatedAt: item.articleCreatedAt,
            articleUpdatedAt: item.articleUpdatedAt,
          },
        });
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async read(url: string) {
    try {
      return await prisma.newsFeed.findFirst({
        where: {
          url,
        },
      });
    } catch (e) {
      return false;
    }
  }

  async update(entityData: NewsFeed.Entity) {
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
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
