/**
 * Lib
 */
import 'reflect-metadata';

/**
 * Tool
 */
import seederContainer from '@/Tools/Containers/SeederContainer';
import toolsContainer from '@/Tools/Containers/ToolsContainer';

toolsContainer.resolve<Tools.ILogTool>('LogTool');

const mediaOrganizationSeed = seederContainer.resolve<ISeeder>('MediaOrganizationSeed');

mediaOrganizationSeed.install();
