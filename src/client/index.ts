import * as ReactDOM from 'react-dom';
import routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container');
	ReactDOM.render(routes, container);
});

// TODO save event to db
// TODO get links of root to parent events
