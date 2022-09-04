import { container } from 'tsyringe';

import { ListFiis, LoadOne } from '@/domain/services';

import { ListFiisService } from '@/application/services/funds-explorer/list-fiis';
import { LoadOneService } from '@/application/services/funds-explorer/load-one';
import { ContainersEnum } from './containers.enum';

// SERVICES
container.registerSingleton<ListFiis>(
	ContainersEnum.LIST_FIIS_SERVICE,
	ListFiisService,
);

container.registerSingleton<LoadOne>(
	ContainersEnum.LOAD_ONE_FII_SERVICE,
	LoadOneService,
);
