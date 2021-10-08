import { StatsData } from '@modules/analytics/interfaces';

export type State = {
	data: StatsData;
	isLoading: boolean;
	errors: null;
};

export const GET_ADMIN_STATS_REQUEST =
	'almond/analytics/GET_ADMIN_STATS_REQUEST';
export type GET_ADMIN_STATS_REQUEST = typeof GET_ADMIN_STATS_REQUEST;

export const GET_ADMIN_STATS_SUCCESS =
	'almond/analytics/GET_ADMIN_STATS_SUCCESS';
export type GET_ADMIN_STATS_SUCCESS = typeof GET_ADMIN_STATS_SUCCESS;

export const GET_ADMIN_STATS_FAILURE =
	'almond/analytics/GET_ADMIN_STATS_FAILURE';
export type GET_ADMIN_STATS_FAILURE = typeof GET_ADMIN_STATS_FAILURE;
