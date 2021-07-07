import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/Products/Driver/Web/app.module';

/**
 * Tools import
 */
import { Date } from '@/Tools/Date';
import { Log } from '@/Tools/Log';
import { container } from '@/Tools/Containers/Tools';
container.resolve<Date>('Date');
container.resolve<Log>('Log');

/**
 * service start
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
