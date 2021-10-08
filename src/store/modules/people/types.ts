import { UserDetails } from '@modules/user/interfaces';

export type State = {
	people: UserDetails[];
	errors: null;
	isLoading: boolean;
};

export const GET_ALL_PEOPLE_REQUEST = 'almond/people/GET_ALL_PEOPLE_REQUEST';
export type GET_ALL_PEOPLE_REQUEST = typeof GET_ALL_PEOPLE_REQUEST;

export const GET_ALL_PEOPLE_SUCCESS = 'almond/people/GET_ALL_PEOPLE_SUCCESS';
export type GET_ALL_PEOPLE_SUCCESS = typeof GET_ALL_PEOPLE_SUCCESS;

export const GET_ALL_PEOPLE_FAILURE = 'almond/people/GET_ALL_PEOPLE_FAILURE';
export type GET_ALL_PEOPLE_FAILURE = typeof GET_ALL_PEOPLE_FAILURE;

export const UPDATE_PERSON_DETAILS_REQUEST =
	'almond/people/UPDATE_PERSON_DETAILS_REQUEST';
export type UPDATE_PERSON_DETAILS_REQUEST =
	typeof UPDATE_PERSON_DETAILS_REQUEST;

export const UPDATE_PERSON_DETAILS_SUCCESS =
	'almond/people/UPDATE_PERSON_DETAILS_SUCCESS';
export type UPDATE_PERSON_DETAILS_SUCCESS =
	typeof UPDATE_PERSON_DETAILS_SUCCESS;

export const UPDATE_PERSON_DETAILS_FAILURE =
	'almond/people/UPDATE_PERSON_DETAILS_FAILURE';
export type UPDATE_PERSON_DETAILS_FAILURE =
	typeof UPDATE_PERSON_DETAILS_FAILURE;
