import {countDaysInRange, extractFrom, countDays, parseDateRange, parseDate} from './dates';
import {timelineWidth, EVENT_MIN_SPACE, EVENT_ROW_HEIGHT} from '../components/constants';

const leftPosition = (date: Date, root: IEvent): number =>
	countDays(extractFrom(root), date) * root.pixelsPerDay;

export const yearLeftPosition = (year: number, root: IEvent): number =>
	leftPosition(new Date(year.toString()), root);

export const eventLeftPosition = (event: IEvent, root: IEvent): number =>
	leftPosition(extractFrom(event), root);

// The width of an event is defined by the length of the event
// mapped to pixels
export const eventWidth = (event: IEvent, root: IEvent): number =>
	countDaysInRange(event) * root.pixelsPerDay;

// The space of an event is the width of the event, but adjusted to the
// max width of an event. The space can be bigger than the event width,
// to make room for the text.
export const eventSpace = (width) => (width === 0 || width < EVENT_MIN_SPACE) ?
	EVENT_MIN_SPACE :
	width;

const hasOverlap = (a, b) => {
	const aLeft = a[0];
	const bLeft = b[0];
	const aWidth = eventSpace(a[1]);
	const bWidth = eventSpace(b[1]);
	let hasOverlap = true;
	if (aLeft + aWidth < bLeft) hasOverlap = false;
	if (bLeft + bWidth < aLeft) hasOverlap = false;
	return hasOverlap;
};

export const addTop = (events) => {
	if (!events.length) return events;
	const firstEvent = events[0];
	const rows = [[[firstEvent.boundingBox.left, firstEvent.boundingBox.width]]];
	const calc = (event) => {
		if (event === firstEvent) return event;
		const eventData = [event.boundingBox.left, event.boundingBox.width];
		for (let rowN = 0; rowN < rows.length; rowN++) {
			const rowData = rows[rowN];
			const isRowWithSpace = rowData.reduce((prev, curr) => {
				return prev && !hasOverlap(eventData, curr);
			}, true);

			if (isRowWithSpace) {
				rowData.push(eventData);
				event.boundingBox.top = rowN * EVENT_ROW_HEIGHT;
				break;
			}
		}
		if (event.boundingBox.top == null) {
			const newLength = rows.push([eventData]);
			event.boundingBox.top = (newLength - 1) * EVENT_ROW_HEIGHT;
		}
		return event;
	};
	return events.map(calc);
};

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
	const left = eventLeftPosition(event, root);
	const width = eventWidth(event, root);

	const flip = (left + EVENT_MIN_SPACE > timelineWidth()) ? true : false;

	event.boundingBox = {
		flip,
		left,
		width,
	};

	return event;
};

export const parseEvent = (root) => (event) => {
	event = parseBaseEvent(event);

	if (event.date != null) event.date = parseDate(event.date);

	if (event.dateUncertain != null) {
		event.dateUncertain = parseDateRange(event.dateUncertain);
	}

	event = setBoundingBox(root)(event);

	return event;
};

