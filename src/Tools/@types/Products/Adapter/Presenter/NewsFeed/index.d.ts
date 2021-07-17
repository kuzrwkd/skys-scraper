export interface INewsFeedPresenter {
  handle(result: boolean): Promise<boolean>;
}
