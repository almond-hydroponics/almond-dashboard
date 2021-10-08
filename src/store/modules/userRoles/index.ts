// thunks
import { displaySnackMessage } from '@modules/snack';
// interfaces
import errorOnSnack from '@utils/errorOnSnack';
import { Dispatch, Reducer } from 'redux';
import {
	CreateUserRolesActionFailure,
	CreateUserRolesActionRequest,
	CreateUserRolesActionSuccess,
	DeleteUserRolesFailure,
	DeleteUserRolesRequest,
	DeleteUserRolesSuccess,
	EditUserRolesFailure,
	EditUserRolesRequest,
	EditUserRolesSuccess,
	GetUserRolesActionFailure,
	GetUserRolesActionRequest,
	GetUserRolesActionSuccess,
	UserRole,
} from './interfaces';
// types
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
	State,
} from './types';
import { Action, ErrorObject } from '../../../types/shared.interfaces';

/**
 * Create user roles request action creator
 * @returns {CreateUserRolesActionRequest}
 */
export const createUserRoleRequest = (): CreateUserRolesActionRequest => ({
	type: CREATE_USER_ROLES_REQUEST,
	isLoading: true,
});

/**
 * Create user roles success action creator
 * @param {role} role
 * @returns {CreateUserRolesActionSuccess}
 */
export const createUserRoleSuccess = (
	role: UserRole,
): CreateUserRolesActionSuccess => ({
	role,
	type: CREATE_USER_ROLES_SUCCESS,
	isLoading: false,
});

/**
 * Create user roles failure action creator
 * @returns {CreateUserRolesActionFailure}
 */
export const createUserRoleFailure = (
	errors: ErrorObject,
): CreateUserRolesActionFailure => ({
	errors,
	type: CREATE_USER_ROLES_FAILURE,
	isLoading: false,
});

/**
 * Get all schedules request
 * @returns {GetAllSchedulesActionRequest}
 */
export const getUserRolesRequest = (): GetUserRolesActionRequest => ({
	type: GET_USER_ROLES_REQUEST,
	isLoading: true,
});

/**
 * Get user roles success action creator
 * @returns {GetUserRolesActionSuccess}
 * @param allRolesAndPermissions
 */
export const getUserRolesSuccess = (allRolesAndPermissions: {
	data: any;
	permissions: any;
	resources: any;
}): GetUserRolesActionSuccess => ({
	roles: allRolesAndPermissions.data,
	permissions: allRolesAndPermissions.permissions,
	resources: allRolesAndPermissions.resources,
	isLoading: false,
	type: GET_USER_ROLES_SUCCESS,
});

/**
 * Get all schedules failure
 * @returns {GetAllSchedulesActionRequest}
 */
export const getUserRolesFailure = (
	errors: any,
): GetUserRolesActionFailure => ({
	errors,
	type: GET_USER_ROLES_FAILURE,
	isLoading: false,
});

/**
 * Delete user roles success action creator
 * @returns {DeleteUserRolesRequest}
 */
export const deleteUserRolesRequest = (): DeleteUserRolesRequest => ({
	type: DELETE_USER_ROLES_REQUEST,
	isLoading: true,
});

/**
 * Delete user roles success action creator
 * @returns {DeleteUserRolesSuccess}
 * @param id
 */
export const deleteUserRolesSuccess = (
	id: string,
): DeleteUserRolesSuccess => ({
	id,
	type: DELETE_USER_ROLES_SUCCESS,
	isLoading: false,
});

/**
 * Delete user roles success action creator
 * @returns {DeleteUserRolesSuccess}
 */
export const deleteUserRolesFailure = (
	errors: ErrorObject,
): DeleteUserRolesFailure => ({
	errors,
	type: DELETE_USER_ROLES_FAILURE,
	isLoading: false,
});

/**
 * Update user roles request action creator
 * @returns {EditUserRolesRequest}
 */
export const editUserRoleRequest = (): EditUserRolesRequest => ({
	type: EDIT_USER_ROLES_REQUEST,
	isLoading: true,
});

/**
 * Update user roles success action creator
 * @param {UserRole[], string} role
 * @param id
 * @returns {EditUserRolesSuccess}
 */
export const editUserRoleSuccess = (
	role: any,
	id: string,
): EditUserRolesSuccess => ({
	id,
	role,
	type: EDIT_USER_ROLES_SUCCESS,
	isLoading: false,
});

/**
 * Update user roles request action creator
 * @returns {EditUserRolesRequest}
 */
export const editUserRoleFailure = (
	errors: ErrorObject,
): EditUserRolesFailure => ({
	errors,
	type: EDIT_USER_ROLES_FAILURE,
	isLoading: false,
});

/**
 * Get user roles thunk
 * @returns {Function}
 */
export const getUserRoles =
	() =>
	(
		dispatch: Dispatch,
		getState: any,
		http: { get: (arg0: string) => Promise<any> },
	) => {
		dispatch(getUserRolesRequest());
		return http
			.get('/roles?include=permissions&include=resources')
			.then((response) => {
				const { data } = response;
				dispatch(getUserRolesSuccess(data));
			})
			.catch((error) => {
				errorOnSnack(error, dispatch, 'fetching user roles');
				dispatch(getUserRolesFailure(error));
			});
	};

/**
 * Create user role thunk
 * @param {Object} userRole
 * @returns {Function}
 */
export const createUserRole =
	(userRole: any) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			post: (
				arg0: string,
				arg1: any,
			) => Promise<{ data: { data: any; message: string } }>;
		},
	) => {
		dispatch(createUserRoleRequest());
		return http
			.post('/roles', userRole)
			.then((response: { data: { data: any; message: string } }) => {
				const {
					data: { data, message },
				} = response;
				dispatch(createUserRoleSuccess(data));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'creating new user role');
				dispatch(createUserRoleFailure(error));
			});
	};

/**
 * Delete user roles thunk
 * @returns {Function}
 * @param id
 */
export const deleteUserRole =
	(id: string) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: { delete: (arg0: string) => Promise<any> },
	) => {
		dispatch(deleteUserRolesRequest());
		return http
			.delete(`/roles/${id}`)
			.then((response) => {
				const {
					data: { message },
				} = response;
				dispatch(deleteUserRolesSuccess(id));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'deleting user role');
				dispatch(deleteUserRolesFailure(error));
			});
	};

/**
 * Edit a user role thunk
 * @param {Object} updatedRolePayload
 * @returns {Function}
 */
export const editUserRole =
	(updatedRolePayload) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			patch: (
				arg0: string,
				arg1: { _id: string },
			) => Promise<{ data: { data: any; message: string } }>;
		},
	) => {
		const { _id } = updatedRolePayload;
		dispatch(editUserRoleRequest());
		return http
			.patch(`/roles/${_id}`, updatedRolePayload)
			.then((response: { data: { data: any; message: string } }) => {
				const {
					data: { data, message },
				} = response;
				dispatch(editUserRoleSuccess(data, _id));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				error?.response?.status === 400
					? dispatch(
							displaySnackMessage(
								'Please format the fields properly',
								'error',
							),
					  )
					: errorOnSnack(error, dispatch, 'editing user role');
				dispatch(editUserRoleFailure(error));
			});
	};

// Set the initial role state
export const userRoleInitialState = {
	roles: [],
	resources: [],
	permissions: [],
	isLoading: false,
	errors: null,
};

export const reducer: Reducer<State, Action> = (
	state: State = userRoleInitialState,
	action: Action,
) => {
	switch (action.type) {
		case GET_USER_ROLES_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case GET_USER_ROLES_SUCCESS:
			return {
				...state,
				roles: action.roles,
				resources: action.resources,
				permissions: action.permissions,
				isLoading: action.isLoading,
			};
		case GET_USER_ROLES_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case EDIT_USER_ROLES_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case EDIT_USER_ROLES_SUCCESS:
			return {
				...state,
				roles: [...state.roles].map((role) =>
					role._id === action.role._id
						? {
								...role,
								...action.role,
						  }
						: role,
				),
				isLoading: action.isLoading,
				errors: null,
			};
		case EDIT_USER_ROLES_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case CREATE_USER_ROLES_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case CREATE_USER_ROLES_SUCCESS:
			return {
				...state,
				roles: [action.role, ...state.roles],
				isLoading: action.isLoading,
				errors: null,
			};
		case CREATE_USER_ROLES_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case DELETE_USER_ROLES_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case DELETE_USER_ROLES_SUCCESS:
			return {
				...state,
				roles: [...state.roles].filter((role) => action.id !== role._id),
				errors: null,
				isLoading: action.isLoading,
			};
		case DELETE_USER_ROLES_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		default:
			return state;
	}
};

export default reducer;
