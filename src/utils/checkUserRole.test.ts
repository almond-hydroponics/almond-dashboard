// helper functions
import checkUserRole from './checkUserRole';

describe('The checkUserRole function', () => {
	const regularUser = 'Regular User';
	const admin = 'Admin';

	it('should return false if user role is a regular user', () => {
		const isAdmin = checkUserRole(regularUser, admin);
		expect(isAdmin).toBeFalsy();
	});

	it('should return true if user role is an admin', () => {
		const isAdmin = checkUserRole(admin, admin);
		expect(isAdmin).toBeTruthy();
	});
});
