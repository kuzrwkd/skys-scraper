export interface INewsFeedController {
  handle(data: NewsFeed.RequestData): Promise<boolean>;
}
