export interface INewsFeedPresenter {
  handle(result): Promise<boolean>;
}
