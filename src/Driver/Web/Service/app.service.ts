import { Injectable } from '@nestjs/common'
import { NewsFeedController } from '@/Adapter/CoreController/NewsFeed/NewsFeedController'
import { container } from '@/Adapter/CoreController/NewsFeed/NewsFeedDIAdapter'

@Injectable()
export class AppService {
  newsFeedController: NewsFeedController

  constructor() {
    this.newsFeedController = container.resolve('NewsFeedController')
  }

  getHello(): string {
    return 'Hello World!'
  }

  dispatch(data) {
    this.newsFeedController.dispatch(data)
  }

  handle() {
    return this.newsFeedController.handle()
  }
}
