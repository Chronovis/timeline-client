import {countDaysInRange, extractFrom, countDays, parseDateRange, parseDate} from './dates';
import {timelineWidth} from '../components/constants';

const leftPosition = (date: Date, root: IEvent): number =>
	countDays(extractFrom(root), date) * root.pixelsPerDay;

export const yearLeftPosition = (year: number, root: IEvent): number =>
	leftPosition(new Date(year.toString()), root);

export const eventLeftPosition = (event: IEvent, root: IEvent): number =>
	leftPosition(extractFrom(event), root);

export const eventWidth = (event: IEvent, root: IEvent): number =>
	countDaysInRange(event) * root.pixelsPerDay;

const parseBaseEvent = (event) => {
	if (event.dateRange != null) {
		event.dateRange = parseDateRange(event.dateRange);
		event.isInterval = true;
	}

	if (event.dateRangeUncertain != null) {
		event.dateRangeUncertain = parseDateRange(event.dateRangeUncertain);
	}

	return event;
};

export const pixelsPerDay = (event: IEvent) =>
	timelineWidth() / countDaysInRange(event);

export const parseRootEvent = (event) => {
	event = parseBaseEvent(event);
	event.pixelsPerDay = pixelsPerDay(event);
	return event;
};

export const setBoundingBox = (root) => (event) => {
	event.boundingBox = {
		left: eventLeftPosition(event, root),
		width: eventWidth(event, root),
	};

	return event;
}
export const parseEvent = (root) => (event) => {
	event = parseBaseEvent(event);

	if (event.date != null) event.date = parseDate(event.date);

	if (event.dateUncertain != null) {
		event.dateUncertain = parseDateRange(event.dateUncertain);
	}

	event = setBoundingBox(root)(event);

	return event;
};

