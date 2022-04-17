/**
 * Lib
 */
import 'reflect-metadata';

/**
 * Util
 */
import migrationUseCase from '@/useCase/migrationUseCase';

const mediaOrganizationTableMigration = migrationUseCase.resolve<DB.IMigration>('MediaOrganizationTableMigration');
const nikkeiNewsFeedTableMigration = migrationUseCase.resolve<DB.IMigration>('NikkeiNewsFeedTableMigration');
const bloombergNewsFeedTableMigration = migrationUseCase.resolve<DB.IMigration>('BloombergNewsFeedTableMigration');

mediaOrganizationTableMigration.down();
nikkeiNewsFeedTableMigration.down();
bloombergNewsFeedTableMigration.down();
