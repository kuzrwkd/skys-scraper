/**
 * Tool
 */
import migrationContainer from '@/Tools/Containers/MigrationContainer';
import toolsContainer from '@/Tools/Containers/ToolsContainer';

toolsContainer.resolve<Tools.ILogTool>('LogTool');

const mediaOrganizationTableMigration = migrationContainer.resolve<IMigration>('MediaOrganizationTableMigration');
const newsFeedTableMigration = migrationContainer.resolve<IMigration>('NewsFeedTableMigration');

mediaOrganizationTableMigration.up();
newsFeedTableMigration.up();
