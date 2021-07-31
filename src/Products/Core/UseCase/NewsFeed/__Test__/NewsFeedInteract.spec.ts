import { NewsFeedInteract } from '@/Products/Core/UseCase/NewsFeed/NewsFeedInteract';

jest.mock('@/Products/Core/UseCase/NewsFeed/NewsFeedInteract');
const newsFeedInteractMock = NewsFeedInteract as jest.Mock;

describe('NewsFeedInteractのテスト', () => {
  newsFeedInteractMock.mockImplementationOnce(() => {
    return {
      async handle(data: NewsFeed.RequestDataParams[]): Promise<boolean> {
        try {
          return data.length > 0;
        } catch (e) {
          return false;
        }
      },
    };
  });

  const newsFeedInteract = new newsFeedInteractMock();

  const normalMockData = [
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
  ];

  const abnormalMockData: NewsFeed.RequestDataParams[] = [];

  it('handleメソッド正常系', () => {
    newsFeedInteract.handle(normalMockData).then((result: boolean) => expect(result).toBe(true));
  });

  it('handleメソッド異常系', () => {
    newsFeedInteract.handle(abnormalMockData).catch((result: boolean) => expect(result).toBe(false));
  });
});
