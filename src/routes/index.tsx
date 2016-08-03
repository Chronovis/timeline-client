import * as React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';
import App from '../app';
import history from './history';

export default (
	<Provider store={store}>
		<Router history={history}>
			<Route
				component={App}
				path="/timelines/:slug"
			>
			</Route>
		</Router>
	</Provider>
);
