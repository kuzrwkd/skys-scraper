import 'reflect-metadata';

import migrationUseCase from '@/useCase/migrationUseCase';

const mediaTableMigration = migrationUseCase.resolve<DB.IMigration>('MediaTableMigration');
const newsFeedTableMigration = migrationUseCase.resolve<DB.IMigration>('NewsFeedTableMigration');

mediaTableMigration.up();
newsFeedTableMigration.up();
