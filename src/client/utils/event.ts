import {countDaysInRange, extractFrom, countDays, parseDateRange, parseDate} from './dates';
import {timelineWidth, EVENT_MIN_SPACE, EVENT_ROW_HEIGHT} from '../components/constants';

const leftPosition = (date: Date, root: IEvent): number =>
	countDays(extractFrom(root), date) * root.pixelsPerDay;

export const yearLeftPosition = (year: number, root: IEvent): number =>
	leftPosition(new Date(year.toString()), root);

export const eventLeftPosition = (event: IEvent, root: IEvent): number =>
	leftPosition(extractFrom(event), root);

// The width of an event is it's length on screen in pixels
export const eventWidth = (event: IEvent, root: IEvent): number =>
	countDaysInRange(event) * root.pixelsPerDay;

// The space of an event is defined by the left position on the screen
// and the width it takes on the screen. Taking the label of the event into account.
export const eventSpace = (event: IEvent): [number, number] => {
	const minWidth = (w) => (w === 0 || w < EVENT_MIN_SPACE) ? EVENT_MIN_SPACE : w;

	let { flip, left, width } = event.boundingBox;
	width = minWidth(width);

	if (flip) {
		return [left - width, width];
	} else {
		return [left, width];
	}
};

const hasOverlap = (a: IEvent, b: IEvent): boolean => {
	const [aLeft, aWidth] = eventSpace(a);
	const [bLeft, bWidth] = eventSpace(b);

	let overlap = true;
	if (aLeft + aWidth < bLeft) overlap = false;
	if (bLeft + bWidth < aLeft) overlap = false;

	return overlap;
};

export const addTop = (events) => {
	if (!events.length) return events;
	const firstEvent = events[0];
	const rows = [[firstEvent]];
	const calc = (event) => {
		if (event === firstEvent) return event;
		for (let row = 0; row < rows.length; row++) {
			const eventsInRow = rows[row];
			const isRowWithSpace = eventsInRow.reduce((prev, curr) => {
				return prev && !hasOverlap(event, curr);
			}, true);

			if (isRowWithSpace) {
				eventsInRow.push(event);
				event.boundingBox.top = row * EVENT_ROW_HEIGHT;
				break;
			}
		}
		if (event.boundingBox.top == null) {
			const newLength = rows.push([event]);
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
