import { container as toolsContainer } from 'tsyringe';

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
toolsContainer.register<DateTool>('DateTool', { useClass: DateTool });
toolsContainer.register<LogTool>('LogTool', { useClass: LogTool });
toolsContainer.register<RegExpVerExTool>('RegExpVerExTool', { useClass: RegExpVerExTool });

export default toolsContainer;
