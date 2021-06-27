export interface INewsFeedEntity {
  set setNewsFeed(Entity: Entity)
  get getNewsFeed(): Entity
}

export type Entity = {
  title: string
  url: string
  image: string
  organization: {
    logo: string
    name: string
  }
  createdAt: string
  updatedAt: string
}
