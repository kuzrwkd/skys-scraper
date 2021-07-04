/**
 * NewsFeedのInteract
 */
export interface INewsFeedInteract {
  handle(): Promise<void>
}

/**
 * NewsFeedのInteractMock
 */
export interface IMockNewsFeedInteract {
  handle(NewsFeedInputData: InputData): Promise<string>
}

/**
 * NewsFeedのInputPort
 */
export interface INewsFeedInputPort {
  set inputData(InputData: InputData)
  get getName(): string
  get getTags(): string
}

/**
 * NewsFeedのOutputPort
 */
export interface INewsFeedOutputPort {
  set setResult(result: string)
  get getResult(): string
}

/**
 * その他
 */
export type InputData = {
  name: string
  tags: string
}
