import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedInputPort {
  private name: string;
  private tags: string;

  set inputData({ name, tags }: NewsFeed.InputData) {
    this.name = name;
    this.tags = tags;
  }

  get getName() {
    return this.name;
  }

  get getTags() {
    return this.tags;
  }
}
