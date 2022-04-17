/**
 * Lib
 */
import 'reflect-metadata';

/**
 * Util
 */
import migrationUseCase from '@/useCase/migrationUseCase';

const mediaOrganizationTableMigration = migrationUseCase.resolve<DB.IMigration>('MediaOrganizationTableMigration');
const newsFeedTableMigration = migrationUseCase.resolve<DB.IMigration>('NewsFeedTableMigration');

mediaOrganizationTableMigration.up();
newsFeedTableMigration.up();
