/**
 * Lib
 */
import { container as migrationContainer } from 'tsyringe';

/**
 * Migration
 */
import MediaOrganizationTableMigration from '@/Products/Driver/DB/Migration/MediaOrganizationTable';
import NikkeiNewsFeedTableMigration from '@/Products/Driver/DB/Migration/NikkeiNewsFeedTable';
import BloombergNewsFeedTableMigration from '@/Products/Driver/DB/Migration/BloombergNewsFeedTable';

migrationContainer.register<MediaOrganizationTableMigration>('MediaOrganizationTableMigration', {
  useClass: MediaOrganizationTableMigration,
});

migrationContainer.register<NikkeiNewsFeedTableMigration>('NikkeiNewsFeedTableMigration', {
  useClass: NikkeiNewsFeedTableMigration,
});
migrationContainer.register<BloombergNewsFeedTableMigration>('BloombergNewsFeedTableMigration', {
  useClass: BloombergNewsFeedTableMigration,
});

export default migrationContainer;
