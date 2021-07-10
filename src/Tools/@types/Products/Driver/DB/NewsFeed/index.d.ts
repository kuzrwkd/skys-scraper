export interface INewsFeedDBRepository {
  processLogging(): void;
  findOrganization<T>(id: number): Promise<T | undefined>;
  create(data: NewsFeed.Entity): Promise<void>;
  read<T>(url: string, organization: NewsFeed.Organization): Promise<T | undefined>;
  update(data: NewsFeed.Entity): Promise<void>;
}
