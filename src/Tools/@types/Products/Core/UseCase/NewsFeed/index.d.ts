/**
 * NewsFeedのInteract
 */
export interface INewsFeedInteract {
  handle(inputData: InputData): Promise<boolean>;
}

/**
 * NewsFeedのInputPort
 */
export interface INewsFeedInputPort {
  set setInputData(InputData: InputData);
  get getOrganizationId(): number;
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
export type InputData = {
  organizationId: number;
  url: string[];
};
