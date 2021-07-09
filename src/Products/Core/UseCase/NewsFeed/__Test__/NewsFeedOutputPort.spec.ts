import { container } from '@/Tools/Containers/Products/Adapter/NewsFeed';

describe('NewsFeedOutputPortのテスト', () => {
  const newsFeedOutputPort: NewsFeed.INewsFeedOutputPort = container.resolve('NewsFeedOutputPort');
  const mockResult = true;

  newsFeedOutputPort.setResult = mockResult;

  it('resultの取得', () => {
    const result = newsFeedOutputPort.getResult;
    expect(result).toBe(mockResult);
  });
});
