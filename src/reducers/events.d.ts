interface IDateRange {
	from: Date;
	infiniteTo: boolean;
	to: Date;
}

interface IEvent {
	body: string;
	coordinates: Array<any>;
	date: Date;
	dateUncertain: IDateRange;
	dateRange: IDateRange;
	dateRangeUncertain: IDateRange;
	title: string;
	slug: string;
}

interface IDefaultState {
	events: IEvent[];
	root: IEvent;
}
