export interface INewsFeedInteract {
  handle(NewsFeedInputData: InputData): string
}

export interface INewsFeedInputPort {
  inputData(InputData: InputData): void
  getName(): string
  getCategory(): string
  getTags(): string
}

export type InputData = {
  name: string
  category: string
  tags: string
}
