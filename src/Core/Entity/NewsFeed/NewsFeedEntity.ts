import { injectable } from 'tsyringe'
import { Entity } from '@/Core/Entity/NewsFeed/INewsFeedEntity'

@injectable()
export class NewsFeedEntity {
  private entity: Entity[]

  /**
   * newsFeedのsetter
   * @param data - The first input Entity[]
   */
  set setNewsFeed(data: Entity[]) {
    this.entity = data
  }

  /**
   * newsFeedのgetter
   */
  get getNewsFeed(): Entity[] {
    return this.entity
  }
}
