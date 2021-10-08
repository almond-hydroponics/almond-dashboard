import store from '../store';

const defaultConfig = { strict: false };

/**
 * Checks the current user's permissions.
 *
 * The accessLevels should be a string or array of strings
 * in the format `"resource:permission"`, `"resource"` or`[resource:permission]`.
 * If the last style is used i.e just the resource is passed,
 * it would check for the "view" access for that resource
 *
 * @param {string | string[]} accessLevels
 * @param {Object} [configOptions]
 *
 * @returns {boolean} allowAccess
 */
const authorize = (
	accessLevels: string | string[],
	{ strict } = defaultConfig,
): any => {
	let allowAccess = false;

	const getAccess = (accessLevel: string) => {
		const [resource, permission = 'view'] = accessLevel.split(':');
		const userPermissions = store.getState().user.permissions;

		return (
			Boolean(userPermissions[resource]) &&
			userPermissions[resource][permission]
		);
	};

	if (typeof accessLevels === 'string') {
		allowAccess = getAccess(accessLevels);
	}

	if (accessLevels instanceof Array) {
		const permissions = accessLevels.map((accessLevel) =>
			getAccess(accessLevel),
		);

		allowAccess = strict
			? permissions.every((permission) => permission)
			: permissions.some((permission) => permission);
	}

	return allowAccess;
};

export default authorize;
