import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedInputPort {
  private organizationId;
  private tags;

  set inputData({ organizationId, tags }: NewsFeed.InputData) {
    this.organizationId = organizationId;
    this.tags = tags;
  }

  get getOrganizationId() {
    return this.organizationId;
  }

  get getTags() {
    return this.tags;
  }
}
