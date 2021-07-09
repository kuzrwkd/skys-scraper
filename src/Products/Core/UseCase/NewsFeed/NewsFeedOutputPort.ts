import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedOutputPort {
  private result: string;

  set setResult(result) {
    this.result = result ?? false;
  }

  get getResult() {
    return this.result ?? false;
  }
}
