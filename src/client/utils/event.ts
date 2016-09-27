import * as Constants from '../constants';


// export const eventLeftPosition = (event: IEvent, root: IEvent): number =>
// 	leftPosition(extractFrom(event), root);

const hasOverlap = (a: IEvent, b: IEvent): boolean => {
	const [aLeft, aWidth] = a.space();
	const [bLeft, bWidth] = b.space();

	let overlap = true;
	if (aLeft + aWidth < bLeft) overlap = false;
	if (bLeft + bWidth < aLeft) overlap = false;

	return overlap;
};

export const addTop = (events: IEvent[]) => {
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
				event.top = row * Constants.EVENT_ROW_HEIGHT;
				break;
			}
		}
		if (event.top == null) {
			const newLength = rows.push([event]);
			event.top = (newLength - 1) * Constants.EVENT_ROW_HEIGHT;
		}
		return event;
	};
	return events.map(calc);
};

// const parseBaseEvent = (event) => {
// 	if (event.dateRange != null) {
// 		event.dateRange = parseDateRange(event.dateRange);
// 		event.isInterval = true;
// 	}
//
// 	if (event.dateRangeUncertain != null) {
// 		event.dateRangeUncertain = parseDateRange(event.dateRangeUncertain);
// 	}
//
// 	return event;
// };

// export const pixelsPerDay = (event: IEvent) =>
// 	timelineWidth() / countDaysInRange(event);
//
// export const parseRootEvent = (event) => {
// 	event = parseBaseEvent(event);
// 	event.pixelsPerDay = pixelsPerDay(event);
// 	return event;
// };


// export const parseEvent = (root) => (event) => {
// 	event = parseBaseEvent(event);
//
// 	if (event.date != null) event.date = parseDate(event.date);
//
// 	if (event.dateUncertain != null) {
// 		event.dateUncertain = parseDateRange(event.dateUncertain);
// 	}
//
// 	event = setBoundingBox(root)(event);
//
// 	return event;
// };
