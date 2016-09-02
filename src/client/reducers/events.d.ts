declare const enum DateGranularity { YEAR, MONTH, DAY, TIME }

interface IDateRange {
	from: Date;
	infiniteFrom?: boolean;
	infiniteTo?: boolean;
	to: Date;
}

interface IEvent {
	body: string;
	coordinates: Array<any>;
	date: Date;
	dateGranularity: DateGranularity;
	dateRange: IDateRange;
	dateRangeGranularity: DateGranularity;
	dateRangeUncertain: IDateRange;
	dateUncertain: IDateRange;
	isInterval: boolean;
	slug: string;
	title: string;
	types: string[];
}

interface IDefaultState {
	events: IEvent[];
	newEvent?: IEvent;
	root: IEvent;
}

interface IEventFunctions {
	dateAtLeftPosition?: (position: number) => Date;
	eventLeftPosition: (date: Date) => number;
	eventWidth: (event: IEvent) => number;
	flipPointInTime: (left: number) => [boolean, number];
}

// TODO move to generic/global .d.ts?
interface IKeyValues {
	[propName: string]: any;
}
