// import action and reducer
import { displayInternalServerErrorMessage, reducer } from './index';

describe('Internal Server Error Reducer', () => {
	const initialState = {
		error: false,
	};

	it('should return initial state', () => {
		expect(reducer({ error: false }, {} as any)).toEqual(initialState);
	});

	it('should handle INTERNAL_SERVER_ERROR_MESSAGE', () => {
		const displayInternalServerErrorMessageAction =
			displayInternalServerErrorMessage(true);

		const newDisplayInternalServerErrorMessageState = reducer(
			initialState,
			displayInternalServerErrorMessageAction,
		) as any;

		expect(newDisplayInternalServerErrorMessageState).toEqual({ error: true });
	});
});
