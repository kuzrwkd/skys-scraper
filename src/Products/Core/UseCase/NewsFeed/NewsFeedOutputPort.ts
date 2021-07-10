import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedOutputPort {
  private result: boolean;

  set setResult(result: boolean) {
    this.result = result ?? false;
  }

  get getResult() {
    return this.result ?? false;
  }
}
