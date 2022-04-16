/**
 * Lib
 */
import { container as migrationContainer } from 'tsyringe';

/**
 * Migration
 */
import MediaOrganizationTableMigration from '@/repository/db/migration/mediaOrganizationTable';
import NewsFeedTableMigration from '@/repository/db/migration/newsFeedTable';

migrationContainer.register<MediaOrganizationTableMigration>('MediaOrganizationTableMigration', {
  useClass: MediaOrganizationTableMigration,
});

migrationContainer.register<NewsFeedTableMigration>('NewsFeedTableMigration', {
  useClass: NewsFeedTableMigration,
});

export default migrationContainer;
