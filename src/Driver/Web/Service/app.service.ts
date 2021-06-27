import { Injectable } from '@nestjs/common'
import { NewsFeedController } from '@/Adapter/Controller/NewsFeed/NewsFeedController'
import { container } from '@/Adapter/Controller/NewsFeed/NewsFeedDIContainer'

@Injectable()
export class AppService {
  newsFeedController: NewsFeedController

  constructor() {
    this.newsFeedController = container.resolve('NewsFeedController')
  }

  getHello(): string {
    return 'Hello World!'
  }

  dispatchData(data) {
    this.newsFeedController.dispatchData(data)
  }

  handle() {
    return this.newsFeedController.handle()
  }
}
