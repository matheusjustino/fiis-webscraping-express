import { Controller } from '@/application/controllers';
import { Logger } from '@/common';

import { RequestHandler } from 'express';

type Adapter = <T>(controller: Controller<T>) => RequestHandler;

export const expressRouteAdapter: Adapter =
	(controller) => async (req, res) => {
		try {
			Logger.info(
				`METHOD: ${req.method} - URL: ${
					req.originalUrl
				} - IP_REQUEST: ${req.ip} - HOST: ${
					req.hostname
				} - DATE: ${new Date().toLocaleString()}`,
			);
			const { body, query, params, headers } = req;

			const { statusCode, data } = await controller.handle({
				body,
				query,
				params,
				headers,
			});

			res.status(statusCode).json(data);
		} catch (error) {
			Logger.error(error as string);

			const defaultName = 'ServerError';
			const defaultMessage = 'Server Error';

			const { message = defaultMessage, name = defaultName } =
				error as any;

			res.status((error as any)?.statusCode ?? 500).json({
				name,
				message,
			});
		}
	};
