import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedPresenter {
  async handle(result: boolean) {
    return result;
  }
}
