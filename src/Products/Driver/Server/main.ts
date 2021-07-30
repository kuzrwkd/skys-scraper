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
import { container } from '@/Tools/Containers/Tools';

/**
 * Tools entry
 */
container.resolve<Tools.IDateTool>('DateTool');
container.resolve<Tools.ILogTool>('Log');
container.resolve<Tools.IRegExpVerExTool>('RegExpVerExTool');

/**
 * service start
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
