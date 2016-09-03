type DateToFormat = 'from' | 'to';

const isEqualDates = (date1: Date, date2: Date): boolean =>
	date1.getTime() === date2.getTime();

const oldestDate = () => new Date(-4713, 0, 1);

// export const middleDate = (date1: Date, date2: Date): Date =>
// 	new Date((date1.getTime() + date2.getTime()) / 2);

export const proportionalDate = (event: IEvent, proportion: number): Date => {
	const [from, to] = extractFromAndTo(event);
	if (proportion < 0 || proportion > 1) throw new Error('[proportionalDate] proportion should be between 0 and 1.');
	if (from > to) throw new Error('[proportionalDate] `From date` should be lower than `to date`.');

	const fromTime: number = from.getTime();
	const toTime: number = to.getTime();

	const newTime = fromTime + ((toTime - fromTime) * proportion);

	return new Date(newTime);
};

export const extractFrom = (event): Date =>
	(event.isInterval) ?
		event.dateRange.infiniteFrom ? oldestDate() : event.dateRange.from :
		event.date != null ?
			event.date :
			(event.dateUncertain != null) ?
				event.dateUncertain.from :
				null;

export const extractTo = (event): Date =>
	(event.isInterval) ?
		event.dateRange.infiniteTo ? new Date() : event.dateRange.to :
		null;

export const extractFromAndTo = (event: IEvent): [Date, Date] =>
	[extractFrom(event), extractTo(event)];

export const countDays = (from: Date, to: Date): number =>
	Math.round(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);

export const countDaysInRange = (event: IEvent): number => {
	const [from, to] = extractFromAndTo(event);
	if (to == null) return null;
	return countDays(from, to);
};

const format = (date: Date, granularity: DateGranularity): string => {
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

export const formatDate = (event: IEvent, dateToFormat: DateToFormat): string => {
	let date = event.date;
	let granularity = event.dateGranularity;

	if (date == null) {
		if (event.dateUncertain != null) {
			const from = format(event.dateUncertain.from, event.dateGranularity);
			const to = format(event.dateUncertain.to, event.dateRangeGranularity);
			return `${from} - ${to}`;
		} else if (dateToFormat == null) {
			throw new Error('[formatDate] Unknown date to format!');
		} else {
			granularity = (dateToFormat === 'from') ?
				event.dateGranularity :
				event.dateRangeGranularity;

			if (event.dateRangeUncertain == null) {
				date = event.dateRange[dateToFormat];
			} else {
				if (isEqualDates(event.dateRange[dateToFormat], event.dateRangeUncertain[dateToFormat])) {
					date = event.dateRangeUncertain[dateToFormat];
				} else {
					const from = format(event.dateRange[dateToFormat], granularity);
					const to = format(event.dateRangeUncertain[dateToFormat], granularity);
					return `${from} - ${to}`;
				}
			}
		}
	}

	return format(date, granularity);
};
