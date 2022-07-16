import { container as seederUseCase } from 'tsyringe';

import MediaSeed from '@/repository/db/seeder/mediaSeed';

seederUseCase.register<MediaSeed>('MediaSeed', { useClass: MediaSeed });

export default seederUseCase;
