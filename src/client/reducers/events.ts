import {parseEvent, parseRootEvent, setBoundingBox, pixelsPerDay} from '../utils/event';

const defaultEvent: IEvent = {
	body: '',
	boundingBox: {
		left: null,
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

			nextState = Object.assign({}, state, {
				events: action.events.map(parseEvent(root)),
				root,
			});
			break;
		}

		case 'SET_EVENT_KEY_VALUES': {
			let newEvent = Object.assign({}, state.newEvent, action.keyValues);
			newEvent = setBoundingBox(newEvent, state.root);
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
			nextState = Object.assign({}, state, {
				root: Object.assign({}, state.root, { pixelsPerDay: pixelsPerDay(state.root) }),
			});
			break;
		}

		default:
	}

	return nextState;
};
