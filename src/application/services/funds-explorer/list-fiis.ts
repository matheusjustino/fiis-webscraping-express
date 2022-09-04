import * as pup from 'puppeteer';

import { BadRequestError } from '@/application/errors';
import { ListFiis } from '@/domain/services';
import { Logger } from '@/common';

export class ListFiisService implements ListFiis {
	private readonly pupService: typeof pup = pup;

	private readonly url = 'https://www.fundsexplorer.com.br/funds';

	public async listFiis(): Promise<ListFiis.Result> {
		try {
			const browser = await this.pupService.launch({
				headless: true,
			});
			const page = await browser.newPage();

			await page.goto(this.url, {
				waitUntil: 'domcontentloaded',
			});

			const response = await this.getFiisValues(page);

			await browser.close();

			return {
				count: response.length,
				fiis: response,
			};
		} catch (error: any) {
			Logger.error(error);
			throw new BadRequestError(error.message || 'Erro na requisição');
		}
	}

	private async getFiisValues(page: pup.Page) {
		return page.$$eval('.symbol', (elements) =>
			elements.map((element) => element.innerHTML),
		);
	}
}
