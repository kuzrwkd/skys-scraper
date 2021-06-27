import { Module } from '@nestjs/common'
import { AppController } from '@/Driver/Web/Controller/app.controller'
import { AppService } from '@/Driver/Web/Service/app.service'

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
