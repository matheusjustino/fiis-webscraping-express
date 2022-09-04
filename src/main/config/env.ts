import 'dotenv/config';

interface Env {
	port: number;
	nodeEnv: string | undefined;
}

export const env: Env = {
	port: Number(process.env.APP_PORT),
	nodeEnv: process.env.NODE_ENV,
};
