export interface LoadOne {
	loadOne(fiiCode: string): Promise<LoadOne.Result>;
}

interface FiiResponse {
	title: string;
	subtitle: string;
	currentPrice: string;
	dailyVariation: string;
	minPrice: string;
	maxPrice: string;
	yearlyVariation: string;
	indicators: Record<string, string>;
}

export namespace LoadOne {
	export type Params = {
		fiiCode: string;
	};

	export type Result = FiiResponse;
}
