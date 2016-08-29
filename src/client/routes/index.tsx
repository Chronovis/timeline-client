import * as React from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';
import App from '../components/app';
import AddEvent from '../components/add-event/index';
import history from './history';

export default (
	<Provider store={store}>
		<Router history={history}>
			<Route
				component={App}
				path="/timelines/:slug"
			>
				<Route
					component={AddEvent}
					path="add-event"
				/>
			</Route>
		</Router>
	</Provider>
);
