/**
 * Nest core
 */
import { NestFactory } from '@nestjs/core';

/**
 * Nest module
 */
import { AppModule } from '@/Products/Driver/Server/app.module';

/**
 * Tools import
 */
import { DayJs } from '@/Tools/Utility/Date';
import { Log } from '@/Tools/Utility/Log';
import { RegExpVerEx } from '@/Tools/Utility/RegExp';
import { container } from '@/Tools/Containers/Tools';

/**
 * Tools entry
 */
container.resolve<DayJs>('DayJs');
container.resolve<Log>('Log');
container.resolve<RegExpVerEx>('RegExpVerEx');

/**
 * service start
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    if (process.env.NODE_ENV !== 'development') {
      if (typeof process.send !== 'undefined') {
        // Here we send the ready signal to PM2
        process.send('ready');
      }
    }
  });
}
bootstrap();
