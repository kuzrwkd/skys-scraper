/**
 * Lib
 */
import 'reflect-metadata';

/**
 * Util
 */
import seederContainer from '@/useCase/seederContainer';
import utilContainer from '@/useCase/utilContainer';

utilContainer.resolve<Util.ILogUtil>('LogUtil');

const mediaOrganizationSeed = seederContainer.resolve<DB.ISeeder>('MediaOrganizationSeed');

mediaOrganizationSeed.install();
