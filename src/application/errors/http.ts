export class HttpError extends Error {
	public statusCode: number;

	constructor(message?: string, statusCode?: number) {
		super();
		this.name = 'ServerError';
		this.message = message ?? 'Server failed. Try again soon';
		this.statusCode = statusCode ?? 500;
	}
}

export class BadRequestError extends HttpError {
	constructor(message: string) {
		super();
		this.name = 'BadRequestError';
		this.message = message;
		this.statusCode = 400;
	}
}
