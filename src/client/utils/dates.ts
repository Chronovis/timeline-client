///<reference path="../models/index.d.ts"/>
import * as Constants from '../constants';
type DateToFormat = 'from' | 'to';

export const countDays = (from: Date, to: Date): number => {
	if (to == null) return 0;
	return Math.round(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
}

export const isEqual = (date1: Date, date2: Date): boolean => date1.getTime() === date2.getTime();

export const proportionalDate = (event: IEvent, proportion: number): Date => {
	if (proportion < 0 || proportion > 1) throw new Error('[proportionalDate] proportion should be between 0 and 1.');

	const fromTime: number = event.from.getTime();
	const toTime: number = event.to.getTime();

	const newTime = fromTime + ((toTime - fromTime) * proportion);

	return new Date(newTime);
};

export const dateAtLeftPosition = (position: number, root: IEvent): Date =>
	proportionalDate(root, position / Constants.timelineWidth());

// export const extractFrom = (event): Date =>
// 	(event.isInterval) ?
// 		event.dateRange.infiniteFrom ? new Date(-4700, 0, 1) : event.dateRange.from :
// 		event.date != null ?
// 			event.date :
// 			(event.dateUncertain != null) ?
// 				event.dateUncertain.from :
// 				null;
//
// export const extractTo = (event): Date =>
// 	(event.isInterval) ?
// 		event.dateRange.infiniteTo ? new Date() : event.dateRange.to :
// 		(event.dateUncertain != null) ?
// 			event.dateUncertain.to :
// 			null;
//
// export const extractFromAndTo = (event: IEvent): [Date, Date] =>
// 	[extractFrom(event), extractTo(event)];

// export const countDaysInRange = (event: IEvent): number => {
// 	const [from, to] = extractFromAndTo(event);
// 	if (to == null) return null;
// 	return countDays(from, to);
// };

export const format = (date: Date, granularity: DateGranularity): string => {
	if (date == null) return '∞';

	let displayDate = date.getFullYear().toString();

	if (granularity >= DateGranularity.MONTH) {
		const months = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
		];
		displayDate = `${months[date.getMonth()]} ${displayDate}`;
	}
	if (granularity >= DateGranularity.DAY) {
		displayDate = `${date.getDay()} ${displayDate}`;
	}
	if (granularity === DateGranularity.TIME) {
		displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;
	}

	return displayDate;
};

