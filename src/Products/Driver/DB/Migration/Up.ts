/**
 * Lib
 */
import 'reflect-metadata';

/**
 * Tool
 */
import migrationContainer from '@/Tools/Containers/MigrationContainer';
import toolsContainer from '@/Tools/Containers/ToolsContainer';

toolsContainer.resolve<Tools.ILogTool>('LogTool');

const mediaOrganizationTableMigration = migrationContainer.resolve<IMigration>('MediaOrganizationTableMigration');
const nikkeiNewsFeedTableMigration = migrationContainer.resolve<IMigration>('NikkeiNewsFeedTableMigration');
const bloombergNewsFeedTableMigration = migrationContainer.resolve<IMigration>('BloombergNewsFeedTableMigration');

mediaOrganizationTableMigration.up();
nikkeiNewsFeedTableMigration.up();
bloombergNewsFeedTableMigration.up();
