import {
	ChartDataTrend,
	GetAirTemperatureDataFailure,
	GetAirTemperatureDataRequest,
	GetAirTemperatureDataSuccess,
	GetPlantHumidityDataFailure,
	GetPlantHumidityDataRequest,
	GetPlantHumidityDataSuccess,
	GetSensorDataFailure,
	GetSensorDataRequest,
	GetSensorDataSuccess,
	GetWaterTemperatureDataFailure,
	GetWaterTemperatureDataRequest,
	GetWaterTemperatureDataSuccess,
	SensorData,
} from '@modules/sensorData/interfaces';

import {
	GET_AIR_TEMPERATURE_TREND_FAILURE,
	GET_AIR_TEMPERATURE_TREND_REQUEST,
	GET_AIR_TEMPERATURE_TREND_SUCCESS,
	GET_PLANT_HUMIDITY_TREND_FAILURE,
	GET_PLANT_HUMIDITY_TREND_REQUEST,
	GET_PLANT_HUMIDITY_TREND_SUCCESS,
	GET_SENSOR_DATA_FAILURE,
	GET_SENSOR_DATA_REQUEST,
	GET_SENSOR_DATA_SUCCESS,
	GET_WATER_TEMPERATURE_TREND_FAILURE,
	GET_WATER_TEMPERATURE_TREND_REQUEST,
	GET_WATER_TEMPERATURE_TREND_SUCCESS,
	State,
} from '@modules/sensorData/types';

import { Action, AnyAction, Dispatch, Reducer } from 'redux';
import generateUrlWithQuery from '@utils/generateUrlWithQuery';
import influxHttp from '@utils/influxHttp';
import { ErrorObject, QueryParams } from '../../../types/shared.interfaces';

/**
 * Get air temperature trend request
 * @returns {GetAirTemperatureDataRequest}
 */
export const getSensorDataRequest = (): GetSensorDataRequest => ({
	type: GET_SENSOR_DATA_REQUEST,
	isLoading: true,
});

/**
 * Get sensor data success
 * @param {SensorData} sensorData
 * @returns {GetAirTemperatureDataRequest}
 */
export const getSensorDataSuccess = (
	sensorData: SensorData,
): GetSensorDataSuccess => ({
	sensorData,
	type: GET_SENSOR_DATA_SUCCESS,
	isLoading: false,
});

/**
 * Get sensor data failure
 * @param {ErrorObject} errors
 * @returns {GetSensorDataFailure}
 */
export const getSensorDataFailure = (
	errors: ErrorObject,
): GetSensorDataFailure => ({
	errors,
	type: GET_SENSOR_DATA_FAILURE,
	isLoading: false,
});

/**
 * Get air temperature trend request
 * @returns {GetAirTemperatureDataRequest}
 */
export const getAirTemperatureTrendRequest =
	(): GetAirTemperatureDataRequest => ({
		type: GET_AIR_TEMPERATURE_TREND_REQUEST,
		isLoading: true,
	});

/**
 * Get air temperature trend success
 * @param {ChartDataTrend} airTemperatureTrend
 * @returns {GetAirTemperatureDataSuccess}
 */
export const getAirTemperatureTrendSuccess = (
	airTemperatureTrend: ChartDataTrend[],
): GetAirTemperatureDataSuccess => ({
	airTemperatureTrend,
	type: GET_AIR_TEMPERATURE_TREND_SUCCESS,
	isLoading: false,
});

/**
 * Get air temperature trend failure
 * @param {ErrorObject} errors
 * @returns {GetAirTemperatureDataFailure}
 */
export const getAirTemperatureTrendFailure = (
	errors: ErrorObject,
): GetAirTemperatureDataFailure => ({
	errors,
	type: GET_AIR_TEMPERATURE_TREND_FAILURE,
	isLoading: false,
});

/**
 * Get water temperature trend request
 * @returns {GetWaterTemperatureDataRequest}
 */
export const getWaterTemperatureTrendRequest =
	(): GetWaterTemperatureDataRequest => ({
		type: GET_WATER_TEMPERATURE_TREND_REQUEST,
		isLoading: true,
	});

/**
 * Get water temperature trend success
 * @param {ChartDataTrend} waterTemperatureTrend
 * @returns {GetWaterTemperatureDataSuccess}
 */
export const getWaterTemperatureTrendSuccess = (
	waterTemperatureTrend: ChartDataTrend[],
): GetWaterTemperatureDataSuccess => ({
	waterTemperatureTrend,
	type: GET_WATER_TEMPERATURE_TREND_SUCCESS,
	isLoading: false,
});

/**
 * Get water temperature trend failure
 * @param {ErrorObject} errors
 * @returns {GetAirTemperatureDataFailure}
 */
export const getWaterTemperatureTrendFailure = (
	errors: ErrorObject,
): GetWaterTemperatureDataFailure => ({
	errors,
	type: GET_WATER_TEMPERATURE_TREND_FAILURE,
	isLoading: false,
});

/**
 * Get plant humidity trend request
 * @returns {GetPlantHumidityDataRequest}
 */
export const getPlantHumidityTrendRequest =
	(): GetPlantHumidityDataRequest => ({
		type: GET_PLANT_HUMIDITY_TREND_REQUEST,
		isLoading: true,
	});

/**
 * Get plant humidity trend success
 * @param {ChartDataTrend} plantHumidityTrend
 * @returns {GetPlantHumidityDataFailure}
 */
export const getPlantHumidityTrendSuccess = (
	plantHumidityTrend: ChartDataTrend[],
): GetPlantHumidityDataSuccess => ({
	plantHumidityTrend,
	type: GET_PLANT_HUMIDITY_TREND_SUCCESS,
	isLoading: false,
});

/**
 * Get plant humidity trend failure
 * @param {ErrorObject} errors
 * @returns {GetPlantHumidityDataFailure}
 */
export const getPlantHumidityTrendFailure = (
	errors: ErrorObject,
): GetPlantHumidityDataFailure => ({
	errors,
	type: GET_PLANT_HUMIDITY_TREND_FAILURE,
	isLoading: false,
});

/**
 * Add new schedule success
 * @param {SensorData} data
 * @returns {GetSensorDataSuccess}
 */
export const getSensorDataFromMqtt = (
	data: SensorData,
): GetSensorDataSuccess => getSensorDataSuccess(data);

export const getSensorDataFromInflux = () => (dispatch: Dispatch) => {
	dispatch(getSensorDataRequest());
	return influxHttp
		.get('/sensor-data')
		.then((response) => {
			const {
				data: { data },
			} = response;
			dispatch(getSensorDataSuccess(data));
		})
		.catch((error) => {
			// dispatch(displaySnackMessage('Error fetching sensor data', 'error'));
			dispatch(getSensorDataFailure(error));
		});
};

export const getAirTemperatureTrend =
	(queryParams: QueryParams) => (dispatch: Dispatch) => {
		dispatch(getAirTemperatureTrendRequest());
		const endpoint = generateUrlWithQuery('/range-data', {
			...queryParams,
		});
		return influxHttp
			.get(endpoint)
			.then((response) => {
				const {
					data: { data },
				} = response;
				dispatch(
					getAirTemperatureTrendSuccess(
						// @ts-expect-error yes
						data?.map((element) => ({
							x: element._time,
							y: element._value,
						})) ?? [],
					),
				);
			})
			.catch((error) => {
				// dispatch(
				// 	displaySnackMessage('Error fetching air temperature data', 'error'),
				// );
				dispatch(getAirTemperatureTrendFailure(error));
			});
	};

export const getWaterTemperatureTrend =
	(queryParams: QueryParams) => (dispatch: Dispatch) => {
		dispatch(getWaterTemperatureTrendRequest());
		const endpoint = generateUrlWithQuery('/range-data', {
			...queryParams,
		});
		return influxHttp
			.get(endpoint)
			.then((response) => {
				const {
					data: { data },
				} = response;
				dispatch(getWaterTemperatureTrendSuccess(data));
			})
			.catch((error) => {
				// dispatch(displaySnackMessage('Error fetching water temperature data'));
				dispatch(getWaterTemperatureTrendFailure(error));
			});
	};

export const getPlantHumidityTrend =
	(queryParams: QueryParams) => (dispatch: Dispatch) => {
		dispatch(getPlantHumidityTrendRequest());
		const endpoint = generateUrlWithQuery('/range-data', {
			...queryParams,
		});
		return influxHttp
			.get(endpoint)
			.then((response) => {
				const {
					data: { data },
				} = response;
				dispatch(getPlantHumidityTrendSuccess(data));
			})
			.catch((error) => {
				// dispatch(
				// 	displaySnackMessage('Error fetching plant humidity data', 'error'),
				// );
				dispatch(getPlantHumidityTrendFailure(error));
			});
	};

export const sensorDataInitialState = {
	sensorData: {
		humidity: 0,
		temperature: 0,
		waterLevel: 0,
	},
	airTemperatureTrend: [],
	waterTemperatureTrend: [],
	plantHumidityTrend: [],
	isLoading: false,
	errors: null,
};

export const reducer: Reducer<State, Action> = (
	state: State = sensorDataInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case GET_SENSOR_DATA_SUCCESS:
			return {
				...state,
				sensorData: { ...state.sensorData, ...action.sensorData },
				errors: null,
			};
		case GET_SENSOR_DATA_FAILURE:
			return {
				...state,
				errors: action.errors,
			};
		case GET_AIR_TEMPERATURE_TREND_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case GET_AIR_TEMPERATURE_TREND_SUCCESS:
			return {
				...state,
				airTemperatureTrend: action.airTemperatureTrend,
				isLoading: action.isLoading,
				errors: null,
			};
		case GET_AIR_TEMPERATURE_TREND_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case GET_WATER_TEMPERATURE_TREND_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case GET_WATER_TEMPERATURE_TREND_SUCCESS:
			return {
				...state,
				waterTemperatureTrend: action.waterTemperatureTrend,
				isLoading: action.isLoading,
				errors: null,
			};
		case GET_WATER_TEMPERATURE_TREND_FAILURE:
			return {
				...state,
				errors: action.errors,
				isLoading: action.isLoading,
			};
		case GET_PLANT_HUMIDITY_TREND_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case GET_PLANT_HUMIDITY_TREND_SUCCESS:
			return {
				...state,
				plantHumidityTrend: action.plantHumidityTrend,
				isLoading: action.isLoading,
				errors: null,
			};
		case GET_PLANT_HUMIDITY_TREND_FAILURE:
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
