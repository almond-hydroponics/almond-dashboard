// thunks
import { Action, AnyAction, Dispatch, Reducer } from 'redux';
import { logActivity } from '@modules/activityLogs';
import errorOnSnack from '@utils/errorOnSnack';
import { displaySnackMessage } from '../snack';

// interfaces
import {
	AddScheduleActionRequest,
	AddScheduleActionSuccess,
	AddSchedulesActionFailure,
	DeleteScheduleActionFailure,
	DeleteScheduleActionRequest,
	DeleteScheduleActionSuccess,
	EditScheduleActionFailure,
	EditScheduleActionRequest,
	EditScheduleActionSuccess,
	GetAllSchedulesActionFailure,
	GetAllSchedulesActionRequest,
	GetAllSchedulesActionSuccess,
	GetPumpStatusActionFailure,
	GetPumpStatusActionRequest,
	GetPumpStatusActionSuccess,
	NewSchedule,
	Schedule,
	SchedulePayload,
	TogglePumpStatusActionFailure,
	TogglePumpStatusActionRequest,
	TogglePumpStatusActionSuccess,
	ToggleSchedulePayload,
} from './interfaces';

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
	State,
} from './types';

// helpers
import { ErrorObject } from '../../../types/shared.interfaces';

/**
 * Get all schedules request
 * @returns {GetAllSchedulesActionRequest}
 */
export const getSchedulesRequest = (): GetAllSchedulesActionRequest => ({
	type: GET_SCHEDULES_REQUEST,
	isLoading: true,
});

/**
 * Get all schedules success
 * @param {Schedule} schedules
 * @returns {GetAllSchedulesActionSuccess}
 */
export const getSchedulesSuccess = (
	schedules: Schedule[],
): GetAllSchedulesActionSuccess => ({
	schedules,
	type: GET_SCHEDULES_SUCCESS,
	isLoading: false,
});

/**
 * Get all schedules failure
 * @returns {GetAllSchedulesActionSuccess}
 */
export const getSchedulesFailure = (
	errors: ErrorObject,
): GetAllSchedulesActionFailure => ({
	errors,
	type: GET_SCHEDULES_FAILURE,
	isLoading: false,
});

/**
 * Add a new schedule request
 * @returns {AddScheduleActionRequest}
 */
export const addScheduleRequest = (): AddScheduleActionRequest => ({
	type: ADD_SCHEDULES_REQUEST,
	isLoading: true,
});

/**
 * Add new schedule success
 * @param {NewSchedule} schedule
 * @returns {AddScheduleActionSuccess}
 */
export const addScheduleSuccess = (
	schedule: NewSchedule,
): AddScheduleActionSuccess => ({
	schedule,
	type: ADD_SCHEDULES_SUCCESS,
	isLoading: false,
});

/**
 * Add new schedule failure
 * @returns {AddSchedulesActionFailure}
 */
export const addScheduleFailure = (
	errors: ErrorObject,
): AddSchedulesActionFailure => ({
	errors,
	type: ADD_SCHEDULES_FAILURE,
	isLoading: false,
});

/**
 * Delete single schedule request
 * @returns {DeleteScheduleActionRequest}
 */
export const deleteSingleScheduleRequest =
	(): DeleteScheduleActionRequest => ({
		type: DELETE_SCHEDULE_REQUEST,
		isLoading: true,
	});

/**
 * Delete single schedule success
 * @returns {DeleteScheduleActionSuccess}
 * @param id
 */
export const deleteSingleScheduleSuccess = (
	id: string,
): DeleteScheduleActionSuccess => ({
	id,
	type: DELETE_SCHEDULE_SUCCESS,
	isLoading: false,
});

/**
 * Delete single schedule failure
 * @returns {DeleteScheduleActionFailure}
 */
export const deleteSingleScheduleFailure = (
	errors: ErrorObject,
): DeleteScheduleActionFailure => ({
	errors,
	type: DELETE_SCHEDULE_FAILURE,
	isLoading: false,
});

/**
 * Edit a schedule request
 * @returns {AddScheduleActionRequest}
 */
export const editScheduleRequest = (): EditScheduleActionRequest => ({
	type: EDIT_SCHEDULE_REQUEST,
	isLoading: true,
});

/**
 * Add new schedule success
 *
 * @param id
 * @param {Schedule} schedule
 * @returns {AddScheduleActionSuccess}
 */
export const editScheduleSuccess = (
	id: string,
	schedule: NewSchedule,
): EditScheduleActionSuccess => ({
	id,
	schedule,
	type: EDIT_SCHEDULE_SUCCESS,
	isLoading: false,
});

/**
 * Add edit schedule failure
 * @returns {EditScheduleActionFailure}
 */
export const editScheduleFailure = (
	errors: ErrorObject,
): EditScheduleActionFailure => ({
	errors,
	type: EDIT_SCHEDULE_FAILURE,
	isLoading: false,
});

/**
 * Get all schedules request
 * @returns {GetAllSchedulesActionRequest}
 */
export const togglePumpStatusRequest = (): TogglePumpStatusActionRequest => ({
	type: TOGGLE_PUMP_STATUS_REQUEST,
	isLoading: true,
});

/**
 * Get all schedules success
 * @returns {GetAllSchedulesActionSuccess}
 * @param enabled
 */
export const togglePumpStatusSuccess = (
	enabled: boolean,
): TogglePumpStatusActionSuccess => ({
	enabled,
	type: TOGGLE_PUMP_STATUS_SUCCESS,
	isLoading: false,
});

/**
 * Get all schedules failure
 * @returns {GetAllSchedulesActionSuccess}
 */
export const togglePumpStatusFailure = (
	errors: ErrorObject,
): TogglePumpStatusActionFailure => ({
	errors,
	type: TOGGLE_PUMP_STATUS_FAILURE,
	isLoading: false,
});

/**
 * Get all schedules request
 * @returns {GetAllSchedulesActionRequest}
 */
export const getPumpStatusRequest = (): GetPumpStatusActionRequest => ({
	type: GET_PUMP_STATUS_REQUEST,
	isLoading: true,
});

/**
 * Get all schedules success
 * @returns {GetAllSchedulesActionSuccess}
 * @param enabled
 */
export const getPumpStatusSuccess = (
	enabled: boolean,
): GetPumpStatusActionSuccess => ({
	enabled,
	type: GET_PUMP_STATUS_SUCCESS,
	isLoading: false,
});

/**
 * Get all schedules failure
 * @returns {GetAllSchedulesActionSuccess}
 */
export const getPumpStatusFailure = (
	errors: ErrorObject,
): GetPumpStatusActionFailure => ({
	errors,
	type: GET_PUMP_STATUS_FAILURE,
	isLoading: false,
});

/**
 * Get all schedules
 * @returns {Function} action type and payload
 */
export const getAllSchedules =
	(deviceId: string) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			get: (
				arg0: string,
				arg1: { cache: boolean },
			) => Promise<{ data: { data: any } }>;
		},
	) => {
		dispatch(getSchedulesRequest());
		return http
			.get(`/schedules?device=${deviceId}`, { cache: true })
			.then((response: { data: { data: any } }) => {
				const {
					data: { data },
				} = response;
				dispatch(getSchedulesSuccess(data));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'fetching your schedule');
				dispatch(getSchedulesFailure(error));
			});
	};

/**
 * Add a new schedule
 * @returns {Function} action type and payload
 */
export const addNewSchedule =
	(schedule: SchedulePayload) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			post: (arg0: string, arg1: SchedulePayload) => Promise<{ data: any }>;
		},
	) => {
		dispatch(addScheduleRequest());
		return http
			.post('schedules', schedule)
			.then((response: { data: any }) => {
				const {
					data: { data, message },
				} = response;
				dispatch(addScheduleSuccess(data));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'creating your schedule');
				dispatch(addScheduleFailure(error));
			});
	};

/**
 * Delete a schedule
 * @returns {Function} action type and payload
 */
export const deleteSingleSchedule =
	(id: string) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: { delete: (arg0: string) => Promise<{ data: { message: any } }> },
	) => {
		dispatch(deleteSingleScheduleRequest());
		return http
			.delete(`schedules/${id}`)
			.then((response: { data: { message: string } }) => {
				const {
					data: { message },
				} = response;
				dispatch(deleteSingleScheduleSuccess(id));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'deleting your schedule');
				dispatch(deleteSingleScheduleFailure(error));
			});
	};

/**
 * Edit a schedule
 * @returns {Function} action type and payload
 */
export const editSchedule =
	(id: string, schedule: SchedulePayload) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			patch: (arg0: string, arg1: SchedulePayload) => Promise<{ data: any }>;
		},
	) => {
		dispatch(editScheduleRequest());
		return http
			.patch(`schedules/${id}`, schedule)
			.then((response: { data: any }) => {
				const {
					data: { data, message },
				} = response;
				dispatch(editScheduleSuccess(id, data));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'editing your schedule');
				dispatch(editScheduleFailure(error));
			});
	};

/**
 * Toggle a pump manually
 * @returns {Function} action type and payload
 */
export const togglePump =
	(payload: ToggleSchedulePayload) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			put: (arg0: string, arg1: { enabled: any }) => Promise<{ data: any }>;
		},
	) => {
		dispatch(togglePumpStatusRequest());
		return http
			.put('pump', payload)
			.then((response: { data: any }) => {
				const {
					data: {
						data: {
							scheduleOverride: { enabled },
							activityHistory,
						},
						message,
					},
				} = response;
				// const data = response.data.data.scheduleOverride.enabled;
				dispatch(getPumpStatusSuccess(enabled));
				dispatch(togglePumpStatusSuccess(enabled));
				dispatch(logActivity(activityHistory));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(
					error,
					dispatch,
					`turning pump ${payload.enabled ? 'ON' : 'OFF'}`,
				);
				dispatch(togglePumpStatusFailure(error));
			});
	};

/**
 * Get pump status
 * @returns {Function} action type and payload
 */
export const getPumpStatus =
	(deviceId: string) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			get: (arg0: string) => Promise<{ data: { data: { enabled: boolean } } }>;
		},
	) => {
		dispatch(getPumpStatusRequest());
		return http
			.get(`/pump?device=${deviceId}`)
			.then((response: { data: { data: { enabled: boolean } } }) => {
				const {
					data: {
						data: { enabled },
					},
				} = response;
				dispatch(getPumpStatusSuccess(enabled));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'fetching pump status');
				dispatch(getPumpStatusFailure(error));
			});
	};

/**
 * Set a pump manually
 * @returns {Function} action type and payload
 */
export const toggleScheduleStatus =
	(id: string, payload: ToggleSchedulePayload) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			put: (
				arg0: string,
				arg1: any,
			) => Promise<{ data: { data: Schedule; message: string } }>;
		},
	) => {
		dispatch(editScheduleRequest());
		return http
			.put(`schedules/${id}`, payload)
			.then((response: { data: { data: Schedule; message: string } }) => {
				const {
					data: { data, message },
				} = response;
				dispatch(editScheduleSuccess(id, data));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'changing the time schedule');
				dispatch(editScheduleFailure(error));
			});
	};

export const schedulesInitialState = {
	schedules: [],
	enabled: false,
	isLoading: false,
	errors: null,
};

export const reducer: Reducer<State, Action> = (
	state: State = schedulesInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case GET_SCHEDULES_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case GET_SCHEDULES_SUCCESS:
			return {
				...state,
				schedules: action.schedules,
				errors: null,
				isLoading: action.isLoading,
			};
		case GET_SCHEDULES_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case ADD_SCHEDULES_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case ADD_SCHEDULES_SUCCESS:
			return {
				...state,
				schedules: [action.schedule, ...state.schedules],
				errors: null,
				isLoading: action.isLoading,
			};
		case ADD_SCHEDULES_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case DELETE_SCHEDULE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case DELETE_SCHEDULE_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				schedules: [...state.schedules].filter(
					(schedule) => action.id !== schedule._id,
				),
				errors: null,
			};
		case DELETE_SCHEDULE_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case EDIT_SCHEDULE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case EDIT_SCHEDULE_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				schedules: [...state.schedules].map((schedule) =>
					schedule._id === action.schedule._id
						? {
								...schedule,
								...action.schedule,
						  }
						: schedule,
				),
				errors: null,
			};
		case EDIT_SCHEDULE_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case TOGGLE_PUMP_STATUS_REQUEST:
			return {
				...state,
				// isLoading: action.isLoading,
			};
		case TOGGLE_PUMP_STATUS_SUCCESS:
			return {
				...state,
				// isLoading: action.isLoading,
				enabled: action.enabled,
				errors: null,
			};
		case TOGGLE_PUMP_STATUS_FAILURE:
			return {
				...state,
				// isLoading: action.isLoading,
				errors: action.errors,
			};
		case GET_PUMP_STATUS_REQUEST:
			return {
				...state,
				// isLoading: action.isLoading,
			};
		case GET_PUMP_STATUS_SUCCESS:
			return {
				...state,
				// isLoading: action.isLoading,
				enabled: action.enabled,
				errors: null,
			};
		case GET_PUMP_STATUS_FAILURE:
			return {
				...state,
				// isLoading: action.isLoading,
				errors: action.errors,
			};
		default:
			return state;
	}
};

export default reducer;
