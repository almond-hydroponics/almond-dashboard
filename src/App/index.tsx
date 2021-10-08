import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from '../store';
import Routes from '../routes';
import Page from '@components/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import '../assets/scss/react-images.scss';
import '../assets/scss/slick-slider.scss';
import '../assets/scss/globals.scss';

const browserHistory = createBrowserHistory();

const App = (): JSX.Element => {
	return (
		<Provider store={store}>
			<Page>
				<Router history={browserHistory}>
					<Routes />
				</Router>
			</Page>
		</Provider>
	);
};

export default App;
