import { Entity } from '@/Core/Entity/NewsFeed/INewsFeedEntity'

export interface INewsFeedRepository {
  create(data: Entity[]): Promise<void>
  read(url: string): Promise<any | undefined>
  update(data: Entity): Promise<void>
}
