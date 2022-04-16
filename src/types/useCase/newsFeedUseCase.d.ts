/**
 * NewsFeedのInteract
 */
export interface INewsFeedInteract {
  handle(data: RequestDataParams[], tracking_id: string): Promise<boolean>;
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
