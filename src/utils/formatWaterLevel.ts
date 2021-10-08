import roundDigit from '@utils/roundDigit';

/**
 * This function formats the raw water level data into a single percentage
 * @returns number
 */
const formatWaterLevelData = (waterLevel: number): number => {
	const heightOfTank = 600; // units in centimeters
	const level = heightOfTank ? waterLevel || heightOfTank : heightOfTank;
	return roundDigit(((heightOfTank - level) / heightOfTank) * 100, 0);
};

export default formatWaterLevelData;
