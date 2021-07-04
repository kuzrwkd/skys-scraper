import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedOutputPort {
  private result: string;

  set setResult(result: string) {
    this.result = result ?? 'failed';
  }

  get getResult() {
    return this.result ?? 'failed';
  }
}
