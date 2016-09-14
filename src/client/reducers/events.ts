import {parseEvent, parseRootEvent, setBoundingBox, pixelsPerDay, addTop} from '../utils/event';

const defaultEvent: IEvent = {
	body: '',
	boundingBox: {
		left: null,
		top: null,
		width: null,
	},
	coordinates: [],
	date: null,
	dateGranularity: DateGranularity.DAY,
	dateRange: null,
	dateRangeGranularity: null,
	dateRangeUncertain: null,
	dateUncertain: null,
	isInterval: false,
	pixelsPerDay: null,
	slug: '',
	title: '',
	types: [],
};

const defaultState: IDefaultState = {
	events: [],
	newEvent: defaultEvent,
	root: defaultEvent,
};

export default (state = defaultState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_EVENTS': {
			const root = parseRootEvent(action.root);
			const parsedEvents= action.events.map(parseEvent(root));
			const events = addTop(parsedEvents);

			nextState = Object.assign({}, state, { events, root });
			break;
		}

		case 'SET_EVENT_KEY_VALUES': {
			let newEvent = Object.assign({}, state.newEvent, action.keyValues);
			newEvent = setBoundingBox(state.root)(newEvent);
			nextState = Object.assign({}, state, { newEvent	});
			break;
		}

		case 'RESET_EVENT': {
			nextState = Object.assign({}, state, { newEvent: defaultEvent });
			break;
		}

		case 'SAVE_EVENT': {
			nextState = Object.assign({}, state, {
				events: state.events.concat(state.newEvent),
				newEvent: defaultEvent,
			});
			break;
		}

		case 'RESIZE': {
			const root = Object.assign({}, state.root, { pixelsPerDay: pixelsPerDay(state.root) });
			const parsedEvents = state.events.map(setBoundingBox(root));
			const events = addTop(parsedEvents);
			nextState = Object.assign({}, state, {
				root,
				events,
			});
			break;
		}

		default:
	}

	return nextState;
};
