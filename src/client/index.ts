import * as ReactDOM from 'react-dom';
import routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container');
	ReactDOM.render(routes, container);
});

// TODO sort events on timeline
// TODO save event to db
// TODO get links of root to parent events
// TODO render uncertains
// TODO add map
// TODO zoom
