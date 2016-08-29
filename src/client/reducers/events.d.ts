interface IDateRange {
	from: Date;
	infiniteTo: boolean;
	to: Date;
}

const enum DateGranularity { YEAR, MONTH, DAY, TIME }

// TODO add granularity. A date gets jan 1st, 00:00 when only entering a year. The granularity is lost
// in the process, so it must be separately stored.
interface IEvent {
	body: string;
	coordinates: Array<any>;
	date: Date;
	dateGranularity: DateGranularity;
	dateRange: IDateRange;
	dateRangeUncertain: IDateRange;
	dateUncertain: IDateRange;
	slug: string;
	title: string;
}

interface IDefaultState {
	events: IEvent[];
	root: IEvent;
}
