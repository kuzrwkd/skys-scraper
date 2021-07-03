import { injectable } from 'tsyringe'

@injectable()
export class NewsFeedInputPort {
  private name: string
  private category: string
  private tags: string

  set inputData({ name, category, tags }: NewsFeed.InputData) {
    this.name = name
    this.category = category
    this.tags = tags
  }

  get getName() {
    return this.name
  }

  get getCategory() {
    return this.category
  }

  get getTags() {
    return this.tags
  }
}
