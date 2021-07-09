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
 * Inject
 */
container.register<DayJs>('DayJs', { useClass: DayJs });
container.register<Log>('Log', { useClass: Log });

export { container };
