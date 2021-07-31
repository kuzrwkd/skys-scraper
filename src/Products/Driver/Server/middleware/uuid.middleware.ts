/**
 * Nest
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * Express
 */
import { Request, Response, NextFunction } from 'express';

/**
 * Tools
 */
import { container } from '@/Tools/Containers/Tools';

/**
 * Container
 */
@Injectable()
export class UuidMiddleware implements NestMiddleware {
  logTool: Tools.ILogTool;

  constructor() {
    this.logTool = container.resolve<Tools.ILogTool>('LogTool');
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logTool.setRequestId();
    next();
  }
}
