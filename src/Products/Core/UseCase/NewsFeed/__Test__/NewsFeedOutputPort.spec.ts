import newsFeedContainer from '@/Tools/Containers/NewsFeedContainer';

describe('NewsFeedOutputPortのテスト', () => {
  const newsFeedOutputPort: NewsFeed.INewsFeedOutputPort = newsFeedContainer.resolve('NewsFeedOutputPort');
  const mockResult = true;

  newsFeedOutputPort.setResult = mockResult;

  it('resultの取得', () => {
    const result = newsFeedOutputPort.getResult;
    expect(result).toBe(mockResult);
  });
});
