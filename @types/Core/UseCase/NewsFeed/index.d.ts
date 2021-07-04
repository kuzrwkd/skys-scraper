export interface INewsFeedInteract {
  handle(NewsFeedInputData: InputData): Promise<string>
}

export interface INewsFeedInputPort {
  set inputData(InputData: InputData)
  get getName(): string
  get getCategory(): string
  get getTags(): string
}

export interface INewsFeedOutputPort {
  set setResult(result: string)
  get getResult(): string
}

export type InputData = {
  name: string
  category: string
  tags: string
}
