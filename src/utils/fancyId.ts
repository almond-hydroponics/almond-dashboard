/**
 * This function generates a unique string best for listing in arrays
 * instead of using index
 * @returns string
 */
const fancyId = (): string => {
	const head = Date.now().toString(36);
	const tail = Math.random().toString(36).substr(2, 9);
	return `_${head}${tail}`;
};

export default fancyId;
