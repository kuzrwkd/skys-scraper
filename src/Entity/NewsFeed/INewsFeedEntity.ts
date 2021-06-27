export interface INewsFeedEntity {
  set setNewsFeedEntity(Entity: Entity)
  get getNewsFeedEntity(): Entity
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
