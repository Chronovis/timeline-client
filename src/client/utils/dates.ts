const enum Granularity { DAY, MONTH, YEAR }
type DateToFormat = 'from' | 'to';

const formatDate = (date: any, granularity: Granularity): string => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const [day, month, year] = [date.getDay(), date.getMonth(), date.getFullYear()];

	let formattedDate = '';

	if (granularity === Granularity.DAY) formattedDate = `${day} ${months[month]} ${year}`;
	if (granularity === Granularity.MONTH) formattedDate = `${months[month]} ${year}`;
	if (granularity === Granularity.YEAR) formattedDate = year;

	return formattedDate;
};

export const countDays = (from: Date, to: Date): number =>
	Math.round(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);

export const countDaysInRange = (dateRange: IDateRange): number =>
	dateRange == null ? null : countDays(dateRange.from, dateRange.to);

export const formatDateInDaterange = (dateRange: IDateRange, dateToFormat: DateToFormat): string => {
	const daysCount = countDaysInRange(dateRange);

	let granularity: Granularity = Granularity.DAY;
	if (daysCount > 365) granularity = Granularity.MONTH;
	if (daysCount > (365 * 5)) granularity = Granularity.YEAR;

	if (dateToFormat === 'to' && dateRange.infiniteTo) return '';
	return formatDate(dateRange[dateToFormat], granularity);
};
