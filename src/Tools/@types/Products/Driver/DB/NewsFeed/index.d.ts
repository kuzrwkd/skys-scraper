export interface INewsFeedDBRepository {
  processLogging(): void;
  findOrganization(id: number): Promise<any | undefined>;
  create(data: NewsFeed.Entity): Promise<void>;
  read(url: string, organization): Promise<any | undefined>;
  update(data: NewsFeed.Entity): Promise<void>;
}
