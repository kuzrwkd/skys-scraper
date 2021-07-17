export interface INewsFeedEntity {
  set setNewsFeed(Entity: Entity[]);
  get getNewsFeed(): Entity[];
}

export type Entity = {
  id?: number;
  title: string;
  url: string;
  organization: Organization;
  contents: Contents;
  articleCreatedAt: string;
  articleUpdatedAt: string | null;
};

export type Organization = {
  id: number;
  name: string | null;
};

export type Contents = {
  id: number;
  name: string | null;
};
