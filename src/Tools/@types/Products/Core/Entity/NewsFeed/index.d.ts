export type Entity = {
  id?: number;
  title: string;
  url: string;
  organization: {
    id: number;
    name: string;
  };
  articleCreatedAt: string;
  articleUpdatedAt: string | null;
};

export interface INewsFeedEntity {
  set setNewsFeed(Entity: Entity[]);
  get getNewsFeed(): Entity[];
}
