// helpers
import formatPermissions from './index';

// fixtures
import { noAccessPermissions } from './fixtures';
import { userRoles } from '../../pages/UserRolesPage/fixtures';

describe('The formatPermissions function', () => {
	it('should return object with all resource permissions true if user has full access', () => {
		const formattedPermissions = formatPermissions(userRoles[0]);

		expect(formattedPermissions).toEqual({
			...noAccessPermissions,
			people: {
				fullAccess: true,
				edit: true,
				delete: true,
				view: true,
				add: true,
			},
		});
	});

	it('should return object with proper user resource permissions', () => {
		const formattedPermissions = formatPermissions(userRoles[1]);

		expect(formattedPermissions).toEqual({
			...noAccessPermissions,
			devices: {
				fullAccess: true,
				edit: true,
				delete: true,
				view: true,
				add: true,
			},
		});
	});
});
