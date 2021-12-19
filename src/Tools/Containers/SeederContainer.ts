/**
 * Lib
 */
import { container as seederContainer } from 'tsyringe';

/**
 * Seeder
 */
import MediaOrganizationSeed from '@/Products/Driver/DB/Seeder/MediaOrganizationSeed';

seederContainer.register<MediaOrganizationSeed>('MediaOrganizationSeed', { useClass: MediaOrganizationSeed });

export default seederContainer;
