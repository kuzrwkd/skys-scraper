import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedInputPort {
  private organizationId: number;
  private url: string[];

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
