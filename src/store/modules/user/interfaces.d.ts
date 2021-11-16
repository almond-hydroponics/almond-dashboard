import { ResourceAccessLevel } from '@modules/userRoles/interfaces';
import { FormattedPermissions } from '@utils/FormatPermissions/interfaces';
import {
	EDIT_USER_DETAILS_FAILURE,
	EDIT_USER_DETAILS_REQUEST,
	EDIT_USER_DETAILS_SUCCESS,
	GET_USER_DETAILS_FAILURE,
	GET_USER_DETAILS_REQUEST,
	GET_USER_DETAILS_SUCCESS,
	EDIT_USER_ROLE_FAILURE,
	EDIT_USER_ROLE_REQUEST,
	EDIT_USER_ROLE_SUCCESS,
	MARK_NOTIFICATIONS_READ,
} from './types';
import { ErrorObject } from '../../../types/shared.interfaces';

export interface GetUserDetailsActionRequest {
	type: GET_USER_DETAILS_REQUEST;
	isFetchingDetails: boolean;
}

export interface GetUserDetailsActionSuccess {
	userDetails: UserDetails;
	type: GET_USER_DETAILS_SUCCESS;
	isFetchingDetails: boolean;
}

export interface GetUserDetailsActionFailure {
	type: GET_USER_DETAILS_FAILURE;
	errors: ErrorObject | null;
	isFetchingDetails: boolean;
}

export interface EditUserDetailsActionRequest {
	type: EDIT_USER_DETAILS_REQUEST;
	isLoading: boolean;
}

export interface EditUserDetailsActionSuccess {
	userDetails: UserDetails;
	type: EDIT_USER_DETAILS_SUCCESS;
	isLoading: boolean;
}

export interface EditUserDetailsActionFailure {
	errors: ErrorObject | null;
	type: EDIT_USER_DETAILS_FAILURE;
	isLoading: boolean;
}

export interface EditUserRoleActionRequest {
	type: EDIT_USER_ROLE_REQUEST;
	isLoading: boolean;
}

export interface EditUserRoleActionSuccess {
	userDetails: UserDetails;
	type: EDIT_USER_ROLE_SUCCESS;
	isLoading: boolean;
}

export interface EditUserRoleActionFailure {
	errors: ErrorObject | null;
	type: EDIT_USER_ROLE_FAILURE;
	isLoading: boolean;
}

export interface MarkNotificationsRead {
	type: MARK_NOTIFICATIONS_READ;
}

export interface UserDetails {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	photo: string;
	isVerified: boolean;
	devices: Device[] | UserDevice[] | any;
	activeDevice: string | Device | any;
	roles: CurrentRole[] | Role[];
	permissions?: FormattedPermissions;
	currentRole: CurrentRole;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserDevice {
	_id: string;
	id: string;
}

export interface Device extends UserDevice {
	verified: boolean;
	enabled: boolean;
	user: string;
	updatedAt: string;
}

export interface CurrentRole {
	_id: string;
	title: string;
}

export interface Role extends CurrentRole {
	description: string;
	resourceAccessLevels: ResourceAccessLevel[];
}
