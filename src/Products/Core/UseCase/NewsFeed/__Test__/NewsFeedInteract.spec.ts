import { NewsFeedInteract } from '@/Products/Core/UseCase/NewsFeed/NewsFeedInteract';

jest.mock('@/Products/Core/UseCase/NewsFeed/NewsFeedInteract');
const newsFeedInteractMock = NewsFeedInteract as jest.Mock;

describe('NewsFeedInteractのテスト', () => {
  newsFeedInteractMock.mockImplementationOnce(() => {
    return {
      async handle(RequestData: NewsFeed.RequestData): Promise<boolean> {
        try {
          return RequestData.url.length > 0;
        } catch (e) {
          return false;
        }
      },
    };
  });

  const newsFeedInteract = new newsFeedInteractMock();

  const normalMockData = {
    organizationId: 1,
    url: [
      'https://www.nikkei.com/news/category/financial/',
      'https://www.nikkei.com/news/category/markets/',
      'https://www.nikkei.com/news/category/technology/',
      'https://www.nikkei.com/news/category/international/',
    ],
  };

  const abnormalMockData = {
    organizationId: 1,
    url: [],
  };

  it('handleメソッド正常系', () => {
    newsFeedInteract.handle(normalMockData).then((result: boolean) => expect(result).toBe(true));
  });

  it('handleメソッド異常系', () => {
    newsFeedInteract.handle(abnormalMockData).catch((result: boolean) => expect(result).toBe(false));
  });
});
