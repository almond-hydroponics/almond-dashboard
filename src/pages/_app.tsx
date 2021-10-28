/* eslint-disable react/prop-types */
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { EmotionCache } from '@emotion/utils';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import store from '../store';
// components
import Page from '../components/Page';
import createEmotionCache from '../createEmotionCache';
import { initializeGA, logPageView } from '@utils/googleAnalytics';
import { ComponentProvider } from '@context/ComponentContext';
// styles
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import 'assets/css/index.css';
import 'assets/css/fonts.css';
import firebaseCloudMessaging from '@utils/firebase';
import useEffectAsync from '@hooks/useEffectAsync';

interface Props extends AppProps {
	emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: Props): JSX.Element => {
	const router = useRouter();

	useEffect(() => {
		initializeGA();
		// `routeChangeComplete` won't run for the first page load unless the query string is
		// hydrated later on, so here we log a page view if this is the first render and
		// there's no query string
		if (!router.asPath.includes('?')) {
			logPageView();
		}
	});

	useEffect(() => {
		// Listen for page changes after a navigation or when the query changes
		router.events.on('routeChangeComplete', logPageView);
		return () => {
			router.events.off('routeChangeComplete', logPageView);
		};
	}, [router.events]);

	useEffectAsync(async () => {
		await firebaseCloudMessaging.init();
	}, []);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>almond</title>
			</Head>
			<Provider store={store}>
				<ComponentProvider>
					<Page>
						<Component {...pageProps} />
					</Page>
				</ComponentProvider>
			</Provider>
		</CacheProvider>
	);
};

export default App;
