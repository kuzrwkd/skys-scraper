/**
 * Controller
 */
// lib
import { inject, injectable } from 'tsyringe'

// type
import {
  INewsFeedInputPort,
  INewsFeedInteract,
  InputData,
} from '@/UseCase/NewsFeed/Interface'

@injectable()
export class NewsFeedController {
  data: InputData

  constructor(
    @inject('NewsFeedInputPort') private inputData: INewsFeedInputPort,
    @inject('NewsFeedInteract') private useCase: INewsFeedInteract,
  ) {}

  test() {
    return 'test'
  }

  dispatchData(data: InputData) {
    this.data = data
  }

  handle() {
    this.inputData.inputData({
      name: this.data.name,
      category: this.data.category,
      tags: this.data.tags,
    })

    const inputData = {
      name: this.inputData.getName(),
      category: this.inputData.getCategory(),
      tags: this.inputData.getTags(),
    }

    return this.useCase.handle(inputData)
  }
}
