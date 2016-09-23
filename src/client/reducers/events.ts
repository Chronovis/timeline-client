import {parseEvent, parseRootEvent, setBoundingBox, pixelsPerDay, addTop} from '../utils/event';

interface IEventDefaults {
	body: string;
	boundingBox: {
		flip: boolean;
		left: number;
		top: number;
		width: number;
	};
	coordinates: Array<any>;
	date: Date;
	dateGranularity: DateGranularity;
	dateRange: IDateRange;
	dateRangeGranularity: DateGranularity;
	dateRangeUncertain: IDateRange;
	dateUncertain: IDateRange;
	isInterval: boolean;
	pixelsPerDay: number;
	slug: string;
	title: string;
	types: string[];
}
interface IEvent2 {
	isInterval(): boolean;
}
class Event implements IEvent2 {
	private defaults: IEventDefaults = {
		body: '',
		boundingBox: {
			flip: false,
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

	constructor(data) {
		data = Object.assign(this.defaults, data);
	}

	public isInterval = () => this.dateRange != null;
}

const defaultState: IDefaultState = {
	events: [],
	newEvent: new Event(),
	root: new Event(),
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
			nextState = Object.assign({}, state, { newEvent: new Event() });
			break;
		}

		case 'SAVE_EVENT': {
			nextState = Object.assign({}, state, {
				events: state.events.concat(state.newEvent),
				newEvent: new Event(),
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
