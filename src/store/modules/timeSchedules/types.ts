import { Schedule } from '@modules/timeSchedules/interfaces';

export type State = {
	schedules: Schedule[];
	enabled: boolean;
	isLoading: boolean;
	errors: null;
};

export const GET_SCHEDULES_REQUEST =
	'almond/timeSchedules/GET_SCHEDULES_REQUEST';
export type GET_SCHEDULES_REQUEST = typeof GET_SCHEDULES_REQUEST;

export const GET_SCHEDULES_SUCCESS =
	'almond/timeSchedules/GET_SCHEDULES_SUCCESS';
export type GET_SCHEDULES_SUCCESS = typeof GET_SCHEDULES_SUCCESS;

export const GET_SCHEDULES_FAILURE =
	'almond/timeSchedules/GET_SCHEDULES_FAILURE';
export type GET_SCHEDULES_FAILURE = typeof GET_SCHEDULES_FAILURE;

export const ADD_SCHEDULES_REQUEST =
	'almond/timeSchedules/ADD_SCHEDULES_REQUEST';
export type ADD_SCHEDULES_REQUEST = typeof ADD_SCHEDULES_REQUEST;

export const ADD_SCHEDULES_SUCCESS =
	'almond/timeSchedules/ADD_SCHEDULES_SUCCESS';
export type ADD_SCHEDULES_SUCCESS = typeof ADD_SCHEDULES_SUCCESS;

export const ADD_SCHEDULES_FAILURE =
	'almond/timeSchedules/ADD_SCHEDULES_FAILURE';
export type ADD_SCHEDULES_FAILURE = typeof ADD_SCHEDULES_FAILURE;

export const DELETE_SCHEDULE_REQUEST =
	'almond/timeSchedules/DELETE_SCHEDULE_REQUEST';
export type DELETE_SCHEDULE_REQUEST = typeof DELETE_SCHEDULE_REQUEST;

export const DELETE_SCHEDULE_SUCCESS =
	'almond/timeSchedules/DELETE_SCHEDULE_SUCCESS';
export type DELETE_SCHEDULE_SUCCESS = typeof DELETE_SCHEDULE_SUCCESS;

export const DELETE_SCHEDULE_FAILURE =
	'almond/timeSchedules/DELETE_SCHEDULE_FAILURE';
export type DELETE_SCHEDULE_FAILURE = typeof DELETE_SCHEDULE_FAILURE;

export const EDIT_SCHEDULE_REQUEST =
	'almond/timeSchedules/EDIT_SCHEDULE_REQUEST';
export type EDIT_SCHEDULE_REQUEST = typeof EDIT_SCHEDULE_REQUEST;

export const EDIT_SCHEDULE_SUCCESS =
	'almond/timeSchedules/EDIT_SCHEDULE_SUCCESS';
export type EDIT_SCHEDULE_SUCCESS = typeof EDIT_SCHEDULE_SUCCESS;

export const EDIT_SCHEDULE_FAILURE =
	'almond/timeSchedules/EDIT_SCHEDULE_FAILURE';
export type EDIT_SCHEDULE_FAILURE = typeof EDIT_SCHEDULE_FAILURE;

export const TOGGLE_PUMP_STATUS_REQUEST =
	'almond/timeSchedules/TOGGLE_PUMP_STATUS_REQUEST';
export type TOGGLE_PUMP_STATUS_REQUEST = typeof TOGGLE_PUMP_STATUS_REQUEST;

export const TOGGLE_PUMP_STATUS_SUCCESS =
	'almond/timeSchedules/TOGGLE_PUMP_STATUS_SUCCESS';
export type TOGGLE_PUMP_STATUS_SUCCESS = typeof TOGGLE_PUMP_STATUS_SUCCESS;

export const TOGGLE_PUMP_STATUS_FAILURE =
	'almond/timeSchedules/TOGGLE_PUMP_STATUS_FAILURE';
export type TOGGLE_PUMP_STATUS_FAILURE = typeof TOGGLE_PUMP_STATUS_FAILURE;

export const GET_PUMP_STATUS_REQUEST =
	'almond/timeSchedules/GET_PUMP_STATUS_REQUEST';
export type GET_PUMP_STATUS_REQUEST = typeof GET_PUMP_STATUS_REQUEST;

export const GET_PUMP_STATUS_SUCCESS =
	'almond/timeSchedules/GET_PUMP_STATUS_SUCCESS';
export type GET_PUMP_STATUS_SUCCESS = typeof GET_PUMP_STATUS_SUCCESS;

export const GET_PUMP_STATUS_FAILURE =
	'almond/timeSchedules/GET_PUMP_STATUS_FAILURE';
export type GET_PUMP_STATUS_FAILURE = typeof GET_PUMP_STATUS_FAILURE;
