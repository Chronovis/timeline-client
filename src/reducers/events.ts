const defaultState: IDefaultState = {
	events: [],
	root: {
		body: '',
		coordinates: [],
		slug: '',
		title: '',
	},
};

export default (state = defaultState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_EVENTS': {
			nextState = {
				events: action.children,
				root: action.root,
			};
			break;
		}

		default:
	}

	return nextState;
};
