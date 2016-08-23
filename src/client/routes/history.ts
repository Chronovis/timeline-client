import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './.';

export default syncHistoryWithStore(browserHistory, store);
