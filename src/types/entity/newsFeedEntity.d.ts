export interface INewsFeedEntity {
  set setNewsFeed(Entity: Entity[]);
  get getNewsFeed(): Entity[];
}

export type Entity = {
  id: string;
  title: string;
  url: string;
  organization: Organization;
  article_created_at: string;
  article_updated_at?: string;
};

export type Organization = {
  id: number;
  name?: string;
};
