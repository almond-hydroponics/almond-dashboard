/**
 * This function rounds a decimal digit to a value of choice
 * @returns number
 */
const roundDigit = (value: number, precision: number): number => {
	const multiplier = 10 ** (precision || 0);
	return Math.round(value * multiplier) / multiplier;
};

export default roundDigit;
