import 'reflect-metadata';
import '@/common/container';
import { app } from '@/infra/express';
import { Logger } from '@/common';
import { env } from './config/env';

export class Server {
	static async bootstrap() {
		app.listen(env.port, () => Logger.info(`Running on port ${env.port}`));
	}
}
Server.bootstrap();
