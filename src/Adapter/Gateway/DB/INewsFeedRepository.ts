import { Entity } from '@/Entity/NewsFeed/INewsFeedEntity'

export interface INewsFeedRepository {
  create(data: Entity[]): Promise<void>
  update()
}
