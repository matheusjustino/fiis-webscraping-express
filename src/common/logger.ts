import pino from 'pino';
import { env } from '@/main/config';

const logger = pino({
	level: env.nodeEnv === 'production' ? 'info' : 'debug',
	transport: {
		target: 'pino-pretty',
	},
});

export class Logger {
	static info(message: string) {
		logger.info(message);
	}

	static error(message: string) {
		logger.error(message);
	}

	static debug(message: string) {
		logger.debug(message);
	}
}
