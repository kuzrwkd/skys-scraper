/**
 * Nest
 */
import { NestFactory } from '@nestjs/core';

/**
 * Nest module
 */
import { AppModule } from '@/Products/Server/app.module';

/**
 * service start
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
