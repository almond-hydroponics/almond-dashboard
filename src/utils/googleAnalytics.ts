// react libraries
import ReactGA from 'react-ga';

/**
 * This function Initializes tracking Id for google analytics to push data
 * @returns void
 */
export const initializeGA = (): void =>
	ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID as string, {
		testMode: process.env.NODE_ENV === 'test',
	});

/**
 * This function logs the page that is being viewed
 *
 * @returns void
 */
export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
	if (category && action) {
		ReactGA.event({ category, action });
	}
};

export const logException = (description = '', fatal = false) => {
	if (description) {
		ReactGA.exception({ description, fatal });
	}
};
