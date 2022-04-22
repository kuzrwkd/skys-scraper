import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedEntity {
  private entity!: NewsFeed.Entity[];

  set setNewsFeed(data: NewsFeed.Entity[]) {
    this.entity = data;
  }

  get getNewsFeed(): NewsFeed.Entity[] {
    return this.entity;
  }
}
