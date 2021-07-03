export interface INewsFeedDBRepository {
  create(data: NewsFeed.Entity[]): Promise<void>
  read(url: string): Promise<any | undefined>
  update(data: NewsFeed.Entity): Promise<void>
}
