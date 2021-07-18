import { injectable } from 'tsyringe';

@injectable()
export class NewsFeedInputPort {
  private organizationId: number;
  private contentsId: number;
  private url: string[];

  set setInputData({ organizationId, contentsId, url }: NewsFeed.RequestData) {
    this.organizationId = organizationId;
    this.contentsId = contentsId;
    this.url = url;
  }

  get getOrganizationId() {
    return this.organizationId;
  }

  get getContentsId() {
    return this.contentsId;
  }

  get getUrls() {
    return this.url;
  }
}
