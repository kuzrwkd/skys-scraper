export interface INewsFeedController {
  handle(data: NewsFeed.InputData): Promise<boolean>;
}
