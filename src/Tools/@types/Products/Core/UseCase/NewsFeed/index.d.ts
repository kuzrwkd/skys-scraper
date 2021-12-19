/**
 * NewsFeedのInteract
 */
export interface INewsFeedInteract {
  handle(data: RequestDataParams[], tracking_id: string): Promise<boolean>;
}

/**
 * NewsFeedのInputPort
 */
export interface INewsFeedInputPort {
  set setInputData(data: RequestData);
  get getInputDate(): RequestDataParams[];
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
  data: RequestDataParams[];
};

export type RequestDataParams = {
  organizationId: number;
  url: string;
};
