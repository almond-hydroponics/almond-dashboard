// third party libraries
import { Action, AnyAction, Dispatch } from 'redux';

// thunk action creators
import authService from '@utils/auth';
import formatPermissions from '@utils/FormatPermissions';
import errorOnSnack from '@utils/errorOnSnack';
import { displaySnackMessage } from '../snack';

// interfaces
import {
	EditUserRoleActionFailure,
	EditUserRoleActionRequest,
	EditUserRoleActionSuccess,
	EditUserDetailsActionFailure,
	EditUserDetailsActionRequest,
	EditUserDetailsActionSuccess,
	GetUserDetailsActionFailure,
	GetUserDetailsActionRequest,
	GetUserDetailsActionSuccess,
	UserDetails,
} from './interfaces';

// helper functions
// types
import {
	EDIT_USER_ROLE_FAILURE,
	EDIT_USER_ROLE_REQUEST,
	EDIT_USER_ROLE_SUCCESS,
	EDIT_USER_DETAILS_FAILURE,
	EDIT_USER_DETAILS_REQUEST,
	EDIT_USER_DETAILS_SUCCESS,
	GET_USER_DETAILS_FAILURE,
	GET_USER_DETAILS_REQUEST,
	GET_USER_DETAILS_SUCCESS,
	LOG_OUT_USER,
	State,
} from './types';

import { ErrorObject } from '../../../types/shared.interfaces';

export const getUserDetailsRequest = (): GetUserDetailsActionRequest => ({
	isFetchingDetails: true,
	type: GET_USER_DETAILS_REQUEST,
});

/**
 * Get userDetails success action creator
 * @returns {GetUserDetailsActionSuccess}
 */
export const getUserDetailsSuccess = (
	userDetails: UserDetails,
): GetUserDetailsActionSuccess => ({
	userDetails,
	isFetchingDetails: false,
	type: GET_USER_DETAILS_SUCCESS,
});

/**
 * Get userDetails failure action creator
 * @returns {GetUserDetailsActionFailure}
 */
export const getUserDetailsFailure = (
	errors: ErrorObject,
): GetUserDetailsActionFailure => ({
	errors,
	isFetchingDetails: false,
	type: GET_USER_DETAILS_FAILURE,
});

export const editUserDetailsRequest = (): EditUserDetailsActionRequest => ({
	isLoading: true,
	type: EDIT_USER_DETAILS_REQUEST,
});

/**
 * Edit user success action creator
 * @returns {EditUserDetailsActionSuccess}
 */
export const editUserDetailsSuccess = (
	userDetails: UserDetails,
): EditUserDetailsActionSuccess => ({
	userDetails,
	isLoading: false,
	type: EDIT_USER_DETAILS_SUCCESS,
});

/**
 * Edit user failure action creator
 * @returns {EditUserDetailsActionFailure}
 */
export const editUserDetailsFailure = (
	errors: ErrorObject,
): EditUserDetailsActionFailure => ({
	errors,
	isLoading: false,
	type: EDIT_USER_DETAILS_FAILURE,
});

export const editUserRoleRequest = (): EditUserRoleActionRequest => ({
	isLoading: true,
	type: EDIT_USER_ROLE_REQUEST,
});

/**
 * Edit user success action creator
 * @returns {EditUserRoleActionSuccess}
 */
export const editUserRoleSuccess = (
	userDetails: UserDetails,
): EditUserRoleActionSuccess => ({
	userDetails,
	isLoading: false,
	type: EDIT_USER_ROLE_SUCCESS,
});

/**
 * Edit user failure action creator
 * @returns {EditUserRoleActionFailure}
 */
export const editUserRoleFailure = (
	errors: ErrorObject,
): EditUserRoleActionFailure => ({
	errors,
	isLoading: false,
	type: EDIT_USER_ROLE_FAILURE,
});

/**
 * Log-out user action
 * @returns {Action}
 */
export const logoutUserAction = (): Action => ({ type: LOG_OUT_USER });

/**
 * Gets user details
 * @returns {Function}
 */
export const getUserDetails =
	() =>
	(
		dispatch: Dispatch,
		getState: any,
		http: { get: (arg0: string) => Promise<{ data: { data: UserDetails } }> },
	) => {
		dispatch(getUserDetailsRequest());
		return http
			.get('me')
			.then((response: { data: { data: UserDetails } }) => {
				const { data } = response.data;
				return dispatch(getUserDetailsSuccess(data));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'fetching your details');
				dispatch(getUserDetailsFailure(error));
			});
	};

/**
 * Edits user center details
 * @param {string} userId
 * @param userDetails
 * @returns {Function}
 */
export const editUserDetails =
	(userId: string, userDetails: any) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			put: (
				arg0: string,
				arg1: any,
			) => Promise<{ data: { data: any; message: any } }>;
		},
	) => {
		dispatch(editUserDetailsRequest());
		return http
			.put(`people/${userId}`, userDetails)
			.then((response: { data: { data: any; message: any } }) => {
				const { data, message } = response.data;
				dispatch(editUserDetailsSuccess(data));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'updating your details');
				dispatch(editUserDetailsFailure(error));
			});
	};

/**
 * Edits user center details
 * @param {string} userId
 * @param userRole
 * @returns {Function}
 */
export const editUserRole =
	(userId: string, userRole: any) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			put: (
				arg0: string,
				arg1: any,
			) => Promise<{ data: { data: any; message: any } }>;
		},
	) => {
		dispatch(editUserRoleRequest());
		return http
			.put(`people/role/${userId}`, userRole)
			.then((response: { data: { data: any; message: any } }) => {
				const { data, message } = response.data;
				dispatch(editUserRoleSuccess(data));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'updating your details');
				dispatch(editUserRoleFailure(error));
			});
	};

/**
 * Log-out user action creator
 * @returns {Function}
 */
export const logoutUser =
	() =>
	(dispatch: Dispatch): void => {
		dispatch(logoutUserAction());
		authService.logoutUser();
	};

export const userInitialState = {
	userDetails: {} as any,
	permissions: {} as any,
	errors: null,
	isLoading: false,
	isFetchingDetails: false,
};

/**
 * Updates the user state in the application
 * @param {Object} state
 * @param {AnyAction} action
 * @returns {Object} state
 */
export const reducer = (
	state: State = userInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case GET_USER_DETAILS_REQUEST:
			return {
				...state,
				isFetchingDetails: action.isFetchingDetails,
			};
		case GET_USER_DETAILS_SUCCESS:
			return {
				...state,
				isFetchingDetails: action.isFetchingDetails,
				userDetails: action.userDetails,
				permissions: formatPermissions(action.userDetails.roles[0]),
			};
		case GET_USER_DETAILS_FAILURE:
			return {
				...state,
				isFetchingDetails: action.isFetchingDetails,
				errors: action.errors,
			};
		case EDIT_USER_DETAILS_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case EDIT_USER_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				userDetails: { ...state.userDetails, ...action.userDetails },
			};
		case EDIT_USER_DETAILS_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case EDIT_USER_ROLE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case EDIT_USER_ROLE_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				userDetails: { ...state.userDetails, ...action.userDetails },
			};
		case EDIT_USER_ROLE_FAILURE:
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
