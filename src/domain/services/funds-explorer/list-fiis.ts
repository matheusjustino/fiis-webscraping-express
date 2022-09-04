export interface ListFiis {
	listFiis: () => Promise<ListFiis.Result>;
}

export namespace ListFiis {
	export type Result = {
		count: number;
		fiis: string[];
	};
}
