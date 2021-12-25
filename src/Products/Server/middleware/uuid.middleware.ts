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
import toolsContainer from '@/Tools/Containers/ToolsContainer';

/**
 * Container
 */
@Injectable()
export class UuidMiddleware implements NestMiddleware {
  logTool: Tools.ILogTool;

  constructor() {
    this.logTool = toolsContainer.resolve<Tools.ILogTool>('LogTool');
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logTool.setRequestId();
    next();
  }
}
