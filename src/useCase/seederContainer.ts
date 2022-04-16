/**
 * Lib
 */
import { container as seederContainer } from 'tsyringe';

/**
 * Seeder
 */
import MediaOrganizationSeed from '@/repository/db/seeder/mediaOrganizationSeed';

seederContainer.register<MediaOrganizationSeed>('MediaOrganizationSeed', { useClass: MediaOrganizationSeed });

export default seederContainer;
