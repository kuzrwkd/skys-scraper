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
} from '@/UseCase/NewsFeed/INewsFeedUseCase'

@injectable()
export class NewsFeedController {
  data: InputData

  constructor(
    @inject('NewsFeedInputPort') private inputPort: INewsFeedInputPort,
    @inject('NewsFeedInteract') private useCase: INewsFeedInteract,
  ) {}

  dispatch(data: InputData) {
    this.data = data
  }

  handle() {
    this.inputPort.inputData = {
      name: this.data.name,
      category: this.data.category,
      tags: this.data.tags,
    }

    const inputData = {
      name: this.inputPort.getName,
      category: this.inputPort.getCategory,
      tags: this.inputPort.getTags,
    }

    return this.useCase.handle(inputData)
  }
}
