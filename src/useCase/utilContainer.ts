import { container as utilContainer } from 'tsyringe';

/**
 * Date
 */
import { DateUtil } from '@/util/date';

/**
 * Logger
 */
import { LogUtil } from '@/util/log';

/**
 * RegExp
 */
import { RegExpVerExUtil } from '@/util/regExp';

/**
 * Inject
 */
utilContainer.register<DateUtil>('DateUtil', { useClass: DateUtil });
utilContainer.register<LogUtil>('LogUtil', { useClass: LogUtil });
utilContainer.register<RegExpVerExUtil>('RegExpVerExUtil', { useClass: RegExpVerExUtil });

export default utilContainer;
