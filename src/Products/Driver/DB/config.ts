/**
 * lib
 */
import { PrismaClient } from '@prisma/client';

declare const global: CustomNodeJsGlobal;

export const prisma: Lib.PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: [
      { level: 'warn', emit: 'event' },
      { level: 'query', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'error', emit: 'event' },
    ],
  });

export const filterInsertRegex = new RegExp('^INSERT');
export const filterSelectRegex = new RegExp('^SELECT');
export const filterUpdateRegex = new RegExp('^UPDATE');
export const filterDeleteRegex = new RegExp('^DELETE');

if (process.env.NODE_ENV === 'development') global.prisma = prisma;
