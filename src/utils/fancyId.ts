/**
 * This function generates a unique string best for listing in arrays
 * instead of using index
 * @returns string
 */
const fancyId = (): string => `_${Math.random().toString(36).substr(2, 9)}`;

export default fancyId;
