import { injectable } from 'tsyringe'

import { InputData } from '@/Core/UseCase/NewsFeed/INewsFeedUseCase'

@injectable()
export class NewsFeedInputPort {
  private name: string
  private category: string
  private tags: string

  set inputData({ name, category, tags }: InputData) {
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
