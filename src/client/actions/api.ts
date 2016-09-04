import 'whatwg-fetch';

interface IEventTypeResult {
	key: number;
	value: string;
	body: string;
}
export const getEventTypes = (query: string, done: (result: IEventTypeResult[]) => void) =>
	fetch('/api/event-types', {
		body: JSON.stringify({ query }),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
	})
		.then((response) => response.json())
		.then(done);
