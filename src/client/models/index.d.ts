declare const enum DateGranularity { YEAR, MONTH, DAY, TIME }

interface IDateRange {
	from: Date;
	infiniteFrom?: boolean;
	infiniteTo?: boolean;
	to: Date;
}

interface IBaseEvent {
	date: Date;
	dateRange: IDateRange;
	dateRangeUncertain: IDateRange;
	dateUncertain: IDateRange;
	from: Date;
	slug: string;
	title: string;
	to: Date;
	types: string[];
	countDays(): number;
	formatFromDate(): string;
	formatToDate(): string;
	isInterval(): boolean;
	isUncertain(): boolean;
}

interface IEvent extends IBaseEvent {
	flip: boolean;
	left: number;
	top: number;
	width: number;
	space(): [number, number];
}

interface IRootEvent extends IBaseEvent {
	leftPositionAtDate(date: Date): number;
}
