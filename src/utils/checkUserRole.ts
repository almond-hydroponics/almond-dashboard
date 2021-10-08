/**
 * Checks if user is Admin or Regular User
 *
 * @param {string} role
 * @param {string} baseRole
 * @returns {boolean}
 */
const checkUserRole = (role: string, baseRole: string): boolean =>
	role.toLowerCase() === baseRole.toLowerCase();

export default checkUserRole;
