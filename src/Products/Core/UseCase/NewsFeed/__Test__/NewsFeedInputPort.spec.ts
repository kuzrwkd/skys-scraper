import { container } from '@/DIContainer/Products/NewsFeed/NewsFeedDIAdapter';

const newsFeedInputPort: NewsFeed.INewsFeedInputPort = container.resolve('NewsFeedInputPort');

describe('setterで代入した値がgetterで取得できる', () => {
  newsFeedInputPort.inputData = {
    organizationId: 1,
    tags: 'preliminaryReport',
  };

  it('nameの取得', () => {
    const name = newsFeedInputPort.getOrganizationId;
    expect(name).toBe(1);
  });

  it('tagの取得', () => {
    const tags = newsFeedInputPort.getTags;
    expect(tags).toBe('preliminaryReport');
  });
});
