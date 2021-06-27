import { Controller, Get } from '@nestjs/common'
import { AppService } from '@/Driver/Web/Service/app.service'

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello(): string {
    this.appService.dispatch({
      name: 'hiroki',
      category: 'masudaya.inc',
      tags: 'oil',
    })
    return this.appService.handle()
  }
}
