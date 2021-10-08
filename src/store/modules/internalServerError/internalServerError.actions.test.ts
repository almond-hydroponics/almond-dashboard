import { reduxMockStore } from '../../../testHelpers';

// import action
import { displayInternalServerErrorMessage } from './index';

describe('internal server error', () => {
	it('should dispatch server error on error', () => {
		const expectedActions = [
			{
				error: true,
				type: 'almond/INTERNAL_SERVER_ERROR_MESSAGE',
			},
		];
		const state = {
			error: false,
		};
		const store = reduxMockStore({}, state);

		store.dispatch(displayInternalServerErrorMessage(true));
		expect(store.getActions()).toEqual(expectedActions);
	});
});
