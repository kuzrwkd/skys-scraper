import { container } from 'tsyringe';

/**
 * Date
 */
import { DayJs } from '@/Tools/Date';

/**
 * Logger
 */
import { Log } from '@/Tools/Log';

/**
 * RegExp
 */
import { RegExpVerEx } from '@/Tools/RegExp';

/**
 * Inject
 */
container.register<DayJs>('DayJs', { useClass: DayJs });
container.register<Log>('Log', { useClass: Log });
container.register<RegExpVerEx>('RegExpVerEx', { useClass: RegExpVerEx });

export { container };
