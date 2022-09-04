export type HttpResponse<T = any> = {
	statusCode: number;
	data: T;
};

export const ok = <T>(data: T): HttpResponse<T> => ({
	statusCode: 200,
	data,
});
