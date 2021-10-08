// third party libraries
import dayjs from '@utils/dayjsTime';
// interface
import {
	DateRanges,
	Param,
} from '@components/molecules/DateRangePicker/interfaces';

/**
 * This method return the data range
 *
 * @param {String} param The desired range value
 * @param {DateRanges} range? The range value passed in from the date picker
 * @param {function} currentDateInView? This function updates the current data range in use
 * @returns {object}
 */
const getDateRange = (
	param: Param | unknown,
	range?: DateRanges,
	currentDateInView?: (date: string) => any,
): any => {
	const Range = (date, rangeValue) => {
		if (currentDateInView) {
			currentDateInView(date);
		}
		return {
			endDate: dayjs().endOf(rangeValue).unix(),
			startDate: dayjs().startOf(rangeValue).unix(),
			frequency: date,
		};
	};
	let returnedRange;
	switch (param) {
		case 'This Week':
			returnedRange = Range('day', 'week');
			break;
		case 'This Month':
			returnedRange = Range('week', 'month');
			break;
		case 'Quarterly':
			returnedRange = Range('quarter', 'year');
			break;
		case 'This Year':
			returnedRange = Range('month', 'year');
			break;
		case 'Pick a date':
			returnedRange = {
				frequency: 'day',
				startDate: dayjs(range?.startDate as unknown as string).unix(),
				endDate: dayjs(range?.endDate as unknown as string).unix(),
			};
			break;
		default:
			returnedRange = Range('week', 'month');
	}
	return returnedRange;
};

export default getDateRange;
