import { injectable } from 'tsyringe'

import { INewsFeedInputPort, InputData } from '@/UseCase/NewsFeed/Interface'

@injectable()
export class NewsFeedInputPort implements INewsFeedInputPort {
  private name: string
  private category: string
  private tags: string

  inputData({ name, category, tags }: InputData) {
    this.name = name
    this.category = category
    this.tags = tags
  }

  getName() {
    return this.name
  }

  getCategory() {
    return this.category
  }

  getTags() {
    return this.tags
  }
}
