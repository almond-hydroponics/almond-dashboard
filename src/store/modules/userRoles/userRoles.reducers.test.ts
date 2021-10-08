// thunks
import {
	createUserRoleFailure,
	createUserRoleRequest,
	createUserRoleSuccess,
	deleteUserRolesFailure,
	deleteUserRolesRequest,
	deleteUserRolesSuccess,
	editUserRoleFailure,
	editUserRoleRequest,
	editUserRoleSuccess,
	getUserRolesFailure,
	getUserRolesRequest,
	getUserRolesSuccess,
	reducer,
	userRoleInitialState,
} from '@modules/userRoles';

// helpers
import {
	newUserRole,
	permissions,
	resources,
	userRolesResponse,
} from '@modules/userRoles/fixtures';
import { errorMessage } from '../../../testHelpers';

describe('User roles reducer:', () => {
	it("should return initial state if action type doesn't match", () => {
		const newState = reducer(userRoleInitialState, { type: 'fakeType' });
		expect(newState).toEqual(userRoleInitialState);
	});

	describe('Get user roles', () => {
		it('should dispatch GET_USER_ROLES_REQUEST', () => {
			const getUserRolesRequestAction = getUserRolesRequest();
			const userRolesState = reducer(
				userRoleInitialState,
				getUserRolesRequestAction,
			);

			expect(userRolesState.isLoading).toBeTruthy();
			expect(userRolesState.errors).toBe(null);
		});

		it('should dispatch GET_USER_ROLES_SUCCESS', () => {
			const getUserRolesSuccessAction = getUserRolesSuccess(userRolesResponse);
			const userRolesState = reducer(
				userRoleInitialState,
				getUserRolesSuccessAction,
			);

			expect(userRolesState.isLoading).toBeFalsy();
			expect(userRolesState.roles[0].title).toEqual('User');
			expect(userRolesState.errors).toBe(null);
		});

		it('should dispatch GET_USER_ROLES_FAILURE', () => {
			const getUserRolesFailureAction = getUserRolesFailure(errorMessage);
			const userRolesState = reducer(
				userRoleInitialState,
				getUserRolesFailureAction,
			);

			expect(userRolesState.isLoading).toBeFalsy();
			expect(userRolesState.errors).toEqual(errorMessage);
		});
	});

	describe('Create user roles', () => {
		it('should dispatch CREATE_USER_ROLES_REQUEST', () => {
			const createUserRolesRequestAction = createUserRoleRequest();
			const userRolesState = reducer(
				userRoleInitialState,
				createUserRolesRequestAction,
			);

			expect(userRolesState.isLoading).toBeTruthy();
			expect(userRolesState.errors).toBe(null);
		});

		it('should dispatch CREATE_USER_ROLES_SUCCESS', () => {
			const createUserRolesSuccessAction = createUserRoleSuccess(
				newUserRole as any,
			);
			const userRolesState = reducer(
				userRoleInitialState,
				createUserRolesSuccessAction,
			);

			expect(userRolesState.isLoading).toBeFalsy();
			expect(userRolesState.roles[0].description).toBe(
				'Almond regular user with limited privileges',
			);
			expect(userRolesState.errors).toBe(null);
		});

		it('should dispatch CREATE_USER_ROLES_FAILURE', () => {
			const createUserRolesFailureAction = createUserRoleFailure(errorMessage);
			const userRolesState = reducer(
				userRoleInitialState,
				createUserRolesFailureAction,
			);

			expect(userRolesState.isLoading).toBeFalsy();
			expect(userRolesState.errors).toEqual(errorMessage);
		});
	});

	describe('Edit user role', () => {
		it('should dispatch EDIT_USER_ROLES_REQUEST', () => {
			const editUserRoleRequestAction = editUserRoleRequest();
			const userRolesState = reducer(
				userRoleInitialState,
				editUserRoleRequestAction,
			);

			expect(userRolesState.isLoading).toBeTruthy();
			expect(userRolesState.errors).toBe(null);
		});

		it('should dispatch EDIT_USER_ROLES_SUCCESS', () => {
			const roleInitialState = {
				resources,
				permissions,
				roles: userRolesResponse.data,
				isLoading: false,
				errors: null,
			};

			const userRoleToUpdate = {
				description: 'Manage the random users',
				title: 'Random User',
				_id: '5e4703d62faee61d8ede2d65',
			};

			const editUserRolesSuccessAction = editUserRoleSuccess(
				userRoleToUpdate,
				userRoleToUpdate._id,
			);
			const userRolesState = reducer(
				roleInitialState,
				editUserRolesSuccessAction,
			);
			const updatedUserRole = userRolesState.roles.find(
				(role) => role._id === userRoleToUpdate._id,
			);

			expect(userRolesState.isLoading).toBeFalsy();
			expect(updatedUserRole?.title).toEqual('Random User');
			expect(userRolesState.errors).toBe(null);
		});

		it('should dispatch EDIT_USER_ROLES_FAILURE', () => {
			const editUserRolesFailureAction = editUserRoleFailure(errorMessage);
			const userRolesState = reducer(
				userRoleInitialState,
				editUserRolesFailureAction,
			);

			expect(userRolesState.isLoading).toBeFalsy();
			expect(userRolesState.errors).toEqual(errorMessage);
		});
	});

	describe('Delete user role', () => {
		it('should dispatch DELETE_USER_ROLES_REQUEST', () => {
			const deleteUserRoleRequestAction = deleteUserRolesRequest();
			const userRolesState = reducer(
				userRoleInitialState,
				deleteUserRoleRequestAction,
			);

			expect(userRolesState.isLoading).toBeTruthy();
			expect(userRolesState.errors).toBe(null);
		});

		it('should dispatch DELETE_USER_ROLES_SUCCESS', () => {
			const roleInitialState = {
				resources,
				permissions,
				roles: userRolesResponse.data,
				isLoading: false,
				errors: null,
			};

			const deleteUserRolesSuccessAction = deleteUserRolesSuccess(
				'5e4703d62faee61d8ede2d65',
			);
			const userRolesState = reducer(
				roleInitialState,
				deleteUserRolesSuccessAction,
			);

			expect(userRolesState.isLoading).toBeFalsy();
			expect(userRolesState.roles.length).toBe(1);
			expect(userRolesState.errors).toBe(null);
		});

		it('should dispatch DELETE_USER_ROLES_FAILURE', () => {
			const editUserRolesFailureAction = deleteUserRolesFailure(errorMessage);
			const userRolesState = reducer(
				userRoleInitialState,
				editUserRolesFailureAction,
			);

			expect(userRolesState.isLoading).toBeFalsy();
			expect(userRolesState.errors).toEqual(errorMessage);
		});
	});
});
