import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedInputPort {
  private organizationId;
  private url;

  set setInputData({ organizationId, url }: NewsFeed.InputData) {
    this.organizationId = organizationId;
    this.url = url;
  }

  get getOrganizationId() {
    return this.organizationId;
  }

  get getUrls() {
    return this.url;
  }
}
