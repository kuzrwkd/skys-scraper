import { container } from '@/Tools/Containers/Products/Adapter/NewsFeed';

describe('NewsFeedInputPortのテスト', () => {
  const newsFeedInputPort: NewsFeed.INewsFeedInputPort = container.resolve('NewsFeedInputPort');
  const mockOrganizationId = 1;
  const mockContentsId = 1;
  const mockUrl = [
    'https://www.nikkei.com/news/category/financial/',
    'https://www.nikkei.com/news/category/markets/',
    'https://www.nikkei.com/news/category/technology/',
    'https://www.nikkei.com/news/category/international/',
  ];

  newsFeedInputPort.setInputData = {
    organizationId: mockOrganizationId,
    contentsId: mockContentsId,
    url: mockUrl,
  };

  it('organizationIdの取得', () => {
    const organizationId = newsFeedInputPort.getOrganizationId;
    expect(organizationId).toBe(mockOrganizationId);
  });

  it('urlの取得', () => {
    const url = newsFeedInputPort.getUrls;
    expect(url).toStrictEqual(mockUrl);
  });
});
