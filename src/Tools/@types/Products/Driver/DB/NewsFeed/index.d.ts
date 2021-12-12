export interface INewsFeedDBRepository {
  processLogging(): void;
  getOrganization(id: number): Promise<NewsFeed.Organization>;
  create(data: NewsFeed.Entity): Promise<void>;
  read(url: string, organization: NewsFeed.Organization): Promise<NewsFeed.Entity>;
  update(data: NewsFeed.Entity): Promise<void>;
}
