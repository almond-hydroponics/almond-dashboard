import {
	getSensorDataSuccess,
	getSensorDataFailure,
	reducer,
	sensorDataInitialState,
} from '@modules/sensorData';
import { errorMessage } from '../../../testHelpers';

describe('Sensor data reducer:', () => {
	it("should return initial state if action type doesn't match", () => {
		const newState = reducer(sensorDataInitialState, { type: 'fakeRoot' });
		expect(newState).toEqual(sensorDataInitialState);
	});

	describe('Get environment data', () => {
		const responseData = {};
		it('should dispatch GET_ENVIRONMENT_DATA_SUCCESS', () => {
			const getSensorSuccessData = getSensorDataSuccess(responseData as any);
			const sensorDataState = reducer(
				sensorDataInitialState,
				getSensorSuccessData,
			);

			expect(sensorDataState.errors).toBe(null);
		});

		it('should dispatch GET_ENVIRONMENT_DATA_FAILURE', () => {
			const getSensorFailureData = getSensorDataFailure(errorMessage);
			const sensorDataState = reducer(
				sensorDataInitialState,
				getSensorFailureData,
			);

			expect(sensorDataState.errors).toBe(errorMessage);
		});
	});
});
