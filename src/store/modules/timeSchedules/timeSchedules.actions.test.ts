// thunks
import {
	addNewSchedule,
	deleteSingleSchedule,
	editSchedule,
	getAllSchedules,
	getPumpStatus,
	schedulesInitialState,
	togglePump,
	toggleScheduleStatus,
} from '@modules/timeSchedules/index';

// types
import {
	GET_SCHEDULES_REQUEST,
	GET_SCHEDULES_SUCCESS,
	GET_SCHEDULES_FAILURE,
	ADD_SCHEDULES_REQUEST,
	ADD_SCHEDULES_SUCCESS,
	ADD_SCHEDULES_FAILURE,
	DELETE_SCHEDULE_REQUEST,
	DELETE_SCHEDULE_SUCCESS,
	DELETE_SCHEDULE_FAILURE,
	EDIT_SCHEDULE_SUCCESS,
	EDIT_SCHEDULE_REQUEST,
	EDIT_SCHEDULE_FAILURE,
	TOGGLE_PUMP_STATUS_REQUEST,
	TOGGLE_PUMP_STATUS_SUCCESS,
	TOGGLE_PUMP_STATUS_FAILURE,
	GET_PUMP_STATUS_REQUEST,
	GET_PUMP_STATUS_SUCCESS,
	GET_PUMP_STATUS_FAILURE,
} from '@modules/timeSchedules/types';
import { DISPLAY_SNACK_MESSAGE } from '@modules/snack/types';
import { LOG_ACTIVITY } from '@modules/activityLogs/types';

// helpers

// fixtures
import {
	editSchedulePayload,
	enabledStatus,
	schedulePayload,
	timeSchedules,
} from '@modules/timeSchedules/fixtures';
import { activityHistory } from '@modules/activityLogs/fixtures';
import {
	axiosMock,
	dispatchMethodMock,
	reduxMockStore,
} from '../../../testHelpers';

describe('Time schedules module actions', () => {
	const deviceId = '5ede17f7184ccf003a2da68f';
	const id = timeSchedules.data[0]._id;

	describe('Get schedules thunk', () => {
		it('should fetch and return schedules', () => {
			const mockResponse = {
				data: {
					data: timeSchedules.data,
				},
			};
			const expectedActions = [
				{
					type: GET_SCHEDULES_REQUEST,
					isLoading: true,
				},
				{
					schedules: timeSchedules.data,
					type: GET_SCHEDULES_SUCCESS,
					isLoading: false,
				},
			];
			const http = axiosMock(`/schedules?device=${deviceId}`, mockResponse);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				getAllSchedules(deviceId),
				expectedActions,
			);
		});

		it('should return an error message when it fails to fetch time schedules', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on fetching schedules',
					},
				},
			};
			const expectedActions = [
				{
					type: GET_SCHEDULES_REQUEST,
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
					type: GET_SCHEDULES_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(
				`/schedules?device=${deviceId}`,
				mockErrorResponse,
				false,
			);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				getAllSchedules(deviceId),
				expectedActions,
			);
		});
	});

	describe('Create new schedule thunk', () => {
		it('should create and return a new schedule', () => {
			const mockResponse = {
				data: {
					data: timeSchedules.data[0],
					message: 'Schedule added successfully',
				},
			};
			const expectedActions = [
				{
					type: ADD_SCHEDULES_REQUEST,
					isLoading: true,
				},
				{
					schedule: mockResponse.data.data,
					type: ADD_SCHEDULES_SUCCESS,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock('/schedules', mockResponse);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				addNewSchedule(schedulePayload),
				expectedActions,
			);
		});

		it('should return an error message when it fails to create time schedule', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on creating a schedule',
					},
				},
			};
			const expectedActions = [
				{
					type: ADD_SCHEDULES_REQUEST,
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
					type: ADD_SCHEDULES_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/schedules', mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				addNewSchedule(schedulePayload),
				expectedActions,
			);
		});

		it('should display snack error message on network error', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message:
							'An error occurred while creating your request. Please try again',
					},
				},
			};
			const expectedActions = [
				{
					type: ADD_SCHEDULES_REQUEST,
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
					type: ADD_SCHEDULES_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/schedules', mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				addNewSchedule(schedulePayload),
				expectedActions,
			);
		});
	});

	describe('Delete schedule thunk', () => {
		it('should delete a schedule', () => {
			const mockResponse = {
				data: {
					message: 'Schedule deleted',
				},
			};
			const expectedActions = [
				{
					type: DELETE_SCHEDULE_REQUEST,
					isLoading: true,
				},
				{
					type: DELETE_SCHEDULE_SUCCESS,
					id: timeSchedules.data[0]._id,
					isLoading: false,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock(`/schedules/${id}`, mockResponse);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				deleteSingleSchedule(id),
				expectedActions,
			);
		});

		it('should return an error message when it fails to delete a time schedule', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on deleting a schedule',
					},
				},
			};
			const expectedActions = [
				{
					type: DELETE_SCHEDULE_REQUEST,
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
					type: DELETE_SCHEDULE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`/schedules/${id}`, mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				deleteSingleSchedule(id),
				expectedActions,
			);
		});

		it('should display snack error message on network error', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message:
							'An error occurred while deleting your schedule. Please try again',
					},
				},
			};
			const expectedActions = [
				{
					type: DELETE_SCHEDULE_REQUEST,
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
					type: DELETE_SCHEDULE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`/schedules/${id}`, mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				deleteSingleSchedule(id),
				expectedActions,
			);
		});
	});

	describe('Editing a schedule thunk', () => {
		it('should edit and return the edited schedule', () => {
			const mockResponse = {
				data: {
					data: timeSchedules.data[0],
					message: 'Schedule edited successfully',
				},
			};
			const expectedActions = [
				{
					type: EDIT_SCHEDULE_REQUEST,
					isLoading: true,
				},
				{
					schedule: mockResponse.data.data,
					type: EDIT_SCHEDULE_SUCCESS,
					isLoading: false,
					id: '5ede17f7184ccf003a2da68f',
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock(`/schedules/${id}`, mockResponse);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				editSchedule(id, editSchedulePayload.schedule),
				expectedActions,
			);
		});

		it('should return an error message when it fails to edit time schedule', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on editing a schedule',
					},
				},
			};
			const expectedActions = [
				{
					type: EDIT_SCHEDULE_REQUEST,
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
					type: EDIT_SCHEDULE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`/schedules/${id}`, mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				editSchedule(id, schedulePayload),
				expectedActions,
			);
		});

		it('should display snack error message on network error', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message:
							'An error occurred while editing your schedule. Please try again',
					},
				},
			};
			const expectedActions = [
				{
					type: EDIT_SCHEDULE_REQUEST,
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
					type: EDIT_SCHEDULE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`/schedules/${id}`, mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				editSchedule(id, schedulePayload),
				expectedActions,
			);
		});
	});

	describe('Toggling a pump thunk', () => {
		it('should toggle a pump on and off', () => {
			const mockResponse = {
				data: {
					data: {
						activityHistory,
						scheduleOverride: enabledStatus,
					},
					message: 'Pump turned on successfully',
				},
			};
			const expectedActions = [
				{
					type: TOGGLE_PUMP_STATUS_REQUEST,
					isLoading: true,
				},
				{
					enabled: enabledStatus.enabled,
					type: GET_PUMP_STATUS_SUCCESS,
					isLoading: false,
				},
				{
					enabled: enabledStatus.enabled,
					type: TOGGLE_PUMP_STATUS_SUCCESS,
					isLoading: false,
				},
				{
					type: LOG_ACTIVITY,
					activityLogs: activityHistory,
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock('/pump', mockResponse);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				togglePump(enabledStatus),
				expectedActions,
			);
		});

		it('should return an error message when it fails to toggle a pump', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on toggling a pump',
					},
				},
			};
			const expectedActions = [
				{
					type: TOGGLE_PUMP_STATUS_REQUEST,
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
					type: TOGGLE_PUMP_STATUS_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/pump', mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				togglePump(enabledStatus),
				expectedActions,
			);
		});

		it('should display snack error message on network error', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message:
							'An error occurred while toggling your pump. Please try again',
					},
				},
			};
			const expectedActions = [
				{
					type: TOGGLE_PUMP_STATUS_REQUEST,
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
					type: TOGGLE_PUMP_STATUS_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock('/pump', mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				togglePump(enabledStatus),
				expectedActions,
			);
		});
	});

	describe('Get pump status thunk', () => {
		it('should fetch the status of the pump', () => {
			const mockResponse = {
				data: {
					data: {
						enabled: enabledStatus.enabled,
					},
				},
			};
			const expectedActions = [
				{
					type: GET_PUMP_STATUS_REQUEST,
					isLoading: true,
				},
				{
					enabled: enabledStatus.enabled,
					type: GET_PUMP_STATUS_SUCCESS,
					isLoading: false,
				},
			];
			const http = axiosMock(`/pump?device=${deviceId}`, mockResponse);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				getPumpStatus(deviceId),
				expectedActions,
			);
		});

		it('should display snack error message on network error', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message:
							'An error occurred while fetching pump status. Please try again',
					},
				},
			};
			const expectedActions = [
				{
					type: GET_PUMP_STATUS_REQUEST,
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
					type: GET_PUMP_STATUS_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(
				`/pump?device=${deviceId}`,
				mockErrorResponse,
				false,
			);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				getPumpStatus(deviceId),
				expectedActions,
			);
		});
	});

	describe('Toggling schedule status thunk', () => {
		it('should toggle a schedule on and off', () => {
			const mockResponse = {
				data: {
					data: timeSchedules.data[0],
					message: 'Schedule turned on successfully',
				},
			};
			const expectedActions = [
				{
					type: EDIT_SCHEDULE_REQUEST,
					isLoading: true,
				},
				{
					schedule: mockResponse.data.data,
					type: EDIT_SCHEDULE_SUCCESS,
					isLoading: false,
					id: '5ede17f7184ccf003a2da68f',
				},
				{
					snack: {
						message: mockResponse.data.message,
					},
					type: DISPLAY_SNACK_MESSAGE,
				},
			];
			const http = axiosMock(`schedules/${id}`, mockResponse);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				toggleScheduleStatus(id, enabledStatus),
				expectedActions,
			);
		});

		it('should return an error message when it fails to toggle the schedule status', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message: 'Error on toggling a schedule',
					},
				},
			};
			const expectedActions = [
				{
					type: EDIT_SCHEDULE_REQUEST,
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
					type: EDIT_SCHEDULE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`schedules/${id}`, mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				toggleScheduleStatus(id, enabledStatus),
				expectedActions,
			);
		});

		it('should display snack error message on network error', () => {
			const mockErrorResponse = {
				response: {
					data: {
						message:
							'An error occurred while toggling your pump. Please try again',
					},
				},
			};
			const expectedActions = [
				{
					type: EDIT_SCHEDULE_REQUEST,
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
					type: EDIT_SCHEDULE_FAILURE,
					isLoading: false,
				},
			];
			const http = axiosMock(`schedules/${id}`, mockErrorResponse, false);
			const store = reduxMockStore(http, schedulesInitialState);

			return dispatchMethodMock(
				store,
				toggleScheduleStatus(id, enabledStatus),
				expectedActions,
			);
		});
	});
});
