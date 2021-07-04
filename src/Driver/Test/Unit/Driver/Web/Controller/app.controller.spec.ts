import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from '@/Driver/Web/Controller/app.controller'
import { AppService } from '@/Driver/Web/Service/app.service'
jest.setTimeout(30000)

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('failed')
    })
  })
})
