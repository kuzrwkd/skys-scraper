export interface INewsFeedDBRepository {
  processLogging(): void;
  findOrganization(id: number): Promise<NewsFeed.Organization>;
  findContents(id: number): Promise<NewsFeed.Contents>;
  create(data: NewsFeed.Entity): Promise<void>;
  read(url: string, organization: NewsFeed.Organization): Promise<NewsFeed.Entity>;
  update(data: NewsFeed.Entity): Promise<void>;
}
