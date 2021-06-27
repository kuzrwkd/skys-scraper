export interface INewsFeedInteract {
  handle(NewsFeedInputData: InputData): string
}

export interface INewsFeedInputPort {
  set inputData(InputData: InputData)
  get getName(): string
  get getCategory(): string
  get getTags(): string
}

export type InputData = {
  name: string
  category: string
  tags: string
}
