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
} from '@modules/sensorData/types';
import { ErrorObject } from '../../../types/shared.interfaces';

export interface GetSensorDataRequest {
	type: GET_SENSOR_DATA_REQUEST;
	isLoading: boolean;
}

export interface GetSensorDataSuccess {
	type: GET_SENSOR_DATA_SUCCESS;
	sensorData: SensorData;
	isLoading: boolean;
}

export interface GetSensorDataFailure {
	type: GET_SENSOR_DATA_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface GetAirTemperatureDataRequest {
	type: GET_AIR_TEMPERATURE_TREND_REQUEST;
	isLoading: boolean;
}

export interface GetAirTemperatureDataSuccess {
	type: GET_AIR_TEMPERATURE_TREND_SUCCESS;
	airTemperatureTrend: ChartDataTrend[];
	isLoading: boolean;
}

export interface GetAirTemperatureDataFailure {
	type: GET_AIR_TEMPERATURE_TREND_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface GetWaterTemperatureDataRequest {
	type: GET_WATER_TEMPERATURE_TREND_REQUEST;
	isLoading: boolean;
}

export interface GetWaterTemperatureDataSuccess {
	type: GET_WATER_TEMPERATURE_TREND_SUCCESS;
	waterTemperatureTrend: ChartDataTrend[];
	isLoading: boolean;
}

export interface GetWaterTemperatureDataFailure {
	type: GET_WATER_TEMPERATURE_TREND_FAILURE;
	errors: ErrorObject | null;
	isLoading: boolean;
}

export interface GetPlantHumidityDataRequest {
	type: GET_PLANT_HUMIDITY_TREND_REQUEST;
	isLoading: boolean;
}

export interface GetPlantHumidityDataSuccess {
	type: GET_PLANT_HUMIDITY_TREND_SUCCESS;
	plantHumidityTrend: ChartDataTrend[];
	isLoading: boolean;
}

export interface GetPlantHumidityDataFailure {
	type: GET_PLANT_HUMIDITY_TREND_FAILURE;
	errors: ErrorObject;
	isLoading: boolean;
}

export interface SensorData {
	humidity: number;
	temperature: number;
	waterLevel: number;
}

export interface ChartDataTrend {
	time: string;
	value: string | number;
}
