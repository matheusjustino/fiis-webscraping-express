import * as pup from 'puppeteer';

import { BadRequestError } from '@/application/errors';
import { LoadOne } from '@/domain/services';
import { Logger } from '@/common';

export class LoadOneService implements LoadOne {
	private pupService: typeof pup = pup;

	private readonly url = 'https://www.fundsexplorer.com.br/funds';

	public async loadOne(fiiCode: string): Promise<LoadOne.Result> {
		try {
			if (!fiiCode) {
				throw new BadRequestError('Nenhum parâmetro foi passado');
			}

			const browser = await this.pupService.launch({
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
			});
			const page = await browser.newPage();

			await page.goto(`${this.url}/${fiiCode}`, {
				waitUntil: 'domcontentloaded',
			});

			const response = await this.getFiiValues(page);

			await browser.close();

			return response;
		} catch (error: any) {
			Logger.error(error);
			throw new BadRequestError(error.message || 'Erro na requisição');
		}
	}

	private async getFiiValues(page: pup.Page) {
		const response = {} as LoadOne.Result;

		await page
			.$eval('.section-title', (element) => element.innerHTML)
			.then((resp) => {
				response.title = resp;
			});

		await page
			.$eval('.section-subtitle', (element) => element.innerHTML)
			.then((resp) => {
				response.subtitle = resp;
			});

		await page
			.$eval('#stock-price', (element) => [
				element.children[0].innerHTML.trim(),
				element.children[1].innerHTML.trim(),
			])
			.then(([currentPrice, dailyVariation]) => {
				response.currentPrice = currentPrice;
				response.dailyVariation = dailyVariation;
			});

		await page
			.$$eval('.secondary-value', (elements) => {
				const regex = /(<([^>]+)>)/gi;

				return elements.map((el) =>
					el.innerHTML.replace(regex, '').split(' ').join(''),
				);
			})
			.then(([minPrice, maxPrice, yearlyVariation]) => {
				response.minPrice = `R$ ${minPrice}`;
				response.maxPrice = `R$ ${maxPrice}`;
				response.yearlyVariation = yearlyVariation;
			});

		await page
			.$eval('.flickity-slider', (element) =>
				[...element.children].map((i) => ({
					indicatorTitle: i.children[0].innerHTML.trim(),
					indicatorValue: i.children[1].innerHTML.trim(),
				})),
			)
			.then((resp) => {
				if (resp.length) {
					if (!response.hasOwnProperty('indicators')) {
						response.indicators = {};
					}

					Object.values(resp).forEach(
						({ indicatorTitle, indicatorValue }) => {
							response.indicators[indicatorTitle] =
								indicatorValue;
						},
					);
				}
			});

		return response;
	}
}
