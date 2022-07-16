import 'reflect-metadata';

import seederUseCase from '@/useCase/seederUseCase';

const mediaSeed = seederUseCase.resolve<DB.ISeeder>('MediaSeed');

mediaSeed.install();
