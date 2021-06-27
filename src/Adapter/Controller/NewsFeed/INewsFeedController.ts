import { InputData } from '@/UseCase/NewsFeed/Interface'

export interface INewsFeedController {
  dispatchData(data: InputData): void
  handle(): string
}
