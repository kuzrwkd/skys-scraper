import { injectable } from 'tsyringe'
import { Entity } from '@/Entity/NewsFeed/INewsFeedEntity'

@injectable()
export class NewsFeedEntity {
  private title: string
  private url: string
  private image: string
  private organization: {
    logo: string
    name: string
  }
  private createdAt: string
  private updatedAt: string

  set setNewsFeed({
    title,
    url,
    image,
    organization,
    createdAt,
    updatedAt,
  }: Entity) {
    this.title = title
    this.url = url
    this.image = image
    this.organization = organization
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  get getNewsFeed(): Entity {
    return {
      title: this.title,
      url: this.url,
      image: this.image,
      organization: this.organization,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
