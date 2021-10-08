import {
	CREATE_USER_ROLES_FAILURE,
	CREATE_USER_ROLES_REQUEST,
	CREATE_USER_ROLES_SUCCESS,
	DELETE_USER_ROLES_FAILURE,
	DELETE_USER_ROLES_SUCCESS,
	DELETE_USER_ROLES_REQUEST,
	EDIT_USER_ROLES_SUCCESS,
	GET_USER_ROLES_FAILURE,
	GET_USER_ROLES_REQUEST,
	GET_USER_ROLES_SUCCESS,
	EDIT_USER_ROLES_REQUEST,
	EDIT_USER_ROLES_FAILURE,
} from './types';
import { ErrorObject } from '../../../types/shared.interfaces';

export interface GetUserRolesActionRequest {
	type: GET_USER_ROLES_REQUEST;
	isLoading: boolean;
}

export interface GetUserRolesActionSuccess {
	roles: UserRole[];
	permissions?: Permission;
	resources?: Resource;
	isLoading: boolean;
	type: GET_USER_ROLES_SUCCESS;
}

export interface GetUserRolesActionFailure {
	type: GET_USER_ROLES_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface CreateUserRolesActionRequest {
	type: CREATE_USER_ROLES_REQUEST;
	isLoading: boolean;
}

export interface CreateUserRolesActionSuccess {
	type: CREATE_USER_ROLES_SUCCESS;
	role: UserRole;
	isLoading: boolean;
}

export interface CreateUserRolesActionFailure {
	type: CREATE_USER_ROLES_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface DeleteUserRolesRequest {
	type: DELETE_USER_ROLES_REQUEST;
	isLoading: boolean;
}

export interface DeleteUserRolesSuccess {
	type: DELETE_USER_ROLES_SUCCESS;
	id: string;
	isLoading: boolean;
}

export interface DeleteUserRolesFailure {
	type: DELETE_USER_ROLES_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface EditUserRolesRequest {
	type: EDIT_USER_ROLES_REQUEST;
	isLoading: boolean;
}

export interface EditUserRolesSuccess {
	id: string;
	role: UserRole;
	type: EDIT_USER_ROLES_SUCCESS;
	isLoading: boolean;
}

export interface EditUserRolesFailure {
	type: EDIT_USER_ROLES_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface Resource {
	_id: string;
	name: string;
}

export interface Permission {
	_id: string;
	type: string;
}

export interface ResourceAccessLevel {
	permissions: Permission[];
	resource: Resource;
	_id: string;

	[key: string]: any;
}

export interface UserRole {
	description: string;
	title: string;
	_id: string;
	resourceAccessLevels: ResourceAccessLevel[];
	userCount: number;
	deleted: boolean;
}
