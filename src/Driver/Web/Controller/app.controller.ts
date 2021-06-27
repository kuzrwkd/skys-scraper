import { Controller, Get } from '@nestjs/common'
import { AppService } from '@/Driver/Web/Service/app.service'

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello(): string {
    this.appService.dispatchData({
      name: '',
      category: '',
      tags: '',
    })
    return this.appService.handle()
  }
}
