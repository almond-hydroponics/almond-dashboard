import {
	editUserDetailsFailure,
	editUserDetailsSuccess,
	getUserDetailsFailure,
	getUserDetailsSuccess,
	reducer,
	userInitialState,
} from '@modules/user/index';
import { userDetails } from '@modules/user/fixtures';
import { errorMessage } from '../../../testHelpers';

// helpers

describe('User reducer', () => {
	const { data } = userDetails;

	it("should return initial state if action type doesn't match", () => {
		const newState = reducer(userInitialState, { type: 'fakeType' });
		expect(newState).toEqual(userInitialState);
	});

	describe('Get user', () => {
		it('should dispatch GET_USER_DETAILS_SUCCESS', () => {
			const getUserDetailsSuccessAction = getUserDetailsSuccess(data);
			const userState = reducer(userInitialState, getUserDetailsSuccessAction);

			expect(userState.errors).toBe(null);
		});

		it('should dispatch GET_USER_DETAILS_FAILURE', () => {
			const getUserDetailsFailureAction = getUserDetailsFailure(errorMessage);
			const userState = reducer(userInitialState, getUserDetailsFailureAction);

			expect(userState.errors).toBe(errorMessage);
		});
	});

	describe('Edit user', () => {
		it('should dispatch EDIT_USER_DETAILS_SUCCESS', () => {
			const editUserDetailsSuccessAction = editUserDetailsSuccess(data);
			const userState = reducer(
				userInitialState,
				editUserDetailsSuccessAction,
			);

			expect(userState.errors).toBe(null);
		});

		it('should dispatch EDIT_USER_DETAILS_FAILURE', () => {
			const editUserDetailsFailureAction =
				editUserDetailsFailure(errorMessage);
			const userState = reducer(
				userInitialState,
				editUserDetailsFailureAction,
			);

			expect(userState.errors).toBe(errorMessage);
		});
	});
});
