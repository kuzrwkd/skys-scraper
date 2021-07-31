import { container } from '@/Tools/Containers/Products/NewsFeed';

describe('NewsFeedInputPortのテスト', () => {
  const newsFeedInputPort: NewsFeed.INewsFeedInputPort = container.resolve('NewsFeedInputPort');
  const mockData = {
    data: [
      {
        organizationId: 1,
        contentsId: 1,
        url: 'https://www.nikkei.com/news/category/economy/',
      },
      {
        organizationId: 1,
        contentsId: 2,
        url: 'https://www.nikkei.com/news/category/politics/',
      },
      {
        organizationId: 1,
        contentsId: 3,
        url: 'https://www.nikkei.com/news/category/business/',
      },
    ],
  };

  newsFeedInputPort.setInputData = mockData;

  it('organizationIdの取得', () => {
    const data = newsFeedInputPort.getInputDate;
    expect(data).toBe(mockData.data);
  });
});
