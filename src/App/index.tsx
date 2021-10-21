import Routes from '../routes';
import Page from '@components/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import '../assets/scss/react-images.scss';
import '../assets/scss/slick-slider.scss';
import '../assets/scss/globals.scss';

const App = (): JSX.Element => {
	return (
		<Page>
			<Routes />
		</Page>
	);
};

export default App;
