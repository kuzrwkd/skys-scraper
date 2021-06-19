import { Module } from '@nestjs/common';
import { AppController } from '@/Adapter/Controller/app.controller';
import { AppService } from '@/Driver/Web/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
