// interfaces
import { Permission, UserRole } from '@modules/userRoles/interfaces';
import {
	FormattedPermission,
	FormattedPermissions,
} from '@utils/FormatPermissions/interfaces';

// helpers
import camelCase from '@utils/camelCase';

// fixtures
import { fullAccess, noAccess, noAccessPermissions } from './fixtures';

/**
 * Formats permission into an object of booleans
 *
 * @param {Permission[]} accessLevelPermissions
 * @returns {FormattedPermission} formattedPermission
 */
const getFormattedPermission = (
	accessLevelPermissions: Permission[],
): FormattedPermission =>
	accessLevelPermissions.reduce((formattedPermission, permission) => {
		const permissionType = camelCase(permission.type);

		const updatedPermissions = {
			...formattedPermission,
			[permissionType]: true,
		};

		if (['add', 'edit', 'delete'].includes(permissionType)) {
			updatedPermissions.view = true;
		}

		return permissionType === 'fullAccess' ? fullAccess : updatedPermissions;
	}, noAccess);

/**
 * Converts resourceAccessLevels to an object with the resource names
 * as keys and values as object with boolean permissions. E.g
 * ```
 *  {
 *    center: {
 *      fullAccess: true,
 *      ...
 *    }
 *   ...
 *  }
 * ```
 *
 * @param {UserRole} role
 *
 * @returns {FormattedPermissions} formattedPermissions
 */
const formatPermissions = (role: UserRole): FormattedPermissions =>
	role.resourceAccessLevels.reduce((resources, accessLevel) => {
		const formattedPermission = getFormattedPermission(
			accessLevel.permissions,
		);

		return {
			...resources,
			[camelCase(accessLevel.resource.name)]: formattedPermission,
		};
	}, noAccessPermissions);

export default formatPermissions;
