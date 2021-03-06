import 'whatwg-fetch';

export const getEvents = (slug: string) => (dispatch, getState) =>
	fetch('/api/events', {
		body: JSON.stringify({
			event: slug,
		}),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
	})
		.then((response) => response.json())
		.then(({ root, events }) =>
			dispatch({
				events,
				root,
				type: 'RECEIVE_EVENTS',
			})
		);
