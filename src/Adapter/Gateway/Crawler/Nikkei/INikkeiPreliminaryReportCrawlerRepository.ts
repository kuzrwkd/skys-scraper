import { Entity } from '@/Entity/NewsFeed/INewsFeedEntity'

export interface INikkeiPreliminaryReportCrawlerRepository {
  crawler(): Promise<Entity[] | null>
}
