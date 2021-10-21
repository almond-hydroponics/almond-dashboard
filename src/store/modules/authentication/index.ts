import {
	CreateAccountActionFailure,
	CreateAccountActionRequest,
	CreateAccountActionSuccess,
	IUserInputDTO,
	LoginActionFailure,
	LoginActionRequest,
	LoginActionSuccess,
	PasswordChangeActionFailure,
	PasswordChangeActionRequest,
	PasswordChangeActionSuccess,
	PasswordResetActionFailure,
	PasswordResetActionRequest,
	PasswordResetActionSuccess,
} from '@modules/authentication/interfaces';
import {
	CREATE_ACCOUNT_FAILURE,
	CREATE_ACCOUNT_REQUEST,
	CREATE_ACCOUNT_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	PASSWORD_CHANGE_FAILURE,
	PASSWORD_CHANGE_REQUEST,
	PASSWORD_CHANGE_SUCCESS,
	PASSWORD_RESET_FAILURE,
	PASSWORD_RESET_REQUEST,
	PASSWORD_RESET_SUCCESS,
	State,
} from '@modules/authentication/types';
import { redirect } from '@modules/redirect';
import { displaySnackMessage } from '@modules/snack';
import { UserDetails } from '@modules/user/interfaces';
import authService from '@utils/auth';
import errorOnSnack from '@utils/errorOnSnack';
import { Action, AnyAction, Dispatch, Reducer } from 'redux';
import { ErrorObject } from '../../../types/shared.interfaces';
/**
 * Create account request
 * @returns {CreateAccountActionRequest}
 */
export const createAccountRequest = (): CreateAccountActionRequest => ({
	type: CREATE_ACCOUNT_REQUEST,
	isLoading: true,
});

/**
 * Create account success
 * @returns {CreateAccountActionSuccess}
 */
export const createAccountSuccess = (): CreateAccountActionSuccess => ({
	type: CREATE_ACCOUNT_SUCCESS,
	isLoading: false,
});

/**
 * Create account failure
 * @returns {CreateAccountActionFailure}
 */
export const createAccountFailure = (
	errors: ErrorObject,
): CreateAccountActionFailure => ({
	errors,
	type: CREATE_ACCOUNT_FAILURE,
	isLoading: false,
});

/**
 * Login account request
 * @returns {LoginActionRequest}
 */
export const loginAccountRequest = (): LoginActionRequest => ({
	type: LOGIN_REQUEST,
	isLoading: true,
});

/**
 * Login account success
 * @returns {LoginActionSuccess}
 */
export const loginAccountSuccess = (
	user: UserDetails,
): LoginActionSuccess => ({
	user,
	type: LOGIN_SUCCESS,
	errors: null,
	isLoading: false,
});

export const loginAccountFailure = (
	errors: ErrorObject,
): LoginActionFailure => ({
	errors,
	type: LOGIN_FAILURE,
	isLoading: false,
});

/**
 * Password reset request
 * @returns {PasswordResetActionRequest}
 */
export const passwordResetRequest = (): PasswordResetActionRequest => ({
	type: PASSWORD_RESET_REQUEST,
	isLoading: true,
});

/**
 * Password reset success
 * @returns {PasswordResetActionSuccess}
 */
export const passwordResetSuccess = (): PasswordResetActionSuccess => ({
	type: PASSWORD_RESET_SUCCESS,
	isLoading: false,
});

/**
 * Password reset failure
 * @returns {PasswordResetActionFailure}
 */
export const passwordResetFailure = (
	errors: ErrorObject,
): PasswordResetActionFailure => ({
	errors,
	type: PASSWORD_RESET_FAILURE,
	isLoading: false,
});

/**
 * Password change request
 * @returns {PasswordChangeActionRequest}
 */
export const passwordChangeRequest = (): PasswordChangeActionRequest => ({
	type: PASSWORD_CHANGE_REQUEST,
	isLoading: true,
});

/**
 * Password change success
 * @returns {PasswordChangeActionSuccess}
 */
export const passwordChangeSuccess = (): PasswordChangeActionSuccess => ({
	type: PASSWORD_CHANGE_SUCCESS,
	isLoading: false,
});

/**
 * Password change failure
 * @returns {PasswordChangeActionFailure}
 */
export const passwordChangeFailure = (
	errors: ErrorObject,
): PasswordChangeActionFailure => ({
	errors,
	type: PASSWORD_CHANGE_FAILURE,
	isLoading: false,
});

export const createAccount =
	(user: Partial<IUserInputDTO>) =>
	(dispatch: Dispatch, getState: any, http: any) => {
		dispatch(createAccountRequest());
		return http
			.post('auth/register', user)
			.then((response: { data: any }) => {
				const {
					data: { message },
				} = response;
				dispatch(createAccountSuccess());
				dispatch(redirect('/success', message));
			})
			.catch((error) => {
				dispatch(createAccountFailure(error.message));
				errorOnSnack(
					error,
					dispatch,
					'creating your new account. Kindly try again.',
				);
			});
	};

export const loginAccount =
	(user: Partial<IUserInputDTO>) =>
	(dispatch: Dispatch, getState: any, http: any) => {
		dispatch(loginAccountRequest());
		return http
			.post('auth/login', user)
			.then((response: { data: any }) => {
				const {
					data: { data, message },
				} = response;
				authService.saveToken(data.token.accessToken);
				dispatch(loginAccountSuccess(data.user));
				dispatch(displaySnackMessage(message));
			})
			.catch((error) => {
				console.log('Class: , Function: , Line 196 error():', error);
				dispatch(loginAccountFailure(error.message));
				errorOnSnack(
					error,
					dispatch,
					'login in to your account. Kindly try again.',
				);
			});
	};

export const passwordReset =
	(email: string) => (dispatch: Dispatch, getState: any, http: any) => {
		dispatch(passwordResetRequest());
		return http
			.post('recover/password', { email })
			.then((response: { data: any }) => {
				const {
					data: { message },
				} = response;
				dispatch(passwordResetSuccess());
				dispatch(redirect('/success', message));
			})
			.catch((error) => {
				dispatch(passwordResetFailure(error.message));
				errorOnSnack(error, dispatch, 'Password reset failed');
			});
	};

export const passwordChange =
	(passwordDetails: Partial<IUserInputDTO>) =>
	(dispatch: Dispatch, getState: any, http: any) => {
		dispatch(passwordChangeRequest());
		return http
			.post('recover/change_password', passwordDetails)
			.then((response: { data: any }) => {
				const {
					data: { message },
				} = response;
				dispatch(passwordChangeSuccess());
				window.location.replace('/login');
				dispatch(displaySnackMessage(message));
			})
			.catch((error) => {
				dispatch(passwordResetFailure(error.message));
				errorOnSnack(error, dispatch, 'Password change failed');
			});
	};

export const socialLogin =
	() => (dispatch: Dispatch, getState: any, http: any) => {
		try {
			window.location.replace(
				`${process.env.NEXT_PUBLIC_ALMOND_API}/auth/google`,
			);
		} catch (error: any) {
			errorOnSnack(error, dispatch, 'Cannot complete request');
		}
	};

export const userAccountInitialState = {
	user: {} as any,
	isLoading: false,
	errors: null,
};

export const reducer: Reducer<State, Action> = (
	state: State = userAccountInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case CREATE_ACCOUNT_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case CREATE_ACCOUNT_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case CREATE_ACCOUNT_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case LOGIN_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				user: action.user,
				errors: action.errors,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case PASSWORD_RESET_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case PASSWORD_RESET_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case PASSWORD_RESET_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case PASSWORD_CHANGE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case PASSWORD_CHANGE_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case PASSWORD_CHANGE_FAILURE:
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
