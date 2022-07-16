import { container as migrationUseCase } from 'tsyringe';

import MediaTableMigration from '@/repository/db/migration/mediaTable';
import NewsFeedTableMigration from '@/repository/db/migration/newsFeedTable';

migrationUseCase.register<MediaTableMigration>('MediaTableMigration', {
  useClass: MediaTableMigration,
});

migrationUseCase.register<NewsFeedTableMigration>('NewsFeedTableMigration', {
  useClass: NewsFeedTableMigration,
});

export default migrationUseCase;
