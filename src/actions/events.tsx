import 'whatwg-fetch';

export const getEvents = (slug: string) => (dispatch, getState) =>
	fetch('/api/events', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			event: slug,
		}),
	})
		.then((response) => response.json())
		.then(({ parent, children }) =>
			dispatch({
				type: 'RECEIVE_EVENTS',
				parent,
				children
			})
		);
