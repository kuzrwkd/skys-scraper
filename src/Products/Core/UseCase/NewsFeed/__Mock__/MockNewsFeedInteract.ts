import { injectable } from 'tsyringe';

@injectable()
export class MockNewsFeedInteract {
  async handle() {
    try {
      return true;
    } catch (e) {
      return true;
    }
  }
}
