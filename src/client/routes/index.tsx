import * as React from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './.';
import App from '../components/app';
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
