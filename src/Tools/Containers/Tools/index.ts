import { container } from 'tsyringe';

/**
 * Date
 */
import { DateTool } from '@/Tools/Utility/Date';

/**
 * Logger
 */
import { LogTool } from '@/Tools/Utility/Log';

/**
 * RegExp
 */
import { RegExpVerExTool } from '@/Tools/Utility/RegExp';

/**
 * Inject
 */
container.register<DateTool>('DateTool', { useClass: DateTool });
container.register<LogTool>('LogTool', { useClass: LogTool });
container.register<RegExpVerExTool>('RegExpVerExTool', { useClass: RegExpVerExTool });

export { container };
