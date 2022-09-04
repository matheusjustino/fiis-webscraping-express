import { injectable, container } from 'tsyringe';

import { ContainersEnum } from '@/common/container/containers.enum';

import { HttpResponse, ok } from '@/application/helpers';
import { Controller } from '@/application/controllers';
import { ListFiis } from '@/domain/services';

@injectable()
class ListFiisFundsExplorer implements Controller {
	private readonly listFiisService: ListFiis = container.resolve(
		ContainersEnum.LIST_FIIS_SERVICE,
	);

	public async handle(): Promise<HttpResponse> {
		const data = await this.listFiisService.listFiis();

		return ok(data);
	}
}

export const ListFiisController = container.resolve(ListFiisFundsExplorer);
