import { container } from 'tsyringe';

/**
 * Date
 */
import { Date } from '@/Tools/Date';

/**
 * Logger
 */
import { Log } from '@/Tools/Log';

/**
 * Inject
 */
container.register<Date>('Date', { useClass: Date });
container.register<Log>('Log', { useClass: Log });

export { container };
