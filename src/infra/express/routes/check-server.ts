import { Router } from 'express';

export default (router: Router): void => {
	router.get('/check', (_, res) => {
		res.status(200).json({ message: 'Server on!' });
	});
};
