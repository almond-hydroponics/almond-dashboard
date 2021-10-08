import {
	GET_ADMIN_STATS_FAILURE,
	GET_ADMIN_STATS_REQUEST,
	GET_ADMIN_STATS_SUCCESS,
} from '@modules/analytics/types';
import { ErrorObject } from '../../../types/shared.interfaces';

export interface GetAdminStatsRequest {
	type: GET_ADMIN_STATS_REQUEST;
	isLoading: boolean;
}

export interface GetAdminStatsSuccess {
	type: GET_ADMIN_STATS_SUCCESS;
	isLoading: boolean;
	data: StatsData;
}

export interface GetAdminStatsFailure {
	type: GET_ADMIN_STATS_FAILURE;
	isLoading: boolean;
	errors: ErrorObject | null;
}

export interface StatsData {
	devices: number;
	users: number;
}
