import { container } from '@/Adapter/CoreController/NewsFeed/NewsFeedDIAdapter'

const newsFeedOutputPort: NewsFeed.INewsFeedOutputPort = container.resolve('NewsFeedOutputPort')

describe('setterで代入した値がgetterで取得できる', () => {
  newsFeedOutputPort.setResult = 'success'

  it('結果の取得', () => {
    const name = newsFeedOutputPort.getResult
    expect(name).toBe('success')
  })
})
