/* eslint-disable camelcase */
import { Permission, Resource, UserRole } from '@modules/userRoles/interfaces';

export type State = {
	roles: UserRole[];
	resources: Resource[];
	permissions: Permission[];
	isLoading: boolean;
	errors: null;
};

export const GET_USER_ROLES_REQUEST =
	'almond/user-roles/GET_USER_ROLES_REQUEST';
export type GET_USER_ROLES_REQUEST = typeof GET_USER_ROLES_REQUEST;

export const GET_USER_ROLES_SUCCESS =
	'almond/user-roles/GET_USER_ROLES_SUCCESS';
export type GET_USER_ROLES_SUCCESS = typeof GET_USER_ROLES_SUCCESS;

export const GET_USER_ROLES_FAILURE =
	'almond/user-roles/GET_USER_ROLES_FAILURE';
export type GET_USER_ROLES_FAILURE = typeof GET_USER_ROLES_FAILURE;

export const DELETE_USER_ROLES_REQUEST =
	'almond/user-roles/DELETE_USER_ROLES_REQUEST';
export type DELETE_USER_ROLES_REQUEST = typeof DELETE_USER_ROLES_REQUEST;

export const DELETE_USER_ROLES_SUCCESS =
	'almond/user-roles/DELETE_USER_ROLES_SUCCESS';
export type DELETE_USER_ROLES_SUCCESS = typeof DELETE_USER_ROLES_SUCCESS;

export const DELETE_USER_ROLES_FAILURE =
	'almond/user-roles/DELETE_USER_ROLES_FAILURE';
export type DELETE_USER_ROLES_FAILURE = typeof DELETE_USER_ROLES_FAILURE;

export const EDIT_USER_ROLES_REQUEST =
	'almond/user-roles/EDIT_USER_ROLES_REQUEST';
export type EDIT_USER_ROLES_REQUEST = typeof EDIT_USER_ROLES_REQUEST;

export const EDIT_USER_ROLES_SUCCESS =
	'almond/user-roles/EDIT_USER_ROLES_SUCCESS';
export type EDIT_USER_ROLES_SUCCESS = typeof EDIT_USER_ROLES_SUCCESS;

export const EDIT_USER_ROLES_FAILURE =
	'almond/user-roles/EDIT_USER_ROLES_FAILURE';
export type EDIT_USER_ROLES_FAILURE = typeof EDIT_USER_ROLES_FAILURE;

export const CREATE_USER_ROLES_REQUEST =
	'almond/user-roles/CREATE_USER_ROLES_REQUEST';
export type CREATE_USER_ROLES_REQUEST = typeof CREATE_USER_ROLES_REQUEST;

export const CREATE_USER_ROLES_SUCCESS =
	'almond/user-roles/CREATE_USER_ROLES_SUCCESS';
export type CREATE_USER_ROLES_SUCCESS = typeof CREATE_USER_ROLES_SUCCESS;

export const CREATE_USER_ROLES_FAILURE =
	'almond/user-roles/CREATE_USER_ROLES_FAILURE';
export type CREATE_USER_ROLES_FAILURE = typeof CREATE_USER_ROLES_FAILURE;
