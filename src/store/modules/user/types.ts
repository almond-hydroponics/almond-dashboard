import { UserDetails } from '@modules/user/interfaces';
import { FormattedPermissions } from '@utils/FormatPermissions/interfaces';

export type State = {
	userDetails: UserDetails;
	permissions: FormattedPermissions;
	errors: null;
	isLoading: boolean;
	isFetchingDetails: boolean;
	notifications: any[];
};

export const GET_USER_DETAILS_REQUEST = 'almond/GET_USER_DETAILS_REQUEST';
export type GET_USER_DETAILS_REQUEST = typeof GET_USER_DETAILS_REQUEST;

export const GET_USER_DETAILS_SUCCESS = 'almond/GET_USER_DETAILS_SUCCESS';
export type GET_USER_DETAILS_SUCCESS = typeof GET_USER_DETAILS_SUCCESS;

export const GET_USER_DETAILS_FAILURE = 'almond/GET_USER_DETAILS_FAILURE';
export type GET_USER_DETAILS_FAILURE = typeof GET_USER_DETAILS_FAILURE;

export const EDIT_USER_DETAILS_REQUEST = 'almond/EDIT_USER_DETAILS_REQUEST';
export type EDIT_USER_DETAILS_REQUEST = typeof EDIT_USER_DETAILS_REQUEST;

export const EDIT_USER_DETAILS_SUCCESS = 'almond/EDIT_USER_DETAILS_SUCCESS';
export type EDIT_USER_DETAILS_SUCCESS = typeof EDIT_USER_DETAILS_SUCCESS;

export const EDIT_USER_DETAILS_FAILURE = 'almond/EDIT_USER_DETAILS_FAILURE';
export type EDIT_USER_DETAILS_FAILURE = typeof EDIT_USER_DETAILS_FAILURE;

export const LOG_OUT_USER = 'almond/LOG_OUT_USER';
export type LOG_OUT_USER = typeof LOG_OUT_USER;

export const EDIT_USER_ROLE_REQUEST = 'almond/EDIT_USER_ROLE_REQUEST';
export type EDIT_USER_ROLE_REQUEST = typeof EDIT_USER_ROLE_REQUEST;

export const EDIT_USER_ROLE_SUCCESS = 'almond/EDIT_USER_ROLE_SUCCESS';
export type EDIT_USER_ROLE_SUCCESS = typeof EDIT_USER_ROLE_SUCCESS;

export const EDIT_USER_ROLE_FAILURE = 'almond/EDIT_USER_ROLE_FAILURE';
export type EDIT_USER_ROLE_FAILURE = typeof EDIT_USER_ROLE_FAILURE;

export const MARK_NOTIFICATIONS_READ = 'almond/MARK_NOTIFICATIONS_READ';
export type MARK_NOTIFICATIONS_READ = typeof MARK_NOTIFICATIONS_READ;
