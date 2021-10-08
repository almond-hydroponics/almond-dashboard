// interfaces
import { ClassConditions } from './interfaces';

/**
 * Helps conditionally format element classNames
 *
 * @param {ClassConditions} classConditions
 * @param {string} [otherClasses]
 *
 * @returns {string}
 */
const classNameFormatter = (
	classConditions: ClassConditions,
	otherClasses?: string,
) => {
	const className = Object.keys(classConditions)
		.reduce((formattedClasses, currentClass) => {
			const showClass = classConditions[currentClass];

			return showClass
				? formattedClasses.concat(` ${currentClass}`)
				: formattedClasses;
		}, '')
		.trim();

	return otherClasses ? className.concat(` ${otherClasses}`) : className;
};

export default classNameFormatter;
