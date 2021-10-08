import {
	GetAdminStatsFailure,
	GetAdminStatsRequest,
	GetAdminStatsSuccess,
	StatsData,
} from '@modules/analytics/interfaces';
import {
	GET_ADMIN_STATS_FAILURE,
	GET_ADMIN_STATS_REQUEST,
	GET_ADMIN_STATS_SUCCESS,
	State,
} from '@modules/analytics/types';
import { Action, AnyAction, Dispatch, Reducer } from 'redux';
import errorOnSnack from '@utils/errorOnSnack';
import { ErrorObject } from '../../../types/shared.interfaces';

/**
 * Get admin statistics request
 * @returns {GetAdminStatsRequest}
 */
export const getAdminStatsRequest = (): GetAdminStatsRequest => ({
	type: GET_ADMIN_STATS_REQUEST,
	isLoading: true,
});

/**
 * Get admin statistics success
 * @returns {GetAdminStatsSuccess}
 */
export const getAdminStatsSuccess = (
	data: StatsData,
): GetAdminStatsSuccess => ({
	data,
	type: GET_ADMIN_STATS_SUCCESS,
	isLoading: false,
});

/**
 * Get admin statistics failure
 * @returns {GetAllDevicesActionRequest}
 */
export const getAdminStatsFailure = (
	errors: ErrorObject,
): GetAdminStatsFailure => ({
	errors,
	type: GET_ADMIN_STATS_FAILURE,
	isLoading: false,
});

export const getAdminStatistics =
	() =>
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
		dispatch(getAdminStatsRequest());
		return http
			.get('dashboard', { cache: true })
			.then((response: { data: { data: any } }) => {
				const {
					data: { data },
				} = response;
				dispatch(getAdminStatsSuccess(data));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'fetching admin statistics');
				dispatch(getAdminStatsFailure(error));
			});
	};

export const analyticsInitialState = {
	data: {
		devices: 0,
		users: 0,
	},
	isLoading: false,
	errors: null,
};

export const reducer: Reducer<State, Action> = (
	state: State = analyticsInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case GET_ADMIN_STATS_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case GET_ADMIN_STATS_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				data: action.data,
			};
		case GET_ADMIN_STATS_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		default:
			return state;
	}
};

export default reducer;
