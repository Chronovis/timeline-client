import * as React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import store from '../store';
import history from '../store/history';
import App from './index';
import AddEvent from './add-event';
import Messages, { addMessage } from 'hire-messages';

export default () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route
					component={App}
					path="/timelines/:slug"
				>
				</Route>
				<Route
					component={AddEvent}
					path="/timelines/:slug/add-event"
				/>
				{Messages}
			</div>
		</ConnectedRouter>
	</Provider>
);
