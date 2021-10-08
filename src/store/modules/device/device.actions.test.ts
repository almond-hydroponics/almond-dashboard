// types
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
	USER_VERIFY_DEVICE_FAILURE,
	USER_VERIFY_DEVICE_REQUEST,
	USER_VERIFY_DEVICE_SUCCESS,
} from '@modules/device/types';
import { DISPLAY_SNACK_MESSAGE } from '@modules/snack/types';

// fixtures
import {
	devices,
	deviceIdPayload,
	id,
	activateDevicePayload,
	addOrEditDeviceResponse,
} from '@modules/device/fixtures';
// helper functions
import {
	axiosMock,
	dispatchMethodMock,
	reduxMockStore,
} from '../../../testHelpers';
// thunks
import {
	activateDevice,
	addNewDevice,
	deleteDevice,
	deviceInitialState,
	editDevice,
	getAllDevices,
	verifyUserDevice,
} from './index';

describe('Device module actions', () => {
	describe('Add new device thunk', () => {
		it('should create and return a new device', () => {
			const mockResponse = {
				data: {
					data: addOrEditDeviceResponse.data,
					message: 'Device added successfully',
				},
			};
			const expectedActions = [
				{
					type: ADD_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					device: mockResponse.data.data,
					type: ADD_DEVICE_SUCCESS,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock('/devices', mockResponse);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(
				store,
				addNewDevice(deviceIdPayload),
				expectedActions,
			);
		});

		it('should return an error message when it fails to create a new device', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on creating a device',
					},
				},
			};
			const expectedActions = [
				{
					type: ADD_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					snack: {
						message: mockErrorResponse.response.data.message,
						severity: 'error',
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
				{
					errors: {
						response: {
							data: {
								message: mockErrorResponse.response.data.message,
							},
						},
					},
					type: ADD_DEVICE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/devices', mockErrorResponse, false);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(
				store,
				addNewDevice(deviceIdPayload),
				expectedActions,
			);
		});
	});

	describe('Verify user device thunk', () => {
		it('should verify the user device', () => {
			const mockResponse = {
				data: {
					data: '5dfa0dcd53890575b993eb74',
					message: 'Devices verified successfully',
				},
			};
			const expectedActions = [
				{
					type: USER_VERIFY_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					type: USER_VERIFY_DEVICE_SUCCESS,
					isLoading: false,
					id: '5dfa0dcd53890575b993eb74',
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock('/my-device', mockResponse);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(
				store,
				verifyUserDevice({ id }),
				expectedActions,
			);
		});

		it('should return an error message when it fails to verify a device', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on verifying a device',
					},
				},
			};
			const expectedActions = [
				{
					type: USER_VERIFY_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					snack: {
						message: mockErrorResponse.response.data.message,
						severity: 'error',
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
				{
					errors: {
						response: {
							data: {
								message: mockErrorResponse.response.data.message,
							},
						},
					},
					type: USER_VERIFY_DEVICE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/my-device', mockErrorResponse, false);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(
				store,
				verifyUserDevice({ id }),
				expectedActions,
			);
		});
	});

	describe('Activate device thunk', () => {
		it('should activate a user device', () => {
			const mockResponse = {
				data: {
					data: activateDevicePayload,
					message: 'Device activated successfully',
				},
			};
			const expectedActions = [
				{
					type: ACTIVATE_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					activeDevice: mockResponse.data.data,
					type: ACTIVATE_DEVICE_SUCCESS,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock('/active-device', mockResponse);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(store, activateDevice(id), expectedActions);
		});

		it('should return an error message when it fails to activate a user device', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on activating a device',
					},
				},
			};
			const expectedActions = [
				{
					type: ACTIVATE_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					snack: {
						message: mockErrorResponse.response.data.message,
						severity: 'error',
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
				{
					errors: {
						response: {
							data: {
								message: mockErrorResponse.response.data.message,
							},
						},
					},
					type: ACTIVATE_DEVICE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/active-device', mockErrorResponse, false);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(store, activateDevice(id), expectedActions);
		});
	});

	describe('Get all devices thunk', () => {
		it('should fetch and return all devices', () => {
			const mockResponse = {
				data: {
					data: devices.data,
					message: 'Devices fetched successfully',
				},
			};
			const expectedActions = [
				{
					type: GET_DEVICES_REQUEST,
					isLoading: true,
				},
				{
					devices: devices.data,
					type: GET_DEVICES_SUCCESS,
					isLoading: false,
				},
			];
			const http = axiosMock('/devices', mockResponse);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(store, getAllDevices(), expectedActions);
		});

		it('should return an error message when it fails to fetch and return all devices', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on fetching all devices',
					},
				},
			};
			const expectedActions = [
				{
					type: GET_DEVICES_REQUEST,
					isLoading: true,
				},
				{
					snack: {
						message: mockErrorResponse.response.data.message,
						severity: 'error',
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
				{
					errors: {
						response: {
							data: {
								message: mockErrorResponse.response.data.message,
							},
						},
					},
					type: GET_DEVICES_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/devices', mockErrorResponse, false);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(store, getAllDevices(), expectedActions);
		});
	});

	describe('Edit device thunk', () => {
		it('should edit and return a device', () => {
			const mockResponse = {
				data: {
					data: addOrEditDeviceResponse.data,
					message: 'Device edited successfully',
				},
			};
			const expectedActions = [
				{
					type: EDIT_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					id,
					device: mockResponse.data.data,
					type: EDIT_DEVICE_SUCCESS,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock(`devices/${id}`, mockResponse);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(
				store,
				editDevice(id, deviceIdPayload),
				expectedActions,
			);
		});

		it('should return an error message when it fails to edit a device', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on editing a device',
					},
				},
			};
			const expectedActions = [
				{
					type: EDIT_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					snack: {
						message: mockErrorResponse.response.data.message,
						severity: 'error',
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
				{
					errors: {
						response: {
							data: {
								message: mockErrorResponse.response.data.message,
							},
						},
					},
					type: EDIT_DEVICE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`devices/${id}`, mockErrorResponse, false);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(
				store,
				editDevice(id, deviceIdPayload),
				expectedActions,
			);
		});
	});

	describe('Delete device thunk', () => {
		it('should delete a device', () => {
			const mockResponse = {
				data: {
					message: 'Devices fetched successfully',
				},
			};
			const expectedActions = [
				{
					type: DELETE_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					type: DELETE_DEVICE_SUCCESS,
					isLoading: false,
					id,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock(`devices/${id}`, mockResponse);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(store, deleteDevice(id), expectedActions);
		});

		it('should return an error message when it fails to delete a device', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on deleting a device',
					},
				},
			};
			const expectedActions = [
				{
					type: DELETE_DEVICE_REQUEST,
					isLoading: true,
				},
				{
					snack: {
						message: mockErrorResponse.response.data.message,
						severity: 'error',
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
				{
					errors: {
						response: {
							data: {
								message: mockErrorResponse.response.data.message,
							},
						},
					},
					type: DELETE_DEVICE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`devices/${id}`, mockErrorResponse, false);
			const store = reduxMockStore(http, deviceInitialState);

			return dispatchMethodMock(store, deleteDevice(id), expectedActions);
		});
	});
});
