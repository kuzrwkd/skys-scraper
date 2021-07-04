import { Injectable } from '@nestjs/common'
import { NewsFeedController } from '@/Adapter/CoreController/NewsFeed/NewsFeedController'
import { container } from '@/Adapter/CoreController/NewsFeed/NewsFeedDIAdapter'

@Injectable()
export class AppService {
  newsFeedController: NewsFeedController

  constructor() {
    this.newsFeedController = container.resolve('NewsFeedController')
  }

  handle(data): Promise<string> {
    return this.newsFeedController.handle(data)
  }
}
