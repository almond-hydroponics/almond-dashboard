// actions
import {
	editUserDetails,
	getUserDetails,
	logoutUser,
	userInitialState,
} from '@modules/user/index';

// types
import {
	EDIT_USER_DETAILS_FAILURE,
	EDIT_USER_DETAILS_REQUEST,
	EDIT_USER_DETAILS_SUCCESS,
	GET_USER_DETAILS_FAILURE,
	GET_USER_DETAILS_REQUEST,
	GET_USER_DETAILS_SUCCESS,
	LOG_OUT_USER,
} from '@modules/user/types';
import { DISPLAY_SNACK_MESSAGE } from '@modules/snack/types';
import authService from '@utils/auth';

// helpers
import { editedUserDetailsPayload, userDetails } from '@modules/user/fixtures';
import {
	axiosMock,
	dispatchMethodMock,
	reduxMockStore,
} from '../../../testHelpers';

describe('User module actions', () => {
	const userId = '5ede17f7184ccf003a2da68f';

	describe('Get user thunk', () => {
		it('should fetch and return user details', () => {
			const mockResponse = {
				data: {
					data: userDetails.data,
				},
			};
			const expectedActions = [
				{
					type: GET_USER_DETAILS_REQUEST,
					isLoading: true,
				},
				{
					type: GET_USER_DETAILS_SUCCESS,
					userDetails: userDetails.data,
					isLoading: false,
				},
			];
			const http = axiosMock('/me', mockResponse);
			const store = reduxMockStore(http, userInitialState);

			return dispatchMethodMock(store, getUserDetails(), expectedActions);
		});

		it('should return an error message when it fails to fetch user details', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on fetching user details',
					},
				},
			};
			const expectedActions = [
				{
					type: GET_USER_DETAILS_REQUEST,
					isLoading: true,
				},
				{
					snack: {
						message: mockErrorResponse.response.data.message,
						severity: 'error',
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
				{
					errors: {
						response: {
							data: {
								message: mockErrorResponse.response.data.message,
							},
						},
					},
					type: GET_USER_DETAILS_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/me', mockErrorResponse, false);
			const store = reduxMockStore(http, userInitialState);

			return dispatchMethodMock(store, getUserDetails(), expectedActions);
		});
	});

	describe('Editing a user thunk', () => {
		it('should edit and return edited user details', () => {
			const mockResponse = {
				data: {
					data: userDetails.data,
					message: 'User edited successfully',
				},
			};
			const expectedActions = [
				{
					type: EDIT_USER_DETAILS_REQUEST,
					isLoading: true,
				},
				{
					type: EDIT_USER_DETAILS_SUCCESS,
					userDetails: userDetails.data,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock(`people/${userId}`, mockResponse);
			const store = reduxMockStore(http, userInitialState);

			return dispatchMethodMock(
				store,
				editUserDetails(userId, editedUserDetailsPayload),
				expectedActions,
			);
		});

		it('should return an error message when it fails to edit user details', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on editing user details',
					},
				},
			};
			const expectedActions = [
				{
					type: EDIT_USER_DETAILS_REQUEST,
					isLoading: true,
				},
				{
					snack: {
						message: mockErrorResponse.response.data.message,
						severity: 'error',
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
				{
					errors: {
						response: {
							data: {
								message: mockErrorResponse.response.data.message,
							},
						},
					},
					type: EDIT_USER_DETAILS_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`people/${userId}`, mockErrorResponse, false);
			const store = reduxMockStore(http, userInitialState);

			return dispatchMethodMock(
				store,
				editUserDetails(userId, editedUserDetailsPayload),
				expectedActions,
			);
		});
	});

	describe('Logout action', () => {
		it('should logout current logged in user', () => {
			authService.logoutUser = jest.fn();
			const expectedActions = [
				{
					type: LOG_OUT_USER,
				},
			];
			const store = reduxMockStore({}, userInitialState);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			store.dispatch(logoutUser());

			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
