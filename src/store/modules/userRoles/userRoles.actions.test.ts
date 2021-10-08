import { userRolesResponse } from '@modules/userRoles/fixtures';
import {
	CREATE_USER_ROLES_FAILURE,
	CREATE_USER_ROLES_REQUEST,
	CREATE_USER_ROLES_SUCCESS,
	DELETE_USER_ROLES_FAILURE,
	DELETE_USER_ROLES_REQUEST,
	DELETE_USER_ROLES_SUCCESS,
	EDIT_USER_ROLES_FAILURE,
	EDIT_USER_ROLES_REQUEST,
	EDIT_USER_ROLES_SUCCESS,
	GET_USER_ROLES_FAILURE,
	GET_USER_ROLES_REQUEST,
	GET_USER_ROLES_SUCCESS,
} from '@modules/userRoles/types';
import { DISPLAY_SNACK_MESSAGE } from '@modules/snack/types';
import {
	axiosMock,
	dispatchMethodMock,
	reduxMockStore,
} from '../../../testHelpers';
import {
	createUserRole,
	deleteUserRole,
	editUserRole,
	getUserRoles,
	userRoleInitialState,
} from './index';

describe('User roles module actions', () => {
	const mockResponse = {
		data: {
			status: 'success',
			message: 'User role successfully created/updated',
			data: {
				_id: '5e439ea3fd05da507ca0161a',
				title: 'Random User',
				description: 'Manages random things',
				resourceAccessLevels: [
					{
						resourceId: '5db373875e38b20ae991710d',
						permissionIds: ['5e439ed9fd05da507ca0161c'],
					},
				],
			},
		},
	};

	const userRoleTestData = {
		_id: '5e439ea3fd05da507ca0161a',
		title: 'Random User',
		description: 'Manages random things',
		resourceAccessLevels: [
			{
				resourceId: '5db373875e38b20ae991710d',
				permissionIds: ['5e439ed9fd05da507ca0161c'],
			},
		],
	};

	describe('Get user roles thunk', () => {
		it('should fetch and return user roles', () => {
			const mockResponse = {
				data: {
					data: userRolesResponse.data,
				},
			};
			const expectedActions = [
				{
					type: GET_USER_ROLES_REQUEST,
					isLoading: true,
				},
				{
					roles: mockResponse.data.data,
					type: GET_USER_ROLES_SUCCESS,
					isLoading: false,
				},
			];
			const http = axiosMock(
				'/roles?include=permissions&include=resources',
				mockResponse,
			);
			const store = reduxMockStore(http, userRoleInitialState);

			return dispatchMethodMock(store, getUserRoles(), expectedActions);
		});

		it('should return an error message when it fails to fetch user roles', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on fetching user roles',
					},
				},
			};
			const expectedActions = [
				{
					type: GET_USER_ROLES_REQUEST,
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
					type: GET_USER_ROLES_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(
				'/roles?include=permissions&include=resources',
				mockErrorResponse,
				false,
			);
			const store = reduxMockStore(http, userRoleInitialState);

			return dispatchMethodMock(store, getUserRoles(), expectedActions);
		});
	});

	describe('Create new user role thunk', () => {
		it('should create and return a new user role', () => {
			const expectedActions = [
				{
					type: CREATE_USER_ROLES_REQUEST,
					isLoading: true,
				},
				{
					role: userRoleTestData,
					type: CREATE_USER_ROLES_SUCCESS,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock('/roles', mockResponse);
			const store = reduxMockStore(http, userRoleInitialState);

			return dispatchMethodMock(
				store,
				createUserRole(userRoleTestData),
				expectedActions,
			);
		});

		it('should return an error message when it fails to create a new user role', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on creating user roles',
					},
				},
			};
			const expectedActions = [
				{
					type: CREATE_USER_ROLES_REQUEST,
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
					type: CREATE_USER_ROLES_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/roles', mockErrorResponse, false);
			const store = reduxMockStore(http, userRoleInitialState);

			return dispatchMethodMock(
				store,
				createUserRole(userRoleTestData),
				expectedActions,
			);
		});
	});

	describe('Edit user role thunk', () => {
		it('should edit and return a user role', () => {
			const expectedActions = [
				{
					type: EDIT_USER_ROLES_REQUEST,
					isLoading: true,
				},
				{
					role: userRoleTestData,
					id: userRoleTestData._id,
					type: EDIT_USER_ROLES_SUCCESS,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock(`/roles/${userRoleTestData._id}`, mockResponse);
			const store = reduxMockStore(http, userRoleInitialState);

			return dispatchMethodMock(
				store,
				editUserRole(userRoleTestData),
				expectedActions,
			);
		});

		it('should return an error message when it fails to edit a user role', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on editing a user role',
					},
				},
			};
			const expectedActions = [
				{
					type: EDIT_USER_ROLES_REQUEST,
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
					type: EDIT_USER_ROLES_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(
				`/roles/${userRoleTestData._id}`,
				mockErrorResponse,
				false,
			);
			const store = reduxMockStore(http, userRoleInitialState);

			return dispatchMethodMock(
				store,
				editUserRole(userRoleTestData),
				expectedActions,
			);
		});
	});

	it('should return an error message when it fails to edit a user role on bad request (400)', () => {
		const mockErrorResponse = {
			response: {
				status: 400,
				data: {
					message: 'Please format the fields properly',
				},
			},
		};
		const expectedActions = [
			{
				type: EDIT_USER_ROLES_REQUEST,
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
						status: mockErrorResponse.response.status,
						data: {
							message: mockErrorResponse.response.data.message,
						},
					},
				},
				type: EDIT_USER_ROLES_FAILURE,
				isLoading: false,
			},
		];
		const http = axiosMock(
			`/roles/${userRoleTestData._id}`,
			mockErrorResponse,
			false,
		);
		const store = reduxMockStore(http, userRoleInitialState);

		return dispatchMethodMock(
			store,
			editUserRole(userRoleTestData),
			expectedActions,
		);
	});

	describe('Delete user role thunk', () => {
		it('should fetch and return user roles', () => {
			const mockResponse = {
				data: {
					message: 'User role deleted successfully',
				},
			};
			const expectedActions = [
				{
					type: DELETE_USER_ROLES_REQUEST,
					isLoading: true,
				},
				{
					id: '5e4703d62faee61d8ede2d65',
					type: DELETE_USER_ROLES_SUCCESS,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock('/roles', mockResponse);
			const store = reduxMockStore(http, userRoleInitialState);

			return dispatchMethodMock(
				store,
				deleteUserRole('5e4703d62faee61d8ede2d65'),
				expectedActions,
			);
		});

		it('should return an error message when it fails to fetch user roles', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on fetching user roles',
					},
				},
			};
			const expectedActions = [
				{
					type: DELETE_USER_ROLES_REQUEST,
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
					type: DELETE_USER_ROLES_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/roles', mockErrorResponse, false);
			const store = reduxMockStore(http, userRoleInitialState);

			return dispatchMethodMock(
				store,
				deleteUserRole('5e4703d62faee61d8ede2d65'),
				expectedActions,
			);
		});
	});
});
