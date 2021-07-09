import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/Products/Driver/Web/app.module';

/**
 * Tools import
 */
import { DayJs } from '@/Tools/Date';
import { Log } from '@/Tools/Log';
import { container } from '@/Tools/Containers/Tools';

/**
 * Tools entry
 */
container.resolve<DayJs>('DayJs');
container.resolve<Log>('Log');

/**
 * service start
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
