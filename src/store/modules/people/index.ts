// third party libraries
import { UserDetails } from '@modules/user/interfaces';
import { AnyAction, Dispatch } from 'redux';
// thunk action creators
import errorOnSnack from '@utils/errorOnSnack';
import { displaySnackMessage } from '../snack';
// interfaces
import {
	GetAllPeopleActionFailure,
	GetAllPeopleActionRequest,
	GetAllPeopleActionSuccess,
	UpdatePersonFailure,
	UpdatePersonRequest,
	UpdatePersonSuccess,
} from './interfaces';
// types
import {
	GET_ALL_PEOPLE_FAILURE,
	GET_ALL_PEOPLE_REQUEST,
	GET_ALL_PEOPLE_SUCCESS,
	State,
	UPDATE_PERSON_DETAILS_FAILURE,
	UPDATE_PERSON_DETAILS_REQUEST,
	UPDATE_PERSON_DETAILS_SUCCESS,
} from './types';

import { ErrorObject } from '../../../types/shared.interfaces';

/**
 * Get userDetails request action creator
 * @returns {GetAllPeopleActionRequest}
 */
export const getAllPeopleRequest = (): GetAllPeopleActionRequest => ({
	isLoading: true,
	type: GET_ALL_PEOPLE_REQUEST,
});

/**
 * Get userDetails success action creator
 * @returns {GetAllPeopleActionSuccess}
 */
export const getAllPeopleSuccess = (
	people: UserDetails[],
): GetAllPeopleActionSuccess => ({
	people,
	isLoading: false,
	type: GET_ALL_PEOPLE_SUCCESS,
});

/**
 * Get all users action creator
 * @returns {GetAllPeopleActionFailure}
 */
export const getAllPeopleFailure = (
	errors: ErrorObject,
): GetAllPeopleActionFailure => ({
	errors,
	isLoading: false,
	type: GET_ALL_PEOPLE_FAILURE,
});

export const updatePersonRequest = (): UpdatePersonRequest => ({
	isLoading: true,
	type: UPDATE_PERSON_DETAILS_REQUEST,
});

/**
 * Update user details
 * @returns {UpdatePersonSuccess}
 */
export const updatePersonSuccess = (
	person: UserDetails,
): UpdatePersonSuccess => ({
	person,
	isLoading: false,
	type: UPDATE_PERSON_DETAILS_SUCCESS,
});

export const updatePersonFailure = (
	errors: ErrorObject,
): UpdatePersonFailure => ({
	errors,
	isLoading: false,
	type: UPDATE_PERSON_DETAILS_FAILURE,
});

export const getAllPeople =
	() =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			get: (arg0: string) => Promise<{ data: { data: UserDetails[] } }>;
		},
	) => {
		dispatch(getAllPeopleRequest());
		return http
			.get('people')
			.then((response: { data: { data: UserDetails[] } }) => {
				dispatch(getAllPeopleSuccess(response.data.data));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(
					error,
					dispatch,
					'fetch your all users. Kindly reload the page.',
				);
				dispatch(getAllPeopleFailure(error));
			});
	};

/**
 * Update user details
 * @returns {Function}
 * @param personId
 * @param personDetails
 */
export const updatePerson =
	(personId: string, personDetails: any) =>
	(
		dispatch: Dispatch,
		getState: any,
		http: {
			put: (
				arg0: string,
				arg1: any,
			) => Promise<{ data: { data: UserDetails; message: string } }>;
		},
	) => {
		dispatch(updatePersonRequest());
		return http
			.put(`people/${personId}`, personDetails)
			.then((response: { data: { data: UserDetails; message: string } }) => {
				const {
					data: { data, message },
				} = response;
				dispatch(updatePersonSuccess(data));
				dispatch(displaySnackMessage(message));
			})
			.catch((error: ErrorObject) => {
				errorOnSnack(error, dispatch, 'updating a user details');
				dispatch(updatePersonFailure(error));
			});
	};

export const peopleInitialState = {
	people: [],
	errors: null,
	isLoading: false,
};

/**
 * Updates the user state in the application
 * @param {Object} state
 * @param {AnyAction} action
 * @returns {Object} state
 */
export const reducer = (
	state: State = peopleInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case GET_ALL_PEOPLE_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case GET_ALL_PEOPLE_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				people: action.people,
				errors: null,
			};
		case GET_ALL_PEOPLE_FAILURE:
			return {
				...state,
				isLoading: action.isLoading,
				errors: action.errors,
			};
		case UPDATE_PERSON_DETAILS_REQUEST:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case UPDATE_PERSON_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: action.isLoading,
				people: [...state.people].map((person) =>
					person._id === action.person._id
						? {
								...person,
								...action.person,
						  }
						: person,
				),
				errors: null,
			};
		case UPDATE_PERSON_DETAILS_FAILURE:
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
