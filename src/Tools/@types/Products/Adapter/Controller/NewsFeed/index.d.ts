export interface INewsFeedController {
  handle(data): Promise<boolean>;
}
