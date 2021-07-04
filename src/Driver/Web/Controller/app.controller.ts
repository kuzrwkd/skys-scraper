import { Controller, Get } from '@nestjs/common'
import { AppService } from '@/Driver/Web/Service/app.service'

@Controller()
export class AppController {
  response: string
  constructor(private appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.handle({
      name: 'hiroki',
      category: 'masudaya.inc',
      tags: 'oil',
    })
  }
}
