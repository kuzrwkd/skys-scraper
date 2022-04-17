/**
 * Lib
 */
import 'reflect-metadata';

/**
 * Util
 */
import seederUseCase from '@/useCase/seederUseCase';

const mediaOrganizationSeed = seederUseCase.resolve<DB.ISeeder>('MediaOrganizationSeed');

mediaOrganizationSeed.install();
