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
const newsFeedTableMigration = migrationContainer.resolve<DB.IMigration>('NewsFeedTableMigration');

mediaOrganizationTableMigration.up();
newsFeedTableMigration.up();
