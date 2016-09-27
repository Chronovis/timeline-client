import * as DateUtils from '../utils/dates';

const parseDate = (date: string): Date => {
	// TODO remove split('+') code. It is used to let the dates work under FF. Use different solution.
	// Plus, there should be some sort of granularity. When a date does not need time information, the
	// timezone can be skipped anyway.
	date = date.split('+')[0];
	return (date === 'infinity') ? null : new Date(date);
};

const parseDateRange = (dateRange): IDateRange => {
	return {
		from: parseDate(dateRange.from),
		infiniteFrom: dateRange.from === 'infinity',
		infiniteTo: dateRange.to === 'infinity',
		to: parseDate(dateRange.to),
	};
};

const parseEventData = (eventData) => {
	if (eventData.dateRange != null) {
		eventData.dateRange = parseDateRange(eventData.dateRange);
	}

	if (eventData.dateRangeUncertain != null) {
		eventData.dateRangeUncertain = parseDateRange(eventData.dateRangeUncertain);
	}

	if (eventData.date != null) {
		eventData.date = parseDate(eventData.date);
	}

	if (eventData.dateUncertain != null) {
		eventData.dateUncertain = parseDateRange(eventData.dateUncertain);
	}

	eventData.from = (eventData.dateRange != null) ?
		eventData.dateRange.infiniteFrom ?
			new Date(-4713, 0, 1) : // Oldest possible date, constrained by Postgres.
			eventData.dateRange.from :
		eventData.date != null ?
			eventData.date :
			(eventData.dateUncertain != null) ?
				eventData.dateUncertain.from :
				null;

	eventData.to = (eventData.dateRange != null) ?
			eventData.dateRange.infiniteTo ?
				new Date() :
				eventData.dateRange.to :
			(eventData.dateUncertain != null) ?
				eventData.dateUncertain.to :
				null;

	return eventData;
};

class BaseEvent implements IBaseEvent {
	public body = '';
	public coordinates = [];
	public date = null;
	public dateRange = null;
	public dateRangeUncertain = null;
	public dateUncertain = null;
	public from = null;
	public to = null;
	public slug = '';
	public title = '';
	public types = [];

	private dateGranularity = DateGranularity.DAY;
	private dateRangeGranularity = null;

	constructor(data) {
		Object.assign(this, parseEventData(data));
	}

	public countDays() {
		return DateUtils.countDays(this.from, this.to);
	}

	public formatFromDate() {
		return this.formatDate('from');
	}

	public formatToDate() {
		return this.formatDate('to');
	}

	public isInterval(): boolean {
		return this.dateRange != null;
	}

	public isUncertain(): boolean {
		return this.dateUncertain != null || this.dateRangeUncertain != null;
	}

	private formatDate = (dateToFormat: 'from' | 'to'): string => {
		let date = this.date;
		let granularity = this.dateGranularity;

		if (date == null) {
			if (this.dateUncertain != null) {
				const from = DateUtils.format(this.dateUncertain.from, this.dateGranularity);
				const to = DateUtils.format(this.dateUncertain.to, this.dateRangeGranularity);
				return `${from} - ${to}`;
			} else if (dateToFormat == null) {
				throw new Error('[formatDate] Unknown date to format!');
			} else {
				granularity = (dateToFormat === 'from') ?
					this.dateGranularity :
					this.dateRangeGranularity;

				if (this.dateRangeUncertain == null) {
					date = this.dateRange[dateToFormat];
				} else {
					if (DateUtils.isEqual(this.dateRange[dateToFormat], this.dateRangeUncertain[dateToFormat])) {
						date = this.dateRangeUncertain[dateToFormat];
					} else {
						const from = DateUtils.format(this.dateRange[dateToFormat], granularity);
						const to = DateUtils.format(this.dateRangeUncertain[dateToFormat], granularity);
						return `${from} - ${to}`;
					}
				}
			}
		}

		return DateUtils.format(date, granularity);
	};
}

export default BaseEvent;
