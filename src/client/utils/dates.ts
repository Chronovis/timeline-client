type DateToFormat = 'from' | 'to';

const isEqualDates = (date1: Date, date2: Date): boolean =>
	date1.getTime() === date2.getTime();

export const getOldestDate = () => new Date(-4713, 0, 1);

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

export const countDays = (from: Date, to: Date): number =>
	Math.round(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);

export const countDaysInRange = (dateRange: IDateRange): number => {
	if (dateRange == null) return null;
	const from = dateRange.infiniteFrom ? getOldestDate() : dateRange.from;
	const to = dateRange.infiniteTo ? new Date() : dateRange.to;
	return countDays(from, to);
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
