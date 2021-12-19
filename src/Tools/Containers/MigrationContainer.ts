/**
 * Lib
 */
import { container as migrationContainer } from 'tsyringe';

/**
 * Migration
 */
import MediaOrganizationTableMigration from '@/Products/Driver/DB/Migration/Schema/MediaOrganizationTable';
import NewsFeedTableMigration from '@/Products/Driver/DB/Migration/Schema/NewsFeedTable';

migrationContainer.register<MediaOrganizationTableMigration>('MediaOrganizationTableMigration', {
  useClass: MediaOrganizationTableMigration,
});

migrationContainer.register<NewsFeedTableMigration>('NewsFeedTableMigration', { useClass: NewsFeedTableMigration });

export default migrationContainer;
