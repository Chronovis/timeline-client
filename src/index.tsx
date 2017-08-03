import * as React from "react";
import * as ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter } from 'react-router-dom';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container');
	ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		container
	);
});

// TODO give extended info on click
// TODO add toggle for view without text
// TODO get links of root to parent events
// TODO store alternative titles on relations (event__event)
// TODO save event to db
// TODO zoom
// TODO add map

//"hire-forms-autocomplete-list": "^3.0.2",
//"hire-forms-checkbox": "^1.0.4",
//"hire-forms-input": "^3.0.3",
//"hire-forms-select": "^2.2.10",
