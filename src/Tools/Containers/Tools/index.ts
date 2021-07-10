import { container } from 'tsyringe';

/**
 * Date
 */
import { DayJs } from '@/Tools/Utility/Date';

/**
 * Logger
 */
import { Log } from '@/Tools/Utility/Log';

/**
 * RegExp
 */
import { RegExpVerEx } from '@/Tools/Utility/RegExp';

/**
 * Inject
 */
container.register<DayJs>('DayJs', { useClass: DayJs });
container.register<Log>('Log', { useClass: Log });
container.register<RegExpVerEx>('RegExpVerEx', { useClass: RegExpVerEx });

export { container };
