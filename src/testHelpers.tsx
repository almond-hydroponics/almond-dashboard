import { applyMiddleware, createStore } from 'redux';
import configureMockStore from 'redux-mock-store';
import reducer from './store/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import http from '@utils/http';

const tokenString = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJy
b2xlIjp7IlVzZXIiOiI1ZTQ3MDNkNjJmYWVlNjFkOGVkZTJkNjUiLCJBZG1pbiI6IjVlNTU1ODAxND
Y1Y2EzMDFiMTE0M2I5MCJ9LCJfaWQiOiI1ZWYzNTlhMjE3YjE5NzkyYTNmMTlkZGMiLCJuYW1lIjoi
QWxtb25kIEZyb3lvIiwicGhvdG8iOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS
0vQU9oMTRHaVVEcExBZ1YweHJNNUpmVU1qR1BKWEZyc0tCSmQydDFyN3VScVIiLCJlbWFpbCI6ImFs
bW9uZC5mcm95b0BnbWFpbC5jb20iLCJpc1ZlcmlmaWVkIjp0cnVlLCJhY3RpdmVEZXZpY2UiOiI1ZT
RhNTdmZmEwNGE2ZDg0NDViNTg4NWIifSwiaWF0IjoxNTkzMDc2MDczMDY2LCJleHAiOjE1OTgyNjAw
NzMuMDY2LCJpc3MiOiJhbG1vbmQuY29tIiwiYXVkIjoiYWxtb25kIHVzZXJzIn0.llxSHcSC--c4rT
vIGLDNQJjUmQnboATSeIErNP_cWFs`;

const expiredTokenString = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySW5mby
I6eyJpZCI6Ii1MTWJTR3A2UnZoUl9BOV8xQXJJIiwiZmlyc3RfbmFtZSI6Ikl2ZXJlbiIsImxhc3Rfb
mFtZSI6IlNoYWd1eSIsImZpcnN0TmFtZSI6Ikl2ZXJlbiIsImxhc3ROYW1lIjoiU2hhZ3V5IiwiZW1h
aWwiOiJpdmVyZW4uc2hhZ3V5QGFuZGVsYS5jb20iLCJuYW1lIjoiSXZlcmVuIFNoYWd1eSIsInBpY3R
1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWpndU9lMnJrbnkwL0FBQUFBQU
FBQUFJL0FBQUFBQUFBQUFjL2VWclJPa3Atei1VL3Bob3RvLmpwZz9zej01MCIsInJvbGVzIjp7IlRlY
2hub2xvZ3kiOiItS1hIN2lNRTRlYk1FWEFFYzdIUCIsIkFuZGVsYW4iOiItS2lpaGZab3NlUWVxQzZi
V1RhdSJ9fSwiaWF0IjoxNTM4NzAxNjczLCJleHAiOjE1Mzg2MTUzNTUsImF1ZCI6ImFuZGVsYS5jb20
iLCJpc3MiOiJhY2NvdW50cy5hbmRlbGEuY29tIiwianRpIjoiMmMxNTA0N2QtOTg2Yy00YzA0LTg5Nz
AtNjY5ZjQyYTBlZWEwIn0.DJSK8H4OFucHfRY5xhX2M0T57LO9er7HIRJgYbqysCI`;

export const token = tokenString.replace(/(\r\n|\n|\r)/gm, '');

export const expiredToken = expiredTokenString.replace(/(\r\n|\n|\r)/gm, '');

/**
 * Utility mock store that can be used for all instances where one is required
 *
 * @param {object} initialState
 * @param {object} extraArgument 3rd argument to pass to thunks, after dispatch and getState
 */
export const mockStore = (extraArgument: {}, initialState = {}) =>
	createStore(
		reducer,
		initialState,
		applyMiddleware(thunk.withExtraArgument(extraArgument)),
	);

/**
 * Mock for axios request.
 */
export const axiosMock = (url, response, resolve = true) =>
	new Proxy(
		{},
		{
			get(target, key) {
				return (URL, payload) =>
					resolve ? Promise.resolve(response) : Promise.reject(response);
			},
		},
	);

/**
 * Utility mock store that can be used for all instances where one is required
 *
 * @param mock
 * @param {Object} initialState
 */
export const reduxMockStore = (mock = axiosMock('', {}), initialState = {}) =>
	configureMockStore([thunk.withExtraArgument(mock)])(initialState);

export const renderWithRedux: any = (
	ui: JSX.Element,
	{
		initialState,
		extraArgument = {},
		store = mockStore(extraArgument, initialState),
		...renderOptions
	},
) => {
	const Wrapper = ({ children }: any) => (
		<Provider store={store}>{children}</Provider>
	);
	return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// export const renderWithRedux: any = (
// 	ui,
// 	{ initialState = {}, store = createStore(rootReducer, initialState) } = {},
// 	renderFn = render,
// ) => {
// 	// obj.rerenderWithRedux = (el, nextState) => {
// 	// 	if (nextState) {
// 	// 		store.replaceReducer(() => nextState);
// 	// 		store.dispatch({ type: '__TEST_ACTION_REPLACE_STATE__' });
// 	// 		store.replaceReducer(rootReducer);
// 	// 	}
// 	// 	return renderWithRedux(el, { store }, obj.rerender);
// 	// };
// 	return {
// 		...renderFn(<Provider store={store}>{ui}</Provider>),
// 		store,
// 	};
// };

// export const renderWithRouter = (
//   ui: JSX.Element,
//   {
//     route = '/',
//     history = createMemoryHistory({ initialEntries: [route] }) } = {},
// ): any => {
//   const Wrapper = ({ children }: any) => <Router history={history}>{children}</Router>;
//   return {
//     ...render(ui, { wrapper: Wrapper }),
//     history,
//   };
// };

/**
 * This helper function helps mock the dispatch action and returns jest.expect assertion
 *
 * @param store
 * @param thunk
 * @param expectedActions
 *
 * @returns {jest.Expect}
 */
export const dispatchMethodMock = (
	store: { dispatch: (arg0: any) => Promise<any>; getActions: () => any },
	thunk: any,
	expectedActions: any,
): any =>
	store.dispatch(thunk).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});

/**
 * Use this if you want to run assertions only after all promises have resolved.
 */
export const flushPromises = () =>
	new Promise((resolve) => setImmediate(resolve));

/**
 * Adds a mock adapter to the http axios instance
 *
 * @param {Object} response
 * @param {Object} error
 *
 * @returns {void}
 */
export const axiosMockAdapter = (response: any, error: any) => {
	http.defaults.adapter = (config) =>
		new Promise((resolve, reject) => {
			if (error) {
				error.config = config;
				reject(error);
			}

			response.config = config;
			resolve(response);
		});
};

/**
 * Returns the full permission state for a particular resource
 *
 * @param {string} resource
 *
 * @returns {Object}
 */
export const fullPermissionsState = (resource: any) => ({
	user: {
		permissions: {
			[resource]: {
				fullAccess: true,
				edit: true,
				delete: true,
				view: true,
				add: true,
			},
		},
	},
});

/**
 * Returns the view only permission state for a particular resource
 *
 * @param {string} resource
 *
 * @returns {Object}
 */
export const viewOnlyPermissionsState = (resource: any) => ({
	user: {
		permissions: {
			[resource]: {
				fullAccess: false,
				edit: false,
				delete: false,
				view: true,
				add: false,
			},
		},
	},
});

export const errorMessage = {
	response: {
		data: {
			message: 'Errored schedule',
		},
		status: 400,
	},
};
