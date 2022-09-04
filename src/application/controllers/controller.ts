import { HttpResponse } from '@/application/helpers';

export interface Controller<T = any> {
	handle: (httpRequest: Controller.Request) => Controller.Response<T>;
}

export namespace Controller {
	export type Request<
		Body = any,
		Params = any,
		Query = any,
		Headers = any,
	> = {
		params: Params;
		headers: Headers;
		body: Body;
		query: Query;
	};

	export type Response<T> = Promise<HttpResponse<T | Error>>;
}
