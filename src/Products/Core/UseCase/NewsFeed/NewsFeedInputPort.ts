import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedInputPort {
  private requestDate!: NewsFeed.RequestData;

  set setInputData({ data }: NewsFeed.RequestData) {
    this.requestDate = { data };
  }

  get getInputDate(): NewsFeed.RequestDataParams[] {
    return this.requestDate.data;
  }
}
