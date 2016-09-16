declare const enum DateGranularity { YEAR, MONTH, DAY, TIME }

interface IDateRange {
	from: Date;
	infiniteFrom?: boolean;
	infiniteTo?: boolean;
	to: Date;
}

interface IEvent {
	body: string;
	boundingBox: {
		flip: boolean;
		left: number;
		top: number;
		width: number;
	};
	coordinates: Array<any>;
	date: Date;
	dateGranularity: DateGranularity;
	dateRange: IDateRange;
	dateRangeGranularity: DateGranularity;
	dateRangeUncertain: IDateRange;
	dateUncertain: IDateRange;
	isInterval: boolean;
	pixelsPerDay: number;
	slug: string;
	title: string;
	types: string[];
}

interface IDefaultState {
	events: IEvent[];
	newEvent?: IEvent;
	root: IEvent;
}

// TODO move to generic/global .d.ts?
interface IKeyValues {
	[propName: string]: any;
}
