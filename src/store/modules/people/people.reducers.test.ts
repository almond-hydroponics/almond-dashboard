import {
	getAllPeopleFailure,
	getAllPeopleSuccess,
	peopleInitialState,
	reducer,
	updatePersonFailure,
	updatePersonSuccess,
} from '@modules/people';
import { peopleResponse, personToUpdate } from '@modules/people/fixtures';
import { errorMessage } from '../../../testHelpers';

describe('People reducer:', () => {
	it("should return initial state if action type doesn't match", () => {
		const newState = reducer(peopleInitialState, { type: 'fakeType' });
		expect(newState).toEqual(peopleInitialState);
	});

	describe('Get people', () => {
		it('should dispatch GET_ALL_PEOPLE_SUCCESS', () => {
			const getPeopleSuccessAction = getAllPeopleSuccess(
				peopleResponse.data as any,
			);
			const peopleState = reducer(peopleInitialState, getPeopleSuccessAction);

			expect(peopleState.errors).toBe(null);
			expect(peopleState.people[0].name).toEqual('Random User');
		});

		it('should dispatch GET_ALL_PEOPLE_FAILURE', () => {
			const getPeopleFailureAction = getAllPeopleFailure(errorMessage);
			const peopleState = reducer(peopleInitialState, getPeopleFailureAction);

			expect(peopleState.errors).toBe(errorMessage);
		});
	});

	describe('Update person', () => {
		const peopleInitialState = {
			people: peopleResponse.data,
		};

		it('should dispatch UPDATE_PERSON_DETAILS_SUCCESS', () => {
			const updatePersonSuccessAction = updatePersonSuccess(
				personToUpdate as any,
			);
			const peopleState = reducer(
				peopleInitialState as any,
				updatePersonSuccessAction,
			);
			const updatedPerson = peopleState.people.find(
				(person) => person._id === personToUpdate._id,
			);

			expect(peopleState.errors).toBe(null);
			expect(updatedPerson.currentRole.title).toEqual('Test');
			expect(peopleState.people[0].name).toEqual('Random User');
		});

		it('should dispatch UPDATE_PERSON_DETAILS_FAILURE', () => {
			const updatePersonFailureAction = updatePersonFailure(errorMessage);
			const peopleState = reducer(
				peopleInitialState as any,
				updatePersonFailureAction,
			);

			expect(peopleState.errors).toBe(errorMessage);
		});
	});
});
