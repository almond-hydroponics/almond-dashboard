// types
import {
	ADD_SCHEDULES_FAILURE,
	ADD_SCHEDULES_REQUEST,
	ADD_SCHEDULES_SUCCESS,
	DELETE_SCHEDULE_FAILURE,
	DELETE_SCHEDULE_REQUEST,
	DELETE_SCHEDULE_SUCCESS,
	EDIT_SCHEDULE_FAILURE,
	EDIT_SCHEDULE_REQUEST,
	EDIT_SCHEDULE_SUCCESS,
	GET_PUMP_STATUS_FAILURE,
	GET_PUMP_STATUS_REQUEST,
	GET_PUMP_STATUS_SUCCESS,
	GET_SCHEDULES_REQUEST,
	GET_SCHEDULES_SUCCESS,
	GET_SCHEDULES_FAILURE,
	TOGGLE_PUMP_STATUS_FAILURE,
	TOGGLE_PUMP_STATUS_REQUEST,
	TOGGLE_PUMP_STATUS_SUCCESS,
} from './types';
import { ErrorObject } from '../../../types/shared.interfaces';

export interface GetAllSchedulesActionRequest {
	type: GET_SCHEDULES_REQUEST;
	isLoading: boolean;
}

export interface GetAllSchedulesActionSuccess {
	schedules: Schedule[];
	type: GET_SCHEDULES_SUCCESS;
	isLoading: boolean;
}

export interface GetAllSchedulesActionFailure {
	type: GET_SCHEDULES_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface AddScheduleActionRequest {
	type: ADD_SCHEDULES_REQUEST;
	isLoading: boolean;
}

export interface AddScheduleActionSuccess {
	schedule: NewSchedule;
	type: ADD_SCHEDULES_SUCCESS;
	isLoading: boolean;
}

export interface AddSchedulesActionFailure {
	type: ADD_SCHEDULES_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface DeleteScheduleActionRequest {
	type: DELETE_SCHEDULE_REQUEST;
	isLoading: boolean;
}

export interface DeleteScheduleActionSuccess {
	id: string;
	type: DELETE_SCHEDULE_SUCCESS;
	isLoading: boolean;
}

export interface DeleteScheduleActionFailure {
	type: DELETE_SCHEDULE_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface EditScheduleActionRequest {
	type: EDIT_SCHEDULE_REQUEST;
	isLoading: boolean;
}

export interface EditScheduleActionSuccess {
	id: string;
	schedule: NewSchedule;
	type: EDIT_SCHEDULE_SUCCESS;
	isLoading: boolean;
}

export interface EditScheduleActionFailure {
	type: EDIT_SCHEDULE_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface TogglePumpStatusActionRequest {
	type: TOGGLE_PUMP_STATUS_REQUEST;
	isLoading: boolean;
}

export interface TogglePumpStatusActionSuccess {
	enabled: boolean;
	type: TOGGLE_PUMP_STATUS_SUCCESS;
	isLoading: boolean;
}

export interface TogglePumpStatusActionFailure {
	type: TOGGLE_PUMP_STATUS_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface GetPumpStatusActionRequest {
	type: GET_PUMP_STATUS_REQUEST;
	isLoading: boolean;
}

export interface GetPumpStatusActionSuccess {
	enabled: boolean;
	type: GET_PUMP_STATUS_SUCCESS;
	isLoading: boolean;
}

export interface GetPumpStatusActionFailure {
	type: GET_PUMP_STATUS_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface Schedule {
	id?: string;
	_id: string;
	schedule: string;
	enabled: boolean;
	createdAt: string;
	updatedAt: string;
	user: string;
}

export interface NewSchedule {
	schedule: string;
	device?: string;
}

export interface ToggleSchedulePayload {
	enabled: boolean;
	device: string;
}

export interface SchedulePayload {
	schedule: string;
	device: string;
}
