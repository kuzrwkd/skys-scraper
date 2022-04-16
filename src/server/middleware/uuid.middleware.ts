/**
 * Nest
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * Express
 */
import { Request, Response, NextFunction } from 'express';

/**
 * Utils
 */
import utilContainer from '@/useCase/utilContainer';

/**
 * Container
 */
@Injectable()
export class UuidMiddleware implements NestMiddleware {
  logUtil: Util.ILogUtil;

  constructor() {
    this.logUtil = utilContainer.resolve<Util.ILogUtil>('LogUtil');
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logUtil.setRequestId();
    next();
  }
}
