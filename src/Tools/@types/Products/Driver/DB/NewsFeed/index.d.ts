export interface INewsFeedDBRepository {
  processLogging(): void;
  getOrganization(organization_id: number, tracking_id: string): Promise<NewsFeed.Organization>;
  create(data: NewsFeed.Entity, tracking_id: string): Promise<void>;
  read(url: string, organization: NewsFeed.Organization, tracking_id: string): Promise<NewsFeed.Entity>;
  update(data: NewsFeed.Entity, tracking_id: string): Promise<void>;
}
