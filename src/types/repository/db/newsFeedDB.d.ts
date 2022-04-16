type CreateAndUpdateColumn = {
  created_at: string;
  updated_at?: string;
};

export interface INewsFeedDB {
  processLogging(): void;
  getOrganization(organization_id: number, tracking_id: string): Promise<NewsFeed.Organization>;
  create(data: NewsFeed.Entity, tracking_id: string): Promise<void>;
  read(
    url: string,
    organization: NewsFeed.Organization,
    tracking_id: string,
  ): Promise<NewsFeed.Entity & CreateAndUpdateColumn>;
  update(data: NewsFeed.Entity & CreateAndUpdateColumn, tracking_id: string): Promise<void>;
}
