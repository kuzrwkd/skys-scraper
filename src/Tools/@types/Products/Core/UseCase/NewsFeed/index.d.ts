/**
 * NewsFeedのInteract
 */
export interface INewsFeedInteract {
  handle(RequestData: RequestData): Promise<boolean>;
}

/**
 * NewsFeedのInputPort
 */
export interface INewsFeedInputPort {
  set setInputData(RequestData: RequestData);
  get getOrganizationId(): number;
  get getContentsId(): number;
  get getUrls(): string[];
}

/**
 * NewsFeedのOutputPort
 */
export interface INewsFeedOutputPort {
  set setResult(result: boolean);
  get getResult(): boolean;
}

/**
 * その他
 */
export type RequestData = {
  organizationId: number;
  contentsId: number;
  url: string[];
};
