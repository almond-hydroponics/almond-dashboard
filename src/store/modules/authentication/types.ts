import { UserDetails } from '@modules/user/interfaces';

export type State = {
	user: UserDetails;
	isLoading: boolean;
	errors: null;
};

export const CREATE_ACCOUNT_REQUEST = 'almond/auth/CREATE_ACCOUNT_REQUEST';
export type CREATE_ACCOUNT_REQUEST = typeof CREATE_ACCOUNT_REQUEST;

export const CREATE_ACCOUNT_SUCCESS = 'almond/auth/CREATE_ACCOUNT_SUCCESS';
export type CREATE_ACCOUNT_SUCCESS = typeof CREATE_ACCOUNT_SUCCESS;

export const CREATE_ACCOUNT_FAILURE = 'almond/auth/CREATE_ACCOUNT_FAILURE';
export type CREATE_ACCOUNT_FAILURE = typeof CREATE_ACCOUNT_FAILURE;

export const LOGIN_REQUEST = 'almond/auth/LOGIN_REQUEST';
export type LOGIN_REQUEST = typeof LOGIN_REQUEST;

export const LOGIN_SUCCESS = 'almond/auth/LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_FAILURE = 'almond/auth/LOGIN_FAILURE';
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;

export const PASSWORD_RESET_REQUEST = 'almond/auth/PASSWORD_RESET_REQUEST';
export type PASSWORD_RESET_REQUEST = typeof PASSWORD_RESET_REQUEST;

export const PASSWORD_RESET_SUCCESS = 'almond/auth/PASSWORD_RESET_SUCCESS';
export type PASSWORD_RESET_SUCCESS = typeof PASSWORD_RESET_SUCCESS;

export const PASSWORD_RESET_FAILURE = 'almond/auth/PASSWORD_RESET_FAILURE';
export type PASSWORD_RESET_FAILURE = typeof PASSWORD_RESET_FAILURE;

export const PASSWORD_CHANGE_REQUEST = 'almond/auth/PASSWORD_CHANGE_REQUEST';
export type PASSWORD_CHANGE_REQUEST = typeof PASSWORD_CHANGE_REQUEST;

export const PASSWORD_CHANGE_SUCCESS = 'almond/auth/PASSWORD_CHANGE_SUCCESS';
export type PASSWORD_CHANGE_SUCCESS = typeof PASSWORD_CHANGE_SUCCESS;

export const PASSWORD_CHANGE_FAILURE = 'almond/auth/PASSWORD_CHANGE_FAILURE';
export type PASSWORD_CHANGE_FAILURE = typeof PASSWORD_CHANGE_FAILURE;
