export type Entity = {
  title: string
  url: string
  organizationName?: string
  articleCreatedAt: string
  articleUpdatedAt: string | null
}

export interface INewsFeedEntity {
  set setNewsFeed(Entity: Entity[])
  get getNewsFeed(): Entity[]
}
