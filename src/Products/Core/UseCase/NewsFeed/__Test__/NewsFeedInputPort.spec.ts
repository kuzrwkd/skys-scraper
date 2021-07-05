import { container } from '@/Products/Adapter/CoreController/NewsFeed/NewsFeedDIAdapter';

const newsFeedInputPort: NewsFeed.INewsFeedInputPort = container.resolve('NewsFeedInputPort');

describe('setterで代入した値がgetterで取得できる', () => {
  newsFeedInputPort.inputData = {
    name: 'nikkei',
    tags: 'preliminaryReport',
  };

  it('nameの取得', () => {
    const name = newsFeedInputPort.getName;
    expect(name).toBe('nikkei');
  });

  it('tagの取得', () => {
    const tags = newsFeedInputPort.getTags;
    expect(tags).toBe('preliminaryReport');
  });
});
