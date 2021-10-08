// third party libraries
import dayjs from '@utils/dayjsTime';
// utils
import getDateRange from '@utils/DateRangeSelect/index';

describe('The getDateRange function', () => {
	const startDate = (param) => dayjs().startOf(param).toISOString();
	const endDate = (param) => dayjs().endOf(param).toISOString();
	let DateRange;

	const Range = {
		startDate: new Date(),
		endDate: new Date(),
	};

	[
		{
			selectedRange: 'This Year',
			expectedRange: 'year',
		},
		{
			selectedRange: 'This Week',
			expectedRange: 'week',
		},
		{
			selectedRange: 'This Month',
			expectedRange: 'month',
		},
		{
			selectedRange: 'Default',
			expectedRange: 'month',
		},
	].forEach(({ selectedRange: input, expectedRange: expected }) => {
		it(`should return the ${input}s date range when ${expected} is passed in`, () => {
			DateRange = getDateRange(`${input}`, Range, () => undefined);
			expect(DateRange.startDate).toEqual(startDate(`${expected}`));
			expect(DateRange.endDate).toEqual(endDate(`${expected}`));
		});
	});

	it('should return the expected date range when Quarterly is passed in', () => {
		DateRange = getDateRange('Quarterly', Range, () => undefined);
		expect(DateRange.startDate).toEqual(startDate('year'));
	});
});
