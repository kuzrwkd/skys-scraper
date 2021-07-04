import { injectable, inject } from 'tsyringe'

@injectable()
export class NewsFeedPresenter {
  constructor(@inject('NewsFeedOutputPort') private newsFeedOutputPort: NewsFeed.INewsFeedOutputPort) {}
  async handle() {
    return this.newsFeedOutputPort.getResult
  }
}
