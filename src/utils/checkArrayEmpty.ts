/**
 * Checks if an array is empty
 * @returns {boolean}
 */
const isArrayNotNull = (
	array: number | string[] | Record<string, unknown>[],
): boolean => Array.isArray(array) && Object.keys(array).length > 0;

export default isArrayNotNull;
