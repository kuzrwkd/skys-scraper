import { injectable } from 'tsyringe'
import { Entity } from '@/Entity/NewsFeed/INewsFeedEntity'

@injectable()
export class NewsFeedEntity {
  private entity: Entity[]

  set setNewsFeed(data: Entity[]) {
    this.entity = data
  }

  get getNewsFeed(): Entity[] {
    return this.entity
  }
}
