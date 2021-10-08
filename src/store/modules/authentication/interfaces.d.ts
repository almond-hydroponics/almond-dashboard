import {
	CREATE_ACCOUNT_FAILURE,
	CREATE_ACCOUNT_REQUEST,
	CREATE_ACCOUNT_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	PASSWORD_RESET_FAILURE,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_REQUEST,
	PASSWORD_CHANGE_FAILURE,
	PASSWORD_CHANGE_SUCCESS,
	PASSWORD_CHANGE_REQUEST,
	REDIRECT,
} from '@modules/authentication/types';
import { UserDetails } from '@modules/user/interfaces';
import { ErrorObject } from '../../../types/shared.interfaces';

export interface RedirectAction {
	type: REDIRECT;
	payload: string;
}

export interface CreateAccountActionRequest {
	type: CREATE_ACCOUNT_REQUEST;
	isLoading: boolean;
}

export interface CreateAccountActionSuccess {
	type: CREATE_ACCOUNT_SUCCESS;
	isLoading: boolean;
}

export interface CreateAccountActionFailure {
	type: CREATE_ACCOUNT_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface LoginActionRequest {
	type: LOGIN_REQUEST;
	isLoading: boolean;
}

export interface LoginActionSuccess {
	type: LOGIN_SUCCESS;
	isLoading: boolean;
	user: UserDetails;
	errors: ErrorObject | null;
}

export interface LoginActionFailure {
	type: LOGIN_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface PasswordResetActionRequest {
	type: PASSWORD_RESET_REQUEST;
	isLoading: boolean;
}

export interface PasswordResetActionSuccess {
	type: PASSWORD_RESET_SUCCESS;
	isLoading: boolean;
}

export interface PasswordResetActionFailure {
	type: PASSWORD_RESET_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface PasswordChangeActionRequest {
	type: PASSWORD_CHANGE_REQUEST;
	isLoading: boolean;
}

export interface PasswordChangeActionSuccess {
	type: PASSWORD_CHANGE_SUCCESS;
	isLoading: boolean;
}

export interface PasswordChangeActionFailure {
	type: PASSWORD_CHANGE_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface IUserInputDTO {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	token: string;
}
