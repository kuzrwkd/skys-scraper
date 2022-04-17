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
import { setRequestId } from '@/util/log';

/**
 * Container
 */
@Injectable()
export class UuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    setRequestId();
    next();
  }
}
