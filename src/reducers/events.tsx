export default (state = { parent: IEvent, events: IEvent[] }, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_EVENTS': {
			nextState = {
				parent: action.parent,
				events: action.children,
			};

			break;
		}

		default:
	}

	return nextState;
}
