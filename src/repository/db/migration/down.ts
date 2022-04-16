/**
 * Lib
 */
import 'reflect-metadata';

/**
 * Util
 */
import migrationContainer from '@/useCase/migrationContainer';
import utilContainer from '@/useCase/utilContainer';

utilContainer.resolve<Util.ILogUtil>('LogUtil');

const mediaOrganizationTableMigration = migrationContainer.resolve<DB.IMigration>('MediaOrganizationTableMigration');
const nikkeiNewsFeedTableMigration = migrationContainer.resolve<DB.IMigration>('NikkeiNewsFeedTableMigration');
const bloombergNewsFeedTableMigration = migrationContainer.resolve<DB.IMigration>('BloombergNewsFeedTableMigration');

mediaOrganizationTableMigration.down();
nikkeiNewsFeedTableMigration.down();
bloombergNewsFeedTableMigration.down();
