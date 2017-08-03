import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import history from './history';

const logger = (store) => next => action => {
	if (action.hasOwnProperty('type')) {
		console.log('[REDUX]', action.type, action);
	}

	return next(action);
};

const middleware = routerMiddleware(history);

export default createStore(
	reducers,
	applyMiddleware(middleware, thunkMiddleware, logger)
);

