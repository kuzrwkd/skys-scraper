import { container as migrationUseCase } from 'tsyringe';

import MediaOrganizationTableMigration from '@/repository/db/migration/mediaOrganizationTable';
import NewsFeedTableMigration from '@/repository/db/migration/newsFeedTable';

migrationUseCase.register<MediaOrganizationTableMigration>('MediaOrganizationTableMigration', {
  useClass: MediaOrganizationTableMigration,
});

migrationUseCase.register<NewsFeedTableMigration>('NewsFeedTableMigration', {
  useClass: NewsFeedTableMigration,
});

export default migrationUseCase;
