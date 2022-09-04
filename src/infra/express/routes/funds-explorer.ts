import { Router } from 'express';

import {
	ListFiisController,
	LoadOneController,
} from '@/application/controllers/funds-explorer';
import { expressRouteAdapter } from '../adapters';

export default (router: Router): void => {
	router.get('/fii', expressRouteAdapter(ListFiisController));
	router.get('/fii/:fiiCode', expressRouteAdapter(LoadOneController));
};
