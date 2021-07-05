import { injectable } from 'tsyringe';

@injectable()
export class MockNewsFeedInteract {
  async handle() {
    try {
      return 'success';
    } catch (e) {
      return 'failed';
    }
  }
}
