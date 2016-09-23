import * as ReactDOM from 'react-dom';
import routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container');
	ReactDOM.render(routes, container);
});

// TODO give extended info on click
// TODO add toggle for view without text
// TODO get links of root to parent events
// TODO store alternative titles on relations (event__event)
// TODO save event to db
// TODO zoom
// TODO add map
