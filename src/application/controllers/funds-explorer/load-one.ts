import { injectable, container } from 'tsyringe';

import { ContainersEnum } from '@/common/container/containers.enum';

import { HttpResponse, ok } from '@/application/helpers';
import { Controller } from '@/application/controllers';
import { LoadOne } from '@/domain/services';

@injectable()
class LoadOneFundsExplorer implements Controller {
	private readonly loadOneService: LoadOne = container.resolve(
		ContainersEnum.LOAD_ONE_FII_SERVICE,
	);

	public async handle({
		params,
	}: Controller.Request<undefined, LoadOne.Params>): Promise<HttpResponse> {
		const data = await this.loadOneService.loadOne(params.fiiCode);

		return ok(data);
	}
}

export const LoadOneController = container.resolve(LoadOneFundsExplorer);
