// jest mocks
import '../../tests/__mocks__/storeWithPartialPermissions';

// helper functions
import authorize from './authorize';

describe('The authorize function', () => {
	it('should return false if an invalid resource is passed', () => {
		expect(authorize('flascobisci')).toBeFalsy();
	});

	it('should return the right user access if an accessLevel string is passed', () => {
		expect(authorize('analytics:view')).toBeTruthy();
		expect(authorize('people:edit')).toBeFalsy();
	});

	it('should return the right user access if an array of accessLevel strings is passed', () => {
		expect(authorize(['analytics:view'])).toBeTruthy();
		expect(authorize(['people:edit'])).toBeFalsy();
	});

	it('should return view access if only the resource is passed', () => {
		expect(authorize('analytics')).toBeTruthy();
		expect(authorize('people')).toBeFalsy();
	});

	it('should loosely check for access if an array of accessLevels are passed without the strict option', () => {
		// This should be return true because user has 'centers:add' access even though
		// the user does not have 'people:edit'
		expect(authorize(['analytics:add', 'people:edit'])).toBeTruthy();
	});

	it('should enforce all accessLevels if an array of accessLevels are passed with the strict option', () => {
		// setting the strict option to "true" enforces user has all accessLevels
		expect(
			authorize(['centers:add', 'people:edit'], { strict: true }),
		).toBeFalsy();
	});
});
