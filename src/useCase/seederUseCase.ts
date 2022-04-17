/**
 * Lib
 */
import { container as seederUseCase } from 'tsyringe';

/**
 * Seeder
 */
import MediaOrganizationSeed from '@/repository/db/seeder/mediaOrganizationSeed';

seederUseCase.register<MediaOrganizationSeed>('MediaOrganizationSeed', { useClass: MediaOrganizationSeed });

export default seederUseCase;
