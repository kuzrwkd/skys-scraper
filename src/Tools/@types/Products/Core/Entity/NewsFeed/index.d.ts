export interface INewsFeedEntity {
  set setNewsFeed(Entity: Entity[]);
  get getNewsFeed(): Entity[];
}

export type Entity = {
  id?: number;
  title: string;
  url: string;
  organization: Organization;
  articleCreatedAt: string;
  articleUpdatedAt: string | null;
};

export type Organization = {
  id: number;
  name: string | null;
};
