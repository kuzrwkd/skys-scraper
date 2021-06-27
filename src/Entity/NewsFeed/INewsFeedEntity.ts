/**
 * NewsFeedEntityのinterface
 */
export interface INewsFeedEntity {
  newsFeedEntity(Entity): void
  getNewsFeed(): Entity
}

/**
 * interfaceで利用するtype
 */
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
