const defaultState: IDefaultState = {
	events: [],
	root: {
		body: '',
		coordinates: [],
		date: null,
		dateRange: null,
		dateRangeUncertain: null,
		dateUncertain: null,
		slug: '',
		title: '',
	},
};

const parseEvent = (event) => {
	const parseDate = (date) => (date === 'infinity') ? new Date() : new Date(date);
	const parseDateRange = (dateRange) => {
		return {
			from: parseDate(dateRange.from),
			infiniteTo: dateRange.to === 'infinity',
			to: parseDate(dateRange.to),
		};
	};
	if (event.dateRange != null) {
		event.dateRange = parseDateRange(event.dateRange);
	}
	if (event.dateUncertain != null) {
		event.dateUncertain = parseDateRange(event.dateUncertain);
	}
	if (event.date != null) event.date = parseDate(event.date);

	return event;
};

export default (state = defaultState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_EVENTS': {
			nextState = {
				events: action.events.map(parseEvent),
				root: parseEvent(action.root),
			};
			break;
		}

		default:
	}

	return nextState;
};
