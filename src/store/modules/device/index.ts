// thunks
import {
	ActivateDevice,
	ActivateDeviceActionFailure,
	ActivateDeviceActionRequest,
	ActivateDeviceActionSuccess,
	AddDeviceActionFailure,
	AddDeviceActionRequest,
	AddDeviceActionSuccess,
	DeleteDeviceActionFailure,
	DeleteDeviceActionRequest,
	DeleteDeviceActionSuccess,
	Device,
	EditDeviceActionFailure,
	EditDeviceActionRequest,
	EditDeviceActionSuccess,
	GetAllDevicesActionFailure,
	GetAllDevicesActionRequest,
	GetAllDevicesActionSuccess,
	NewDevice,
	UserVerifyDeviceActionFailure,
	UserVerifyDeviceActionRequest,
	UserVerifyDeviceActionSuccess,
	VerifyDevice,
} from '@modules/device/interfaces';

import {
	ACTIVATE_DEVICE_FAILURE,
	ACTIVATE_DEVICE_REQUEST,
	ACTIVATE_DEVICE_SUCCESS,
	ADD_DEVICE_FAILURE,
	ADD_DEVICE_REQUEST,
	ADD_DEVICE_SUCCESS,
	DELETE_DEVICE_FAILURE,
	DELETE_DEVICE_REQUEST,
	DELETE_DEVICE_SUCCESS,
	EDIT_DEVICE_FAILURE,
	EDIT_DEVICE_REQUEST,
	EDIT_DEVICE_SUCCESS,
	GET_DEVICES_FAILURE,
	GET_DEVICES_REQUEST,
	GET_DEVICES_SUCCESS,
	State,
	USER_VERIFY_DEVICE_FAILURE,
	USER_VERIFY_DEVICE_REQUEST,
	USER_VERIFY_DEVICE_SUCCESS,
} from '@modules/device/types';
import { Dispatch, Reducer } from 'redux';
import errorOnSnack from '@utils/errorOnSnack';
import { displaySnackMessage } from '../snack';

import { Action, ErrorObject } from '../../../types/shared.interfaces';

/**
 * Add a new device request
 * @returns {AddDeviceActionRequest}
 */
export const addDeviceRequest = (): AddDeviceActionRequest => ({
	type: ADD_DEVICE_REQUEST,
	isLoading: true,
});

/**
 * Add new device success
 * @param {NewDevice} device
 * @returns {AddDeviceActionSuccess}
 */
export const addDeviceSuccess = (
	device: NewDevice,
): AddDeviceActionSuccess => ({
	device,
	type: ADD_DEVICE_SUCCESS,
	isLoading: false,
});

/**
 * Add new schedule failure
 * @returns {AddSchedulesActionFailure}
 */
export const addDeviceFailure = (errors: any): AddDeviceActionFailure => ({
	errors,
	type: ADD_DEVICE_FAILURE,
	isLoading: false,
});

/**
 * Add a new device request
 * @returns {UserVerifyDeviceActionRequest}
 */
export const verifyDeviceRequest = (): UserVerifyDeviceActionRequest => ({
	type: USER_VERIFY_DEVICE_REQUEST,
	isLoading: true,
});

/**
 * Add new device success
 * @returns {AddDeviceActionSuccess}
 * @param id
 */
export const verifyDeviceSuccess = (
	id: VerifyDevice,
): UserVerifyDeviceActionSuccess => ({
	id,
	type: USER_VERIFY_DEVICE_SUCCESS,
	isLoading: false,
});

/**
 * Add new schedule failure
 * @returns {UserVerifyDeviceActionFailure}
 */
export const verifyDeviceFailure = (
	errors: any,
): UserVerifyDeviceActionFailure => ({
	errors,
	type: USER_VERIFY_DEVICE_FAILURE,
	isLoading: false,
});

/**
 * Activate device request
 * @returns {UserVerifyDeviceActionRequest}
 */
export const activateDeviceRequest = (): ActivateDeviceActionRequest => ({
	type: ACTIVATE_DEVICE_REQUEST,
	isLoading: true,
});

/**
 * Activate device success
 * @returns {AddDeviceActionSuccess}
 * @param activeDevice
 */
export const activateDeviceSuccess = (
	activeDevice: ActivateDevice,
): ActivateDeviceActionSuccess => ({
	activeDevice,
	type: ACTIVATE_DEVICE_SUCCESS,
	isLoading: false,
});

/**
 * Activate device failure
 * @returns {ActivateDeviceActionFailure}
 */
export const activateDeviceFailure = (
	errors: ErrorObject,
): ActivateDeviceActionFailure => ({
	errors,
	type: ACTIVATE_DEVICE_FAILURE,
	isLoading: false,
});

/**
 * Get all devices request
 * @returns {GetAllDevicesActionRequest}
 */
export const getDevicesRequest = (): GetAllDevicesActionRequest => ({
	type: GET_DEVICES_REQUEST,
	isLoading: true,
});

/**
 * Get all devices success
 * @returns {GetAllDevicesActionSuccess}
 * @param devices
 */
export const getDevicesSuccess = (
	devices: Device[],
): GetAllDevicesActionSuccess => ({
	devices,
	type: GET_DEVICES_SUCCESS,
	isLoading: false,
});

/**
 * Get all devices failure
 * @returns {GetAllDevicesActionFailure}
 */
export const getDevicesFailure = (
	errors: any,
): GetAllDevicesActionFailure => ({
	errors,
	type: GET_DEVICES_FAILURE,
	isLoading: false,
});

/**
 * Delete single device request
 * @returns {DeleteDeviceActionRequest}
 */
export const deleteSingleDeviceRequest = (): DeleteDeviceActionRequest => ({
	type: DELETE_DEVICE_REQUEST,
	isLoading: true,
});

/**
 * Delete single device success
 * @returns {DeleteDeviceActionSuccess}
 * @param id
 */
export const deleteSingleDeviceSuccess = (
	id: string,
): DeleteDeviceActionSuccess => ({
	id,
	type: DELETE_DEVICE_SUCCESS,
	isLoading: false,
});

/**
 * Delete single schedule failure
 * @returns {DeleteScheduleActionFailure}
 */
export const deleteSingleDeviceFailure = (
	errors: any,
): DeleteDeviceActionFailure => ({
	errors,
	type: DELETE_DEVICE_FAILURE,
	isLoading: false,
});

/**
 * Edit a device request
 * @returns {EditDeviceActionRequest}
 */
export const editDeviceRequest = (): EditDeviceActionRequest => ({
	type: EDIT_DEVICE_REQUEST,
	isLoading: true,
});

/**
 * Edit device success
 * @param id
 * @param device
 * @returns {EditDeviceActionSuccess}
 */
export const editDeviceSuccess = (
	id: string,
	device: { id: string },
): EditDeviceActionSuccess => ({
	id,
	device,
	isLoading: false,
	type: EDIT_DEVICE_SUCCESS,
});

/**
 * Add edit device failure
 *
 * @returns {EditDeviceActionFailure}
 */
export const editDeviceFailure = (errors: any): EditDeviceActionFailure => ({
	errors,
	type: EDIT_DEVICE_FAILURE,
	isLoading: false,
});

/**
 * Thunk action creator
 * Add a new device
 * @returns {Function} action type and payload
 */
export const addNewDevice =
	(device: { id: string }) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			post: (
				arg0: string,
				arg1: { id: string },
			) => Promise<{ data: { data: NewDevice; message: string } }>;
		},
	) => {
		dispatch(addDeviceRequest());
		return http
			.post('devices', device)
			.then((response: { data: { data: NewDevice; message: string } }) => {
				const {
					data: { data, message },
				} = response;
				dispatch(addDeviceSuccess(data));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'adding new device');
				dispatch(addDeviceFailure(error));
			});
	};

export const verifyUserDevice =
	(device: { id: string }) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			post: (
				arg0: string,
				arg1: { id: string },
			) => Promise<{ data: { data: VerifyDevice; message: string } }>;
		},
	) => {
		dispatch(verifyDeviceRequest());
		return http
			.post('my-device', device)
			.then((response: { data: { data: VerifyDevice; message: string } }) => {
				const {
					data: { data, message },
				} = response;
				dispatch(verifyDeviceSuccess(data));
				dispatch(displaySnackMessage(message));
				// window.location.replace('/dashboard');
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'verifying device');
				dispatch(verifyDeviceFailure(error));
			});
	};

export const activateDevice =
	(id: string) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			put: (
				arg0: string,
				arg1: { id: string },
			) => Promise<{ data: { data: ActivateDevice; message: string } }>;
		},
	) => {
		dispatch(activateDeviceRequest());
		return http
			.put('active-device', { id })
			.then(
				(response: { data: { data: ActivateDevice; message: string } }) => {
					const {
						data: { data, message },
					} = response;
					dispatch(activateDeviceSuccess(data));
					dispatch(displaySnackMessage(message));
				},
			)
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'activating your device');
				dispatch(activateDeviceFailure(error));
			});
	};

export const getAllDevices =
	() =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			get: (
				arg0: string,
				arg1: { signal: AbortSignal },
			) => Promise<{ data: { data: Device[] } }>;
		},
	) => {
		dispatch(getDevicesRequest());
		const abortController = new AbortController();
		const { signal } = abortController;
		return http
			.get('devices', { signal })
			.then((response: { data: { data: Device[] } }) => {
				const {
					data: { data },
				} = response;
				dispatch(getDevicesSuccess(data));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'getting devices');
				dispatch(getDevicesFailure(error));
			});
	};

export const editDevice =
	(id: string, device: any) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			patch: (
				arg0: string,
				arg1: any,
			) => Promise<{ data: { data: { id: string }; message: string } }>;
		},
	) => {
		dispatch(editDeviceRequest());
		return http
			.patch(`devices/${id}`, device)
			.then(
				(response: { data: { data: { id: string }; message: string } }) => {
					const {
						data: { data, message },
					} = response;
					dispatch(editDeviceSuccess(id, data));
					dispatch(displaySnackMessage(message));
				},
			)
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'editing device');
				dispatch(editDeviceFailure(error));
			});
	};

export const deleteDevice =
	(id: string) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: { delete: (arg0: string) => Promise<{ data: { message: string } }> },
	) => {
		dispatch(deleteSingleDeviceRequest());
		return http
			.delete(`devices/${id}`)
			.then((response: { data: { message: string } }) => {
				const {
					data: { message },
				} = response;
				dispatch(deleteSingleDeviceSuccess(id));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'deleting device');
				dispatch(deleteSingleDeviceFailure(error));
			});
	};

export const deviceInitialState = {
	isLoading: false,
	errors: null,
	activeDevice: {},
	devices: [],
};

export const reducer: Reducer<State, Action> = (
	state: State = deviceInitialState,
	action: Action,
) => {
	switch (action.type) {
		case GET_DEVICES_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case GET_DEVICES_SUCCESS:
			return {
				...state,
				devices: action.devices,
				isLoading: action.isLoading,
				errors: null,
			};
		case GET_DEVICES_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case ADD_DEVICE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case ADD_DEVICE_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				devices: [...state.devices, action.device],
				errors: null,
			};
		case ADD_DEVICE_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case USER_VERIFY_DEVICE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case USER_VERIFY_DEVICE_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				data: [action.device, ...state.devices],
				errors: null,
			};
		case USER_VERIFY_DEVICE_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case ACTIVATE_DEVICE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case ACTIVATE_DEVICE_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				activeDevice: action.activeDevice,
				errors: null,
			};
		case ACTIVATE_DEVICE_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case DELETE_DEVICE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case DELETE_DEVICE_SUCCESS:
			return {
				...state,
				devices: [...state.devices].filter(
					(device) => action.id !== device._id,
				),
				isLoading: action.isLoading,
				errors: null,
			};
		case DELETE_DEVICE_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case EDIT_DEVICE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case EDIT_DEVICE_SUCCESS:
			return {
				...state,
				devices: [...state.devices].map((device) =>
					device._id === action.device._id
						? {
								...device,
								...action.device,
						  }
						: device,
				),
				isLoading: action.isLoading,
				errors: null,
			};
		case EDIT_DEVICE_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		default:
			return state;
	}
};

export default reducer;
