declare namespace Newsfeed {
  type RequestData = {
    data: RequestDataParams[];
  };

  type RequestDataParams = {
    mediaId: number;
    url: string;
  };

  interface NewsfeedCrawlerResult {
    id: string;
    title: string;
    url: string;
    media_id: number;
    article_created_at: string;
    article_updated_at?: string;
  }
}
