import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import store from './store';

import './assets/scss/globals.scss';
import './assets/css/fonts.css';

const browserHistory = createBrowserHistory();
const rootNode = document.getElementById('root');

render(
	<StrictMode>
		<Provider store={store}>
			<Router history={browserHistory}>
				<App />
			</Router>
		</Provider>
	</StrictMode>,
	rootNode,
);
