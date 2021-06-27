import { injectable } from 'tsyringe'
import { INewsFeedEntity } from '@/Entity/NewsFeed/INewsFeedEntity'

@injectable()
export class NewsFeedEntity implements INewsFeedEntity {
  private title: string
  private url: string
  private image: string
  private organization: {
    logo: string
    name: string
  }
  private createdAt: string
  private updatedAt: string

  newsFeedEntity({ title, url, image, organization, createdAt, updatedAt }) {
    this.title = title
    this.url = url
    this.image = image
    this.organization = organization
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  getNewsFeed() {
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
