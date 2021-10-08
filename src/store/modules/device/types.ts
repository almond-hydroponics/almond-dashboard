import { Device } from '@modules/device/interfaces';

export type State = {
	isLoading: boolean;
	errors: null;
	activeDevice: object;
	devices: Device[];
};

export const ADD_DEVICE_REQUEST = 'almond/device/ADD_DEVICE_REQUEST';
export type ADD_DEVICE_REQUEST = typeof ADD_DEVICE_REQUEST;

export const ADD_DEVICE_SUCCESS = 'almond/devices/ADD_DEVICE_SUCCESS';
export type ADD_DEVICE_SUCCESS = typeof ADD_DEVICE_SUCCESS;

export const ADD_DEVICE_FAILURE = 'almond/device/ADD_DEVICE_FAILURE';
export type ADD_DEVICE_FAILURE = typeof ADD_DEVICE_FAILURE;

export const USER_VERIFY_DEVICE_REQUEST =
	'almond/device/USER_VERIFY_DEVICE_REQUEST';
export type USER_VERIFY_DEVICE_REQUEST = typeof USER_VERIFY_DEVICE_REQUEST;

export const USER_VERIFY_DEVICE_SUCCESS =
	'almond/devices/USER_VERIFY_DEVICE_SUCCESS';
export type USER_VERIFY_DEVICE_SUCCESS = typeof USER_VERIFY_DEVICE_SUCCESS;

export const USER_VERIFY_DEVICE_FAILURE =
	'almond/device/USER_VERIFY_DEVICE_FAILURE';
export type USER_VERIFY_DEVICE_FAILURE = typeof USER_VERIFY_DEVICE_FAILURE;

export const ACTIVATE_DEVICE_REQUEST = 'almond/device/ACTIVATE_DEVICE_REQUEST';
export type ACTIVATE_DEVICE_REQUEST = typeof ACTIVATE_DEVICE_REQUEST;

export const ACTIVATE_DEVICE_SUCCESS =
	'almond/devices/ACTIVATE_DEVICE_SUCCESS';
export type ACTIVATE_DEVICE_SUCCESS = typeof ACTIVATE_DEVICE_SUCCESS;

export const ACTIVATE_DEVICE_FAILURE = 'almond/device/ACTIVATE_DEVICE_FAILURE';
export type ACTIVATE_DEVICE_FAILURE = typeof ACTIVATE_DEVICE_FAILURE;

export const GET_DEVICES_REQUEST = 'almond/device/GET_DEVICES_REQUEST';
export type GET_DEVICES_REQUEST = typeof GET_DEVICES_REQUEST;

export const GET_DEVICES_SUCCESS = 'almond/devices/GET_DEVICES_SUCCESS';
export type GET_DEVICES_SUCCESS = typeof GET_DEVICES_SUCCESS;

export const GET_DEVICES_FAILURE = 'almond/device/GET_DEVICES_FAILURE';
export type GET_DEVICES_FAILURE = typeof GET_DEVICES_FAILURE;

export const EDIT_DEVICE_REQUEST = 'almond/device/EDIT_DEVICE_REQUEST';
export type EDIT_DEVICE_REQUEST = typeof EDIT_DEVICE_REQUEST;

export const EDIT_DEVICE_SUCCESS = 'almond/devices/EDIT_DEVICE_SUCCESS';
export type EDIT_DEVICE_SUCCESS = typeof EDIT_DEVICE_SUCCESS;

export const EDIT_DEVICE_FAILURE = 'almond/device/EDIT_DEVICE_FAILURE';
export type EDIT_DEVICE_FAILURE = typeof EDIT_DEVICE_FAILURE;

export const DELETE_DEVICE_REQUEST = 'almond/device/DELETE_DEVICE_REQUEST';
export type DELETE_DEVICE_REQUEST = typeof DELETE_DEVICE_REQUEST;

export const DELETE_DEVICE_SUCCESS = 'almond/devices/DELETE_DEVICE_SUCCESS';
export type DELETE_DEVICE_SUCCESS = typeof DELETE_DEVICE_SUCCESS;

export const DELETE_DEVICE_FAILURE = 'almond/device/DELETE_DEVICE_FAILURE';
export type DELETE_DEVICE_FAILURE = typeof DELETE_DEVICE_FAILURE;
